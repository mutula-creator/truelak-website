import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Job } from '@/lib/models';

const MOCK_JOBS = {
  '1': { _id: '1', title: 'Senior Accountant', category: 'professional', location: 'Nairobi, CBD', type: 'Permanent', description: 'We are looking for an experienced Senior Accountant to join a growing financial services firm in Nairobi.\n\nResponsibilities:\n• Prepare monthly, quarterly, and annual financial statements\n• Manage tax compliance and liaise with KRA\n• Support internal and external audit processes\n• Maintain the general ledger and reconciliations', requirements: 'CPA(K) or ACCA qualified\nMinimum 4 years experience in a similar role\nProficient in QuickBooks or Sage\nStrong Excel skills\nExcellent attention to detail', salary: 'KES 90,000 – 120,000/month', isActive: true, createdAt: new Date() },
  '2': { _id: '2', title: 'HR Officer', category: 'professional', location: 'Westlands, Nairobi', type: 'Permanent', description: 'A leading retail company seeks an HR Officer to manage recruitment, onboarding, employee relations, and HR compliance.', requirements: 'Degree in HR or related field\n2+ years HR experience\nKnowledge of Kenyan labour laws\nStrong interpersonal skills', salary: 'KES 60,000 – 80,000/month', isActive: true, createdAt: new Date() },
  '3': { _id: '3', title: 'Heavy Duty Driver (Class CE)', category: 'labour', location: 'Industrial Area, Nairobi', type: 'Permanent', description: 'A logistics company urgently needs a qualified Heavy Duty Driver for long-haul routes across East Africa.', requirements: 'Valid Class CE driving licence\n3+ years HGV experience\nFamiliar with EA routes\nClean driving record', salary: 'KES 45,000 – 60,000/month', isActive: true, createdAt: new Date() },
  '4': { _id: '4', title: 'IT Support Technician', category: 'professional', location: 'Upper Hill, Nairobi', type: 'Contract', description: 'A financial institution requires an IT Support Technician for a 6-month contract covering helpdesk, hardware and network support.', requirements: 'Diploma or Degree in IT\nCompTIA A+ preferred\n1–2 years support experience', salary: 'KES 50,000/month', isActive: true, createdAt: new Date() },
  '5': { _id: '5', title: 'Security Guards (5 Positions)', category: 'labour', location: 'Mombasa Road, Nairobi', type: 'Permanent', description: 'We are recruiting Security Guards for a busy commercial complex on Mombasa Road. Day and night shifts available.', requirements: 'Certificate of good conduct\nSecurity training certificate\nSober, alert, and disciplined', salary: 'KES 18,000 – 22,000/month', isActive: true, createdAt: new Date() },
  '6': { _id: '6', title: 'Hotel Waiters / Waitresses', category: 'labour', location: 'Karen, Nairobi', type: 'Permanent', description: 'A boutique hotel in Karen is hiring experienced Waiters and Waitresses. Must be presentable, customer-focused, and able to work flexible hours.', requirements: 'Certificate in Food & Beverage or Hospitality\n1+ year hotel experience preferred\nFluent English and Kiswahili', salary: 'KES 25,000 – 35,000/month', isActive: true, createdAt: new Date() },
};

export async function GET(request, { params }) {
  try {
    const conn = await dbConnect();
    if (!conn) {
      const job = MOCK_JOBS[params.id];
      if (!job) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(job);
    }
    const job = await Job.findById(params.id).lean();
    if (!job) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(job);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const body = await request.json();
    if (body.adminPassword !== process.env.ADMIN_PASSWORD) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const conn = await dbConnect();
    if (!conn) return NextResponse.json({ error: 'No database' }, { status: 503 });
    const job = await Job.findByIdAndUpdate(params.id, body, { new: true }).lean();
    return NextResponse.json({ job });
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const body = await request.json();
    if (body.adminPassword !== process.env.ADMIN_PASSWORD) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const conn = await dbConnect();
    if (!conn) return NextResponse.json({ error: 'No database' }, { status: 503 });
    await Job.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
