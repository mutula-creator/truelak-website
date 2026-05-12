import Link from 'next/link';

export const metadata = { title: 'Our Services | TrueLak Recruitment Agency' };

const professional = ['Human Resources (HR)','Administrative & Office Support','Finance & Accounting','IT & Technology','Management & Executive','Sales & Marketing','Legal & Compliance'];
const labour = ['Drivers (Light & Heavy Duty)','Waiters & Hospitality Staff','Mechanics & Artisans','Security Guards','Cleaners & Domestic Workers','Construction & General Labour','Warehouse & Logistics'];

export default function ServicesPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Our Recruitment Services</h1>
          <p>Two specialist divisions — one trusted agency</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Types */}
          <div className="section-heading">
            <span className="eyebrow">Engagement Types</span>
            <h2>Flexible Staffing Solutions</h2>
            <p>We handle permanent, contract, and temporary placements across all industries.</p>
          </div>
          <div className="grid-3" style={{ marginBottom: '5rem' }}>
            {[
              { type: 'Permanent', icon: '🏢', desc: 'Full-time direct hires placed with your business for the long term. Ideal for building stable, committed teams.' },
              { type: 'Contract', icon: '📝', desc: 'Fixed-term professionals for project-based work or seasonal demand — with all compliance handled by us.' },
              { type: 'Temporary', icon: '⚡', desc: 'On-demand staff for urgent needs, cover, or trial placements. Fast turnaround guaranteed.' },
            ].map(({ type, icon, desc }) => (
              <div key={type} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{icon}</div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{type}</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--grey-light)' }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Two categories */}
          <div className="section-heading">
            <span className="eyebrow">Our Divisions</span>
            <h2>Professional & Labour Placements</h2>
          </div>
          <div className="grid-2">
            <div className="card">
              <div style={{ background: '#EFF6FF', color: '#1D4ED8', borderRadius: 10, width: 52, height: 52, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem', marginBottom:'1rem' }}>💼</div>
              <h3 style={{ marginBottom:'0.5rem' }}>Professional Placements</h3>
              <p style={{ color:'var(--grey-light)', marginBottom:'1.25rem', fontSize:'0.92rem' }}>White-collar, office-based, and executive roles. Primarily sourced and matched via LinkedIn.</p>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'0.5rem', marginBottom:'1.5rem' }}>
                {professional.map(r => <li key={r} style={{ fontSize:'0.9rem' }}>✓ {r}</li>)}
              </ul>
              <Link href="/jobs?category=professional" className="btn btn-navy" style={{ fontSize:'0.9rem' }}>Browse Professional Jobs</Link>
            </div>
            <div className="card">
              <div style={{ background:'#FFF7ED', color:'var(--crimson)', borderRadius:10, width:52, height:52, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem', marginBottom:'1rem' }}>🔧</div>
              <h3 style={{ marginBottom:'0.5rem' }}>Labour & Blue-Collar Placements</h3>
              <p style={{ color:'var(--grey-light)', marginBottom:'1.25rem', fontSize:'0.92rem' }}>Trade, hospitality, and general labour roles. Sourced through our extensive Facebook community.</p>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'0.5rem', marginBottom:'1.5rem' }}>
                {labour.map(r => <li key={r} style={{ fontSize:'0.9rem' }}>✓ {r}</li>)}
              </ul>
              <Link href="/jobs?category=labour" className="btn btn-primary" style={{ fontSize:'0.9rem' }}>Browse Labour Jobs</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
