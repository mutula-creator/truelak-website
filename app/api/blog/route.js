import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';

export async function GET() {
  try {
    const conn = await dbConnect();
    if (!conn) return NextResponse.json({ posts: [] });
    const { Blog } = await import('@/lib/models');
    const posts = await Blog.find({ isPublished: true }).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ posts: JSON.parse(JSON.stringify(posts)) });
  } catch {
    return NextResponse.json({ posts: [] });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (body.adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const conn = await dbConnect();
    if (!conn) return NextResponse.json({ error: 'No database' }, { status: 503 });
    const { Blog } = await import('@/lib/models');
    // Auto-generate slug from title
    const slug = body.title.toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 60) + '-' + Date.now();
    const post = await Blog.create({ ...body, slug, isPublished: body.isPublished ?? true });
    return NextResponse.json({ post: JSON.parse(JSON.stringify(post)) }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
