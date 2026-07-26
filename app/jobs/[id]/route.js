import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';

export async function PATCH(request, { params }) {
  try {
    const body = await request.json();
    if (body.adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const conn = await dbConnect();
    if (!conn) return NextResponse.json({ error: 'No database' }, { status: 503 });
    const { Job } = await import('@/lib/models');
    const job = await Job.findByIdAndUpdate(
      params.id,
      { $set: { ...body, adminPassword: undefined } },
      { new: true }
    ).lean();
    return NextResponse.json({ job: JSON.parse(JSON.stringify(job)) });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const body = await request.json();
    if (body.adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const conn = await dbConnect();
    if (!conn) return NextResponse.json({ error: 'No database' }, { status: 503 });
    const { Job } = await import('@/lib/models');
    await Job.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}