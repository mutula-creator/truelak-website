import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Job } from '@/lib/models';

const MOCK_JOBS = [
  { _id: '1', title: 'Senior Accountant', category: 'professional', location: 'Nairobi, CBD', type: 'Permanent', description: 'We are looking for an experienced Senior Accountant to join a growing financial services firm in Nairobi. You will manage financial reporting, tax compliance, and support audit processes.', requirements: 'CPA(K) or ACCA qualified. Minimum 4 years experience. Proficient in QuickBooks or Sage.', salary: 'KES 90,000 – 120,000/month', isActive: true, createdAt: new Date() },
  { _id: '2', title: 'HR Officer', category: 'professional', location: 'Westlands, Nairobi', type: 'Permanent', description: 'A leading retail company seeks an HR Officer to manage recruitment, onboarding, employee relations, and HR compliance across their Nairobi operations.', requirements: 'Degree in HR or related field. 2+ years HR experience. Knowledge of Kenyan labour laws.', salary: 'KES 60,000 – 80,000/month', isActive: true, createdAt: new Date() },
  { _id: '3', title: 'Heavy Duty Driver (Class CE)', category: 'labour', location: 'Industrial Area, Nairobi', type: 'Permanent', description: 'A logistics company urgently needs a qualified Heavy Duty Driver for long-haul routes across East Africa. Must have a valid Class CE licence and clean driving record.', requirements: 'Valid Class CE driving licence. 3+ years HGV experience. Familiar with EA routes.', salary: 'KES 45,000 – 60,000/month', isActive: true, createdAt: new Date() },
  { _id: '4', title: 'IT Support Technician', category: 'professional', location: 'Upper Hill, Nairobi', type: 'Contract', description: 'A financial institution requires an IT Support Technician for a 6-month contract. Responsibilities include helpdesk support, hardware maintenance, and network troubleshooting.', requirements: 'Diploma or Degree in IT. CompTIA A+ preferred. 1–2 years support experience.', salary: 'KES 50,000/month', isActive: true, createdAt: new Date() },
  { _id: '5', title: 'Security Guards (5 Positions)', category: 'labour', location: 'Mombasa Road, Nairobi', type: 'Permanent', description: 'We are recruiting Security Guards for a busy commercial complex. Positions are available for day and night shifts. Accommodation available for night shift staff.', requirements: 'Certificate of good conduct. Security training from a recognised institution. Sober, alert, and disciplined.', salary: 'KES 18,000 – 22,000/month', isActive: true, createdAt: new Date() },
  { _id: '6', title: 'Hotel Waiters / Waitresses', category: 'labour', location: 'Karen, Nairobi', type: 'Permanent', description: 'A boutique hotel in Karen is hiring experienced Waiters and Waitresses to join their food & beverage team. Must be presentable, customer-focused, and able to work flexible hours.', requirements: 'Certificate in Food & Beverage or Hospitality. 1+ year hotel experience preferred. Fluent English.', salary: 'KES 25,000 – 35,000/month', isActive: true, createdAt: new Date() },
];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit    = parseInt(searchParams.get('limit') || '100');
    const conn = await dbConnect();
    if (!conn) {
      let jobs = MOCK_JOBS;
      if (category && ['professional','labour'].includes(category)) jobs = jobs.filter(j => j.category === category);
      return NextResponse.json({ jobs: jobs.slice(0, limit), mock: true });
    }
    const filter = { isActive: true };
    if (category && ['professional','labour'].includes(category)) filter.category = category;
    const jobs = await Job.find(filter).sort({ createdAt: -1 }).limit(limit).lean();
    return NextResponse.json({ jobs });
  } catch {
    return NextResponse.json({ jobs: MOCK_JOBS, mock: true });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (body.adminPassword !== process.env.ADMIN_PASSWORD) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const conn = await dbConnect();
    if (!conn) return NextResponse.json({ error: 'No database connected yet' }, { status: 503 });
    const job = await Job.create({ title: body.title, category: body.category, location: body.location, type: body.type, description: body.description, requirements: body.requirements, salary: body.salary, isActive: true });
    return NextResponse.json({ job }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}
