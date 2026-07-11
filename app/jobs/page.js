import Link from 'next/link';
import JobsClient from './JobsClient';
import dbConnect from '@/lib/mongodb';

export const metadata = { title: 'Current Vacancies | TrueLak Recruitment Agency' };

const ALL_MOCK_JOBS = [
  { _id: '1', title: 'Senior Accountant', category: 'professional', location: 'Nairobi, CBD', type: 'Permanent', description: 'Experienced Senior Accountant needed for a growing financial services firm.', salary: 'KES 90,000 – 120,000/month', createdAt: new Date().toISOString() },
  { _id: '2', title: 'HR Officer', category: 'professional', location: 'Westlands, Nairobi', type: 'Permanent', description: 'HR Officer to manage recruitment, onboarding, and employee relations.', salary: 'KES 60,000 – 80,000/month', createdAt: new Date().toISOString() },
  { _id: '3', title: 'Heavy Duty Driver (Class CE)', category: 'labour', location: 'Industrial Area, Nairobi', type: 'Permanent', description: 'Heavy Duty Driver for long-haul East Africa routes.', salary: 'KES 45,000 – 60,000/month', createdAt: new Date().toISOString() },
  { _id: '4', title: 'IT Support Technician', category: 'professional', location: 'Upper Hill, Nairobi', type: 'Contract', description: 'IT Support Technician for a 6-month contract.', salary: 'KES 50,000/month', createdAt: new Date().toISOString() },
  { _id: '5', title: 'Security Guards (5 Positions)', category: 'labour', location: 'Mombasa Road, Nairobi', type: 'Permanent', description: 'Security Guards for a busy commercial complex.', salary: 'KES 18,000 – 22,000/month', createdAt: new Date().toISOString() },
  { _id: '6', title: 'Hotel Waiters / Waitresses', category: 'labour', location: 'Karen, Nairobi', type: 'Permanent', description: 'Waiters and Waitresses for a boutique hotel in Karen.', salary: 'KES 25,000 – 35,000/month', createdAt: new Date().toISOString() },
];

async function getJobs(category) {
  try {
    const conn = await dbConnect();
    if (!conn) {
      // No DB — show mock jobs
      return category ? ALL_MOCK_JOBS.filter(j => j.category === category) : ALL_MOCK_JOBS;
    }
    // Connected — query directly
    const { Job } = await import('@/lib/models');
    const filter = { isActive: true };
    if (category && ['professional', 'labour'].includes(category)) filter.category = category;
    const jobs = await Job.find(filter).sort({ createdAt: -1 }).lean();
    // Serialize mongoose objects to plain JSON
    return JSON.parse(JSON.stringify(jobs));
  } catch (err) {
    console.error('getJobs error:', err);
    return category ? ALL_MOCK_JOBS.filter(j => j.category === category) : ALL_MOCK_JOBS;
  }
}

export default async function JobsPage({ searchParams }) {
  const category = searchParams?.category || '';
  const jobs = await getJobs(category);

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Current Vacancies</h1>
          <p>Browse our latest professional and labour opportunities across East Africa and UAE</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <JobsClient jobs={jobs} initialCategory={category} />
          {jobs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</p>
              <h3 style={{ marginBottom: '0.5rem' }}>No vacancies listed right now</h3>
              <p style={{ color: 'var(--grey-light)', marginBottom: '1.5rem' }}>
                Submit your CV and we will contact you when a match is found.
              </p>
              <Link href="job-seekers" className="btn btn-primary">Submit Your CV</Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
