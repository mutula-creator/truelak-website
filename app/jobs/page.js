import Link from 'next/link';
import JobsClient from './JobsClient';
import dbConnect from '@/lib/mongodb';

export const metadata = { title: 'Current Vacancies | TrueLak Recruitment Agency' };

export const revalidate = 0;

async function getJobs(category) {
  try {
    const conn = await dbConnect();
    if (!conn) return [];
    const { Job } = await import('@/lib/models');
    const filter = { isActive: true };
    if (category && ['professional', 'labour'].includes(category)) filter.category = category;
    const jobs = await Job.find(filter).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(jobs));
  } catch (err) {
    console.error('getJobs error:', err);
    return [];
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
              <Link href="/job-seekers" className="btn btn-primary">Submit Your CV</Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}