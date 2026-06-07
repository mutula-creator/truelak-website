import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { sendCvApplicationEmail } from '@/lib/email';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const fullName    = formData.get('fullName');
    const email       = formData.get('email');
    const phone       = formData.get('phone');
    const jobCategory = formData.get('jobCategory');
    const jobTitle    = formData.get('jobTitle') || '';
    const message     = formData.get('message') || '';
    const cvFile      = formData.get('cv');

    const conn = await dbConnect();
    let cvUrl = '';

    if (conn) {
      const { Application } = await import('@/lib/models');
      const { writeFile, mkdir } = await import('fs/promises');
      const path = await import('path');
      if (cvFile && cvFile.name) {
        const uploadDir = path.default.join(process.cwd(), 'public', 'uploads');
        await mkdir(uploadDir, { recursive: true });
        const safeFilename = `${Date.now()}-${cvFile.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
        await writeFile(path.default.join(uploadDir, safeFilename), Buffer.from(await cvFile.arrayBuffer()));
        cvUrl = `/uploads/${safeFilename}`;
      }
      await Application.create({ fullName, email, phone, jobCategory, jobTitle, cvUrl, message });
    }

    // Send email notification regardless of DB status
    await sendCvApplicationEmail({ fullName, email, phone, jobCategory, jobTitle, message });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('Application error:', err);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get('pw') !== process.env.ADMIN_PASSWORD) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const conn = await dbConnect();
  if (!conn) return NextResponse.json({ applications: [] });
  const { Application } = await import('@/lib/models');
  const applications = await Application.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ applications });
}
