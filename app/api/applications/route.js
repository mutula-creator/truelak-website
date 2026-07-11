import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { sendCvApplicationEmail } from '@/lib/email';

async function verifyTurnstile(token) {
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: token,
    }),
  });
  const data = await res.json();
  return data.success;
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const fullName    = formData.get('fullName');
    const email       = formData.get('email');
    const phone       = formData.get('phone');
    const jobCategory = formData.get('jobCategory');
    const jobTitle    = formData.get('jobTitle') || '';
    const message     = formData.get('message') || '';
    const cvUrl       = formData.get('cvUrl') || '';
    const cvFileName  = formData.get('cvFileName') || '';
    const token       = formData.get('token') || '';

    // Verify Turnstile
    if (!token) {
      return NextResponse.json({ error: 'Security check required' }, { status: 400 });
    }
    const valid = await verifyTurnstile(token);
    if (!valid) {
      return NextResponse.json({ error: 'Security check failed' }, { status: 400 });
    }

    const conn = await dbConnect();
    if (conn) {
      const { Application } = await import('@/lib/models');
      await Application.create({ fullName, email, phone, jobCategory, jobTitle, cvUrl, message });
    }

    await sendCvApplicationEmail({
      fullName, email, phone, jobCategory, jobTitle,
      message, cvUrl, cvFileName,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('Application error:', err);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get('pw') !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const conn = await dbConnect();
  if (!conn) return NextResponse.json({ applications: [] });
  const { Application } = await import('@/lib/models');
  const applications = await Application.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ applications: JSON.parse(JSON.stringify(applications)) });
}