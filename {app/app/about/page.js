import styles from './page.module.css';

export const metadata = { title: 'About Us | TrueLak Recruitment Agency' };

const values = [
  { icon: '🎯', title: 'Integrity', desc: 'We operate with complete transparency — with candidates and clients alike.' },
  { icon: '🤝', title: 'Partnership', desc: 'We see every client as a long-term partner, not a one-off transaction.' },
  { icon: '⚡', title: 'Excellence', desc: 'We hold ourselves to the highest recruitment standards in every placement.' },
  { icon: '🌍', title: 'Inclusivity', desc: 'We believe every job seeker deserves a fair chance, regardless of background.' },
];

export default function AboutPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>About TrueLak</h1>
          <p>East Africa's trusted recruitment partner since day one</p>
        </div>
      </div>

      {/* Story */}
      <section className="section">
        <div className={`container ${styles.storyGrid}`}>
          <div>
            <span className="eyebrow" style={{ color: 'var(--crimson)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Our Story</span>
            <h2 style={{ marginTop: '0.5rem', marginBottom: '1.25rem' }}>Built to Bridge the Gap Between Talent and Opportunity</h2>
            <p style={{ marginBottom: '1rem', fontSize: '1.02rem' }}>
              TrueLak Recruitment Agency was founded with a simple but powerful conviction: too many talented people in East Africa struggle to find the right opportunities, while too many businesses struggle to find the right people. We set out to change that.
            </p>
            <p style={{ marginBottom: '1rem', fontSize: '1.02rem' }}>
              Today, we are a full-service talent acquisition firm specialising in permanent, contract, and temporary placements. We support businesses across Kenya and the wider East African region — as well as organisations looking to hire remotely — by delivering strategic, value-driven recruitment solutions.
            </p>
            <p style={{ fontSize: '1.02rem' }}>
              At TrueLak, we don't just fill roles. We build long-term hiring partnerships.
            </p>
          </div>
          <div className={styles.storyImage}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=80"
              alt="TrueLak team meeting"
              style={{ width: '100%', borderRadius: 12, objectFit: 'cover', maxHeight: 440 }}
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div className={styles.mvGrid}>
            <div className={styles.mvCard} style={{ borderTop: '4px solid var(--navy)' }}>
              <h3>🎯 Our Mission</h3>
              <p>To connect high-performing professionals and skilled workers with organisations that are ready to grow — through a recruitment process that is fast, transparent, and built on trust.</p>
            </div>
            <div className={styles.mvCard} style={{ borderTop: '4px solid var(--crimson)' }}>
              <h3>🌟 Our Vision</h3>
              <p>To be East Africa's most trusted and impactful recruitment agency — empowering individuals to build meaningful careers and helping businesses build exceptional teams.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">What We Stand For</span>
            <h2>Our Core Values</h2>
          </div>
          <div className="grid-2">
            {values.map(({ icon, title, desc }) => (
              <div key={title} className="card" style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '2rem', lineHeight: 1 }}>{icon}</span>
                <div>
                  <h4 style={{ marginBottom: '0.4rem' }}>{title}</h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--grey-light)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
