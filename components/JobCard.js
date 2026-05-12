import Link from 'next/link';
import { FaMapMarkerAlt, FaBriefcase, FaClock } from 'react-icons/fa';
import styles from './JobCard.module.css';

export default function JobCard({ job }) {
  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.top}>
        <span className={`tag tag-${job.category}`}>
          {job.category === 'professional' ? '💼 Professional' : '🔧 Labour'}
        </span>
        <span className={`tag tag-${job.type?.toLowerCase()}`}>{job.type}</span>
      </div>

      <h3 className={styles.title}>{job.title}</h3>

      <div className={styles.meta}>
        <span><FaMapMarkerAlt /> {job.location}</span>
        {job.salary && <span><FaBriefcase /> {job.salary}</span>}
        <span><FaClock /> {new Date(job.createdAt).toLocaleDateString('en-KE', { day:'numeric', month:'short', year:'numeric' })}</span>
      </div>

      <p className={styles.desc}>{job.description?.slice(0, 140)}...</p>

      <Link href={`/jobs/${job._id}`} className="btn btn-navy" style={{ marginTop: '1rem', display: 'inline-block', padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
        View &amp; Apply
      </Link>
    </div>
  );
}
