import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import dbConnect from '@/lib/mongodb';
import { Application } from '@/lib/models';

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

    // Save CV file to /public/uploads/
    let cvUrl = '';
    if (cvFile && cvFile.name) {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await mkdir(uploadDir, { recursive: true });

      const safeFilename = `${Date.now()}-${cvFile.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      const buffer = Buffer.from(await cvFile.arrayBuffer());
      await writeFile(path.join(uploadDir, safeFilename), buffer);
      cvUrl = `/uploads/${safeFilename}`;
    }

    await dbConnect();
    const application = await Application.create({
      fullName,
      email,
      phone,
      jobCategory,
      jobTitle,
      cvUrl,
      message,
    });

    return NextResponse.json({ success: true, id: application._id }, { status: 201 });
  } catch (err) {
    console.error('Application error:', err);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}

// GET /api/applications — admin view
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pw = searchParams.get('pw');
  if (pw !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await dbConnect();
  const applications = await Application.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ applications });
}
