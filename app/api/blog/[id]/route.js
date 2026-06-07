import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';

export async function DELETE(request, { params }) {
  try {
    const body = await request.json();
    if (body.adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const conn = await dbConnect();
    if (!conn) return NextResponse.json({ error: 'No database' }, { status: 503 });
    const { Blog } = await import('@/lib/models');
    await Blog.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const body = await request.json();
    if (body.adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const conn = await dbConnect();
    if (!conn) return NextResponse.json({ error: 'No database' }, { status: 503 });
    const { Blog } = await import('@/lib/models');
    const post = await Blog.findByIdAndUpdate(params.id, body, { new: true }).lean();
    return NextResponse.json({ post: JSON.parse(JSON.stringify(post)) });
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
