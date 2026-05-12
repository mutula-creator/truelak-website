import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Job } from '@/lib/models';

// GET /api/jobs — list active jobs (optional ?category=professional|labour&limit=N)
export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit    = parseInt(searchParams.get('limit') || '100');

    const filter = { isActive: true };
    if (category && ['professional', 'labour'].includes(category)) {
      filter.category = category;
    }

    const jobs = await Job.find(filter).sort({ createdAt: -1 }).limit(limit).lean();
    return NextResponse.json({ jobs });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

// POST /api/jobs — create new job (admin only)
export async function POST(request) {
  try {
    const body = await request.json();

    // Simple admin password check
    if (body.adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const job = await Job.create({
      title:        body.title,
      category:     body.category,
      location:     body.location,
      type:         body.type,
      description:  body.description,
      requirements: body.requirements,
      salary:       body.salary,
      isActive:     true,
    });

    return NextResponse.json({ job }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}
