import CvForm from './CvForm';
import styles from './page.module.css';

export const metadata = { title: 'For Job Seekers | TrueLak Recruitment Agency' };

export default function CandidatesPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Find Your Next Opportunity</h1>
          <p>Register with TrueLak and let us connect you with the right employer</p>
        </div>
      </div>

      {/* How it works */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Getting Started</span>
            <h2>How to Register with TrueLak</h2>
          </div>
          <div className="grid-3">
            {[
              { step: '1', icon: '📋', title: 'Submit Your CV', desc: 'Fill in our simple registration form and upload your CV. It takes less than 3 minutes.' },
              { step: '2', icon: '🔍', title: 'We Match You', desc: 'Our team reviews your profile and matches you against current and upcoming vacancies.' },
              { step: '3', icon: '📞', title: 'We Call You', desc: 'When a suitable role is found, we contact you to discuss the opportunity and prepare you for interviews.' },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{icon}</div>
                <div style={{ background: 'var(--navy)', color: '#fff', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', margin: '0 auto 0.75rem' }}>{step}</div>
                <h4 style={{ marginBottom: '0.5rem' }}>{title}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--grey-light)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CV Form */}
      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div className={styles.layout}>
            <div>
              <span className="eyebrow" style={{ color: 'var(--crimson)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Register Now</span>
              <h2 style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>Submit Your CV</h2>
              <p style={{ color: 'var(--grey-light)', marginBottom: '2rem' }}>
                We're looking for candidates across both professional and labour categories. Register today — it's completely free.
              </p>
              <div className={styles.infoBox}>
                <h4>What to expect after applying</h4>
                <ul>
                  <li>📧 Confirmation email once your CV is received</li>
                  <li>📞 A call from our team within 1–3 business days</li>
                  <li>🤝 Introduction to matching employers</li>
                  <li>✅ Interview preparation support</li>
                </ul>
              </div>
            </div>
            <div className="card">
              <CvForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
