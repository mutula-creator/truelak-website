import { notFound } from 'next/navigation';
import Link from 'next/link';
import ApplyForm from './ApplyForm';
import styles from './page.module.css';

async function getJob(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/jobs/${id}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function JobDetailPage({ params }) {
  const job = await getJob(params.id);
  if (!job) notFound();

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <p style={{ marginBottom: '0.75rem' }}>
            <Link href="/jobs" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>← Back to All Jobs</Link>
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span className={`tag tag-${job.category}`}>{job.category === 'professional' ? '💼 Professional' : '🔧 Labour'}</span>
            <span className={`tag tag-${job.type?.toLowerCase()}`}>{job.type}</span>
          </div>
          <h1>{job.title}</h1>
          <p>{job.location} {job.salary ? `· ${job.salary}` : ''}</p>
        </div>
      </div>

      <section className="section">
        <div className={`container ${styles.layout}`}>
          {/* Job Details */}
          <div>
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Job Description</h3>
              <p style={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>{job.description}</p>
            </div>

            {job.requirements && (
              <div className="card">
                <h3 style={{ marginBottom: '1rem' }}>Requirements</h3>
                <p style={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>{job.requirements}</p>
              </div>
            )}
          </div>

          {/* Apply Form */}
          <div>
            <div className="card">
              <h3 style={{ marginBottom: '0.25rem' }}>Apply for this Role</h3>
              <p style={{ color: 'var(--grey-light)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                Fill in the form below and our team will be in touch.
              </p>
              <ApplyForm jobId={job._id} jobTitle={job.title} jobCategory={job.category} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
