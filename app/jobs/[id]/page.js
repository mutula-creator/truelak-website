import { notFound } from 'next/navigation';
import Link from 'next/link';
import ApplyForm from './ApplyForm';
import styles from './page.module.css';
const MOCK = { '1':{_id:'1',title:'Senior Accountant',category:'professional',location:'Nairobi, CBD',type:'Permanent',description:'We are looking for an experienced Senior Accountant.\n\nResponsibilities:\n• Prepare monthly financial statements\n• Manage tax compliance\n• Support audit processes',requirements:'CPA(K) or ACCA qualified\nMinimum 4 years experience\nProficient in QuickBooks or Sage',salary:'KES 90,000 – 120,000/month'}, '2':{_id:'2',title:'HR Officer',category:'professional',location:'Westlands',type:'Permanent',description:'HR Officer to manage recruitment and employee relations.',requirements:'Degree in HR\n2+ years experience\nKenyan labour law knowledge',salary:'KES 60,000 – 80,000/month'}, '3':{_id:'3',title:'Heavy Duty Driver',category:'labour',location:'Industrial Area',type:'Permanent',description:'Heavy Duty Driver for long-haul East Africa routes.',requirements:'Valid Class CE licence\n3+ years HGV experience',salary:'KES 45,000 – 60,000/month'}, '4':{_id:'4',title:'IT Support Technician',category:'professional',location:'Upper Hill',type:'Contract',description:'IT Support for 6-month contract.',requirements:'Diploma in IT\nCompTIA A+ preferred',salary:'KES 50,000/month'}, '5':{_id:'5',title:'Security Guards',category:'labour',location:'Mombasa Road',type:'Permanent',description:'Security Guards for commercial complex.',requirements:'Certificate of good conduct\nSecurity training certificate',salary:'KES 18,000 – 22,000/month'}, '6':{_id:'6',title:'Hotel Waiters/Waitresses',category:'labour',location:'Karen',type:'Permanent',description:'Waiters and Waitresses for boutique hotel.',requirements:'Hospitality certificate\n1+ year experience',salary:'KES 25,000 – 35,000/month'} };
async function getJob(id) {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL;
    if (!base) return MOCK[id] || null;
    const res = await fetch(`${base}/api/jobs/${id}`, { next: { revalidate: 60 } });
    if (!res.ok) return MOCK[id] || null;
    return res.json();
  } catch { return MOCK[id] || null; }
}
export default async function JobDetailPage({ params }) {
  const job = await getJob(params.id);
  if (!job) notFound();
  return (<>
    <div className="page-hero"><div className="container">
      <p style={{marginBottom:'0.75rem'}}><Link href="/jobs" style={{color:'rgba(255,255,255,0.6)',fontSize:'0.9rem'}}>← Back to All Jobs</Link></p>
      <div style={{display:'flex',gap:'0.75rem',marginBottom:'1rem',flexWrap:'wrap'}}>
        <span className={`tag tag-${job.category}`}>{job.category==='professional'?'💼 Professional':'🔧 Labour'}</span>
        <span className={`tag tag-${job.type?.toLowerCase()}`}>{job.type}</span>
      </div>
      <h1>{job.title}</h1>
      <p>{job.location}{job.salary?` · ${job.salary}`:''}</p>
    </div></div>
    <section className="section"><div className={`container ${styles.layout}`}>
      <div>
        <div className="card" style={{marginBottom:'1.5rem'}}><h3 style={{marginBottom:'1rem'}}>Job Description</h3><p style={{whiteSpace:'pre-line',lineHeight:1.8}}>{job.description}</p></div>
        {job.requirements && <div className="card"><h3 style={{marginBottom:'1rem'}}>Requirements</h3><p style={{whiteSpace:'pre-line',lineHeight:1.8}}>{job.requirements}</p></div>}
      </div>
      <div><div className="card"><h3 style={{marginBottom:'0.25rem'}}>Apply for this Role</h3><p style={{color:'var(--grey-light)',fontSize:'0.88rem',marginBottom:'1.5rem'}}>Fill in the form and our team will be in touch.</p><ApplyForm jobId={job._id} jobTitle={job.title} jobCategory={job.category} /></div></div>
    </div></section>
  </>);
}
