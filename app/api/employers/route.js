import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';

export async function POST(request) {
  try {
    const body = await request.json();
    const conn = await dbConnect();
    if (!conn) return NextResponse.json({ success: true, mock: true }, { status: 201 });
    const { Employer } = await import('@/lib/models');
    const employer = await Employer.create(body);
    return NextResponse.json({ success: true, id: employer._id }, { status: 201 });
  } catch {
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
