import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Employer } from '@/lib/models';

export async function POST(request) {
  try {
    const body = await request.json();
    await dbConnect();
    const employer = await Employer.create(body);
    return NextResponse.json({ success: true, id: employer._id }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to submit enquiry' }, { status: 500 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get('pw') !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await dbConnect();
  const enquiries = await Employer.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ enquiries });
}
