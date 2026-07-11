import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { sendEmployerEnquiryEmail } from '@/lib/email';

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
    const body = await request.json();

    // Verify Turnstile
    if (!body.token) {
      return NextResponse.json({ error: 'Security check required' }, { status: 400 });
    }
    const valid = await verifyTurnstile(body.token);
    if (!valid) {
      return NextResponse.json({ error: 'Security check failed' }, { status: 400 });
    }

    const conn = await dbConnect();
    if (conn) {
      const { Employer } = await import('@/lib/models');
      await Employer.create(body);
    }

    await sendEmployerEnquiryEmail({
      companyName:   body.companyName,
      contactPerson: body.contactPerson,
      email:         body.email,
      phone:         body.phone,
      roleNeeded:    body.roleNeeded,
      numberOfStaff: body.numberOfStaff,
      jobCategory:   body.jobCategory,
      message:       body.message,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('Employer error:', err);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get('pw') !== process.env.ADMIN_PASSWORD) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const conn = await dbConnect();
  if (!conn) return NextResponse.json({ enquiries: [] });
  const { Employer } = await import('@/lib/models');
  const enquiries = await Employer.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ enquiries });
}