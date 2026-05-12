import Link from 'next/link';
import JobsClient from './JobsClient';

export const metadata = { title: 'Current Vacancies | TrueLak Recruitment Agency' };

const ALL_MOCK_JOBS = [
  { _id: '1', title: 'Senior Accountant', category: 'professional', location: 'Nairobi, CBD', type: 'Permanent', description: 'We are looking for an experienced Senior Accountant to join a growing financial services firm in Nairobi. You will manage financial reporting, tax compliance, and support audit processes.', salary: 'KES 90,000 – 120,000/month', createdAt: new Date().toISOString() },
  { _id: '2', title: 'HR Officer', category: 'professional', location: 'Westlands, Nairobi', type: 'Permanent', description: 'A leading retail company seeks an HR Officer to manage recruitment, onboarding, employee relations, and HR compliance across their Nairobi operations.', salary: 'KES 60,000 – 80,000/month', createdAt: new Date().toISOString() },
  { _id: '4', title: 'IT Support Technician', category: 'professional', location: 'Upper Hill, Nairobi', type: 'Contract', description: 'A financial institution requires an IT Support Technician for a 6-month contract. Responsibilities include helpdesk support, hardware maintenance, and network troubleshooting.', salary: 'KES 50,000/month', createdAt: new Date().toISOString() },
  { _id: '3', title: 'Heavy Duty Driver (Class CE)', category: 'labour', location: 'Industrial Area, Nairobi', type: 'Permanent', description: 'A logistics company urgently needs a qualified Heavy Duty Driver for long-haul routes across East Africa. Must have a valid Class CE licence and clean driving record.', salary: 'KES 45,000 – 60,000/month', createdAt: new Date().toISOString() },
  { _id: '5', title: 'Security Guards (5 Positions)', category: 'labour', location: 'Mombasa Road, Nairobi', type: 'Permanent', description: 'We are recruiting Security Guards for a busy commercial complex. Positions are available for day and night shifts.', salary: 'KES 18,000 – 22,000/month', createdAt: new Date().toISOString() },
  { _id: '6', title: 'Hotel Waiters / Waitresses', category: 'labour', location: 'Karen, Nairobi', type: 'Permanent', description: 'A boutique hotel in Karen is hiring experienced Waiters and Waitresses to join their food & beverage team.', salary: 'KES 25,000 – 35,000/month', createdAt: new Date().toISOString() },
];

async function getJobs(category) {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL;
    if (!base) {
      return category ? ALL_MOCK_JOBS.filter(j => j.category === category) : ALL_MOCK_JOBS;
    }
    const url = `${base}/api/jobs${category ? `?category=${category}` : ''}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return ALL_MOCK_JOBS;
    const data = await res.json();
    const jobs = data.jobs || [];
    return jobs.length > 0 ? jobs : (category ? ALL_MOCK_JOBS.filter(j => j.category === category) : ALL_MOCK_JOBS);
  } catch {
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
          <p>Browse our latest professional and labour opportunities across East Africa</p>
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
                New roles are posted regularly. Submit your CV and we will contact you when a match is found.
              </p>
              <Link href="/candidates" className="btn btn-primary">Submit Your CV</Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
