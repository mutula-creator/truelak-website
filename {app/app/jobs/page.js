import Link from 'next/link';
import JobsClient from './JobsClient';

export const metadata = { title: 'Current Vacancies | TrueLak Recruitment Agency' };

async function getJobs(category) {
  try {
    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/jobs${category ? `?category=${category}` : ''}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.jobs || [];
  } catch {
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
                New roles are posted regularly. Submit your CV and we'll contact you when a match is found.
              </p>
              <Link href="/candidates" className="btn btn-primary">Submit Your CV</Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
