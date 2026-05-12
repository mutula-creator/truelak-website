import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Employer } from '@/lib/models';

// Store general contact messages alongside employer enquiries
export async function POST(request) {
  try {
    const body = await request.json();
    await dbConnect();
    await Employer.create({
      companyName: body.name,
      contactPerson: body.name,
      email: body.email,
      phone: body.phone || 'Not provided',
      roleNeeded: `CONTACT: ${body.message}`,
      numberOfStaff: '0',
      jobCategory: 'both',
      message: body.message,
    });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
