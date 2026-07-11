import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { sendContactEmail } from '@/lib/email';

export async function POST(request) {
  try {
    const body = await request.json();

    // Honeypot check — bots fill this, humans don't
    if (body.website) {
      return NextResponse.json({ success: true }); // Fake success to fool bots
    }

    const conn = await dbConnect();
    if (conn) {
      const { Employer } = await import('@/lib/models');
      await Employer.create({
        companyName: body.name, contactPerson: body.name,
        email: body.email, phone: body.phone || 'N/A',
        roleNeeded: `CONTACT: ${body.message}`, numberOfStaff: '0', message: body.message,
      });
    }

    await sendContactEmail({
      name:    body.name,
      email:   body.email,
      phone:   body.phone,
      type:    body.type,
      message: body.message,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('Contact error:', err);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}