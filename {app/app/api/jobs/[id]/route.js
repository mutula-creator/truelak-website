import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Job } from '@/lib/models';

// GET /api/jobs/:id
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const job = await Job.findById(params.id).lean();
    if (!job) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(job);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 });
  }
}

// PATCH /api/jobs/:id — update (admin)
export async function PATCH(request, { params }) {
  try {
    const body = await request.json();
    if (body.adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await dbConnect();
    const job = await Job.findByIdAndUpdate(params.id, body, { new: true }).lean();
    return NextResponse.json({ job });
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

// DELETE /api/jobs/:id — delete (admin)
export async function DELETE(request, { params }) {
  try {
    const body = await request.json();
    if (body.adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await dbConnect();
    await Job.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
