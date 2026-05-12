'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import JobCard from '@/components/JobCard';
import styles from './page.module.css';

export default function JobsClient({ jobs, initialCategory }) {
  const router = useRouter();
  const [category, setCategory] = useState(initialCategory || 'all');

  const handleFilter = (cat) => {
    setCategory(cat);
    router.push(cat === 'all' ? '/jobs' : `/jobs?category=${cat}`, { scroll: false });
  };

  return (
    <>
      {/* Filter Tabs */}
      <div className={styles.filters}>
        {[
          { value: 'all', label: '🗂 All Jobs' },
          { value: 'professional', label: '💼 Professional' },
          { value: 'labour', label: '🔧 Labour & Trade' },
        ].map(({ value, label }) => (
          <button
            key={value}
            onClick={() => handleFilter(value)}
            className={`${styles.filterBtn} ${category === value ? styles.active : ''}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Count */}
      {jobs.length > 0 && (
        <p className={styles.count}>{jobs.length} {jobs.length === 1 ? 'vacancy' : 'vacancies'} found</p>
      )}

      {/* Grid */}
      <div className="grid-3">
        {jobs.map((job) => <JobCard key={job._id} job={job} />)}
      </div>
    </>
  );
}
