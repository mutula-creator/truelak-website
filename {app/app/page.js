import Link from 'next/link';
import { FaUserTie, FaHardHat, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import styles from './page.module.css';

// Fetch latest 3 jobs for the homepage preview
async function getLatestJobs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/jobs?limit=3`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.jobs || [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const latestJobs = await getLatestJobs();

  return (
    <>
      {/* ── Hero ─────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.heroBadge}>🇰🇪 East Africa's Trusted Recruitment Partner</span>
          <h1>
            We Connect <span className={styles.accent}>Great Talent</span><br />
            with Great Employers
          </h1>
          <p>
            Whether you're a professional seeking your next career move or a business looking for skilled workers,
            TrueLak delivers permanent, contract, and temporary placements you can rely on.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/jobs" className="btn btn-primary">Find a Job</Link>
            <Link href="/employers" className="btn btn-outline">Hire Now</Link>
          </div>
          <div className={styles.heroStats}>
            <div><strong>500+</strong><span>Placements Made</span></div>
            <div><strong>200+</strong><span>Partner Employers</span></div>
            <div><strong>2</strong><span>Specialist Divisions</span></div>
          </div>
        </div>
      </section>

      {/* ── Two Categories ───────────────────────── */}
      <section className={`section ${styles.categories}`}>
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Our Services</span>
            <h2>Two Specialist Recruitment Divisions</h2>
            <p>We serve both white-collar professionals and skilled blue-collar workers with equal dedication.</p>
          </div>

          <div className={styles.categoryGrid}>
            {/* Professional */}
            <div className={`${styles.catCard} ${styles.catPro}`}>
              <div className={styles.catIcon}><FaUserTie size={32} /></div>
              <h3>Professional Placements</h3>
              <p>White-collar, office-based, and executive roles across East Africa and globally.</p>
              <ul className={styles.catList}>
                {['HR & Administration','Finance & Accounting','IT & Technology','Management & Executive','Sales & Marketing','Legal & Compliance'].map(r => (
                  <li key={r}><FaCheckCircle className={styles.checkPro} /> {r}</li>
                ))}
              </ul>
              <div className={styles.catFooter}>
                <span className={styles.catBadge}>Primarily LinkedIn</span>
                <Link href="/jobs?category=professional" className="btn btn-navy">Browse Pro Jobs <FaArrowRight /></Link>
              </div>
            </div>

            {/* Labour */}
            <div className={`${styles.catCard} ${styles.catLabour}`}>
              <div className={styles.catIcon}><FaHardHat size={32} /></div>
              <h3>Labour & Blue-Collar Placements</h3>
              <p>Trade, hospitality, and general labour roles matched with reliable employers.</p>
              <ul className={styles.catList}>
                {['Drivers (Light & Heavy Duty)','Waiters & Hospitality Staff','Mechanics & Artisans','Security Guards','Cleaners & Domestic Workers','Construction & General Labour'].map(r => (
                  <li key={r}><FaCheckCircle className={styles.checkLabour} /> {r}</li>
                ))}
              </ul>
              <div className={styles.catFooter}>
                <span className={styles.catBadgeFb}>Primarily Facebook</span>
                <Link href="/jobs?category=labour" className="btn btn-primary">Browse Labour Jobs <FaArrowRight /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why TrueLak ─────────────────────────── */}
      <section className={`section ${styles.whySection}`}>
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Why Choose Us</span>
            <h2>The TrueLak Difference</h2>
          </div>
          <div className="grid-3">
            {[
              { icon: '🎯', title: 'Precision Matching', desc: 'We take time to understand both the employer's needs and the candidate's goals before making any placement.' },
              { icon: '⚡', title: 'Fast Turnaround', desc: 'Our extensive talent pool means we can fill most roles within days, not weeks.' },
              { icon: '🤝', title: 'Long-Term Partnerships', desc: 'We don't just fill roles — we build lasting hiring relationships with businesses across East Africa.' },
              { icon: '✅', title: 'Verified Candidates', desc: 'All candidates are screened, reference-checked, and verified before being presented to employers.' },
              { icon: '🌍', title: 'East Africa Focus', desc: 'Deep local knowledge across Kenya, Uganda, Tanzania, and surrounding markets.' },
              { icon: '📱', title: 'Always Accessible', desc: 'Reach us by phone, WhatsApp, email, or social media — we're always available for you.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{icon}</div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{title}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--grey-light)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest Jobs Preview ──────────────────── */}
      {latestJobs.length > 0 && (
        <section className={`section ${styles.jobsPreview}`}>
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Latest Opportunities</span>
              <h2>Recently Posted Vacancies</h2>
            </div>
            <div className="grid-3">
              {latestJobs.map((job) => (
                <div key={job._id} className="card">
                  <span className={`tag tag-${job.category}`} style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
                    {job.category === 'professional' ? '💼 Professional' : '🔧 Labour'}
                  </span>
                  <h3 style={{ fontSize: '1.05rem', marginBottom: '0.4rem' }}>{job.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--grey-light)', marginBottom: '1rem' }}>{job.location} · {job.type}</p>
                  <Link href={`/jobs/${job._id}`} className="btn btn-navy" style={{ fontSize: '0.88rem', padding: '0.55rem 1.2rem' }}>
                    Apply Now
                  </Link>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link href="/jobs" className="btn btn-primary">View All Vacancies</Link>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Banner ───────────────────────────── */}
      <section className={styles.ctaBanner}>
        <div className="container">
          <div className={styles.ctaInner}>
            <div>
              <h2>Ready to find your next hire?</h2>
              <p>Partner with TrueLak and access Kenya's most reliable talent network.</p>
            </div>
            <div className={styles.ctaBtns}>
              <Link href="/candidates" className="btn btn-primary">Submit Your CV</Link>
              <Link href="/employers" className="btn btn-outline">Post a Job</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
