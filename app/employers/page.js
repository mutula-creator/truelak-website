import EmployerForm from './EmployerForm';
import styles from './page.module.css';

export const metadata = { title: 'For Employers | TrueLak Recruitment Agency' };

export default function EmployersPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Hire with Confidence</h1>
          <p>Let TrueLak source, screen, and deliver the right talent for your business</p>
        </div>
      </div>

      {/* How it works */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">The Process</span>
            <h2>How TrueLak Works for Employers</h2>
          </div>
          <div className={styles.steps}>
            {[
              { num: '01', title: 'Tell Us What You Need', desc: 'Share your role requirements, company culture, and hiring timeline through our quick enquiry form.' },
              { num: '02', title: 'We Source & Screen', desc: 'Our recruitment team searches our talent pool and network to find pre-vetted, qualified candidates.' },
              { num: '03', title: 'Shortlist Presented to You', desc: 'We present a shortlist of top candidates with profiles, so you only interview the best.' },
              { num: '04', title: 'You Interview & Select', desc: 'Conduct interviews your way. We coordinate scheduling and provide candidate support throughout.' },
              { num: '05', title: 'Placement & Follow-Up', desc: 'Once hired, we follow up to ensure a smooth onboarding and lasting placement success.' },
            ].map(({ num, title, desc }) => (
              <div key={num} className={styles.step}>
                <span className={styles.stepNum}>{num}</span>
                <div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div className={styles.formLayout}>
            <div>
              <span className="eyebrow" style={{ color: 'var(--crimson)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Partner With Us</span>
              <h2 style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>Submit a Hiring Enquiry</h2>
              <p style={{ color: 'var(--grey-light)', marginBottom: '2rem' }}>
                Tell us about the role you need to fill. Our team will respond within 24 business hours.
              </p>
              <div className={styles.perks}>
                {['No upfront fees — pay only on successful placement','Access to a pre-screened talent pool','Professional & Labour roles covered','Permanent, contract & temporary staffing'].map(p => (
                  <div key={p} className={styles.perk}>✅ {p}</div>
                ))}
              </div>
            </div>
            <div className="card">
              <EmployerForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
