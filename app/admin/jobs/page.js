'use client';
import { useState } from 'react';
import styles from './page.module.css';
export default function AdminJobsPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [tab, setTab] = useState('jobs');
  const [form, setForm] = useState({ title:'', category:'professional', location:'', type:'Permanent', description:'', requirements:'', salary:'' });
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async (pw) => {
    const [j, a, e] = await Promise.all([
      fetch('/api/jobs').then(r=>r.json()),
      fetch(`/api/applications?pw=${pw}`).then(r=>r.json()),
      fetch(`/api/employers?pw=${pw}`).then(r=>r.json()),
    ]);
    setJobs(j.jobs||[]); setApplications(a.applications||[]); setEmployers(e.enquiries||[]);
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const check = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (check.ok) { setAuthed(true); load(password); }
      else setMsg({ type:'error', text:'Wrong password' });
    } catch {
      setMsg({ type:'error', text:'Something went wrong. Try again.' });
    }
  };

  const postJob = async (e) => {
    e.preventDefault(); setLoading(true);
    const res = await fetch('/api/jobs', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ ...form, adminPassword: password }) });
    if (res.ok) { setMsg({ type:'success', text:'Job posted!' }); setForm({ title:'', category:'professional', location:'', type:'Permanent', description:'', requirements:'', salary:'' }); load(password); }
    else setMsg({ type:'error', text:'Failed to post job.' });
    setLoading(false);
  };

  const deleteJob = async (id) => {
    if (!confirm('Delete this job?')) return;
    await fetch(`/api/jobs/${id}`, { method:'DELETE', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ adminPassword: password }) });
    load(password);
  };

  const toggleJob = async (job) => {
    await fetch(`/api/jobs/${job._id}`, { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ isActive: !job.isActive, adminPassword: password }) });
    load(password);
  };

  if (!authed) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--off-white)',paddingTop:'80px'}}>
      <div className="card" style={{width:380,padding:'2.5rem'}}>
        <h2 style={{marginBottom:'1.5rem',textAlign:'center'}}>Admin Login</h2>
        {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
        <form onSubmit={login}>
          <div className="form-group"><label>Admin Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter password" /></div>
          <button type="submit" className="btn btn-primary" style={{width:'100%'}}>Login</button>
        </form>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:'100vh',background:'var(--off-white)',paddingTop:'80px'}}>
      <div className="container" style={{paddingTop:'2rem',paddingBottom:'4rem'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'2rem'}}>
          <h1 style={{fontSize:'1.8rem'}}>TrueLak Admin Panel</h1>
          <button onClick={()=>setAuthed(false)} className="btn btn-outline" style={{color:'var(--navy)',border:'2px solid var(--navy)',padding:'0.5rem 1rem'}}>Logout</button>
        </div>
        <div className={styles.tabs}>
          {[['jobs','💼 Jobs'],['post','➕ Post Job'],['applications','📋 Applications'],['enquiries','🏢 Enquiries']].map(([key,label])=>(
            <button key={key} onClick={()=>setTab(key)} className={`${styles.tab} ${tab===key?styles.activeTab:''}`}>{label}</button>
          ))}
        </div>

        {tab==='post' && (
          <div className="card">
            <h3 style={{marginBottom:'1.5rem'}}>Post a New Job</h3>
            {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
            <form onSubmit={postJob}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
                <div className="form-group"><label>Job Title *</label><input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required placeholder="e.g. Senior Accountant" /></div>
                <div className="form-group"><label>Location *</label><input value={form.location} onChange={e=>setForm({...form,location:e.target.value})} required placeholder="e.g. Nairobi, CBD" /></div>
                <div className="form-group"><label>Category *</label><select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}><option value="professional">Professional</option><option value="labour">Labour / Blue-Collar</option></select></div>
                <div className="form-group"><label>Type *</label><select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option value="Permanent">Permanent</option><option value="Contract">Contract</option><option value="Temporary">Temporary</option></select></div>
              </div>
              <div className="form-group"><label>Salary (Optional)</label><input value={form.salary} onChange={e=>setForm({...form,salary:e.target.value})} placeholder="e.g. KES 80,000 – 100,000/month" /></div>
              <div className="form-group"><label>Job Description *</label><textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} required rows={5} /></div>
              <div className="form-group"><label>Requirements</label><textarea value={form.requirements} onChange={e=>setForm({...form,requirements:e.target.value})} rows={4} /></div>
              <button type="submit" className="btn btn-primary" disabled={loading}>{loading?'Posting...':'Post Job'}</button>
            </form>
          </div>
        )}

        {tab==='jobs' && (
          <div>
            <p style={{marginBottom:'1rem',color:'var(--grey-light)'}}>{jobs.length} jobs total</p>
            {jobs.map(job=>(
              <div key={job._id} className="card" style={{marginBottom:'1rem',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'1rem'}}>
                <div>
                  <span className={`tag tag-${job.category}`} style={{marginRight:'0.5rem'}}>{job.category}</span>
                  <span className={`tag tag-${job.type?.toLowerCase()}`}>{job.type}</span>
                  <h4 style={{marginTop:'0.5rem'}}>{job.title}</h4>
                  <p style={{fontSize:'0.85rem',color:'var(--grey-light)'}}>{job.location} · {new Date(job.createdAt).toLocaleDateString()}</p>
                </div>
                <div style={{display:'flex',gap:'0.5rem'}}>
                  <button onClick={()=>toggleJob(job)} className="btn btn-outline" style={{padding:'0.5rem 1rem',fontSize:'0.85rem',color:'var(--navy)',border:'1.5px solid var(--navy)'}}>{job.isActive?'Deactivate':'Activate'}</button>
                  <button onClick={()=>deleteJob(job._id)} className="btn btn-primary" style={{padding:'0.5rem 1rem',fontSize:'0.85rem'}}>Delete</button>
                </div>
              </div>
            ))}
            {jobs.length===0 && <p style={{color:'var(--grey-light)'}}>No jobs yet. Use the Post Job tab to add your first listing.</p>}
          </div>
        )}

        {tab==='applications' && (
          <div>
            <p style={{marginBottom:'1rem',color:'var(--grey-light)'}}>{applications.length} applications</p>
            {applications.map(app=>(
              <div key={app._id} className="card" style={{marginBottom:'1rem'}}>
                <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'0.5rem',marginBottom:'0.5rem'}}>
                  <strong>{app.fullName}</strong>
                  <span className={`tag tag-${app.jobCategory}`}>{app.jobCategory}</span>
                </div>
                <p style={{fontSize:'0.85rem',color:'var(--grey-light)'}}>{app.email} · {app.phone} · {new Date(app.createdAt).toLocaleDateString()}</p>
                {app.jobTitle && <p style={{fontSize:'0.9rem',marginTop:'0.25rem'}}>Role: {app.jobTitle}</p>}
                {app.cvUrl && <p style={{marginTop:'0.5rem'}}><a href={app.cvUrl} target="_blank" rel="noreferrer" style={{color:'var(--navy)',fontWeight:600}}>📄 Download CV</a></p>}
                {app.message && <p style={{marginTop:'0.5rem',fontSize:'0.9rem'}}>{app.message}</p>}
              </div>
            ))}
            {applications.length===0 && <p style={{color:'var(--grey-light)'}}>No applications yet.</p>}
          </div>
        )}

        {tab==='enquiries' && (
          <div>
            <p style={{marginBottom:'1rem',color:'var(--grey-light)'}}>{employers.length} enquiries</p>
            {employers.map(e=>(
              <div key={e._id} className="card" style={{marginBottom:'1rem'}}>
                <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'0.5rem',marginBottom:'0.5rem'}}>
                  <strong>{e.companyName}</strong>
                  <span style={{fontSize:'0.82rem',color:'var(--grey-light)'}}>{new Date(e.createdAt).toLocaleDateString()}</span>
                </div>
                <p style={{fontSize:'0.85rem',color:'var(--grey-light)'}}>{e.contactPerson} · {e.email} · {e.phone}</p>
                <p style={{marginTop:'0.5rem',fontSize:'0.9rem'}}>Role: <strong>{e.roleNeeded}</strong> · Staff: {e.numberOfStaff}</p>
                {e.message && <p style={{marginTop:'0.5rem',fontSize:'0.9rem',fontStyle:'italic'}}>{e.message}</p>}
              </div>
            ))}
            {employers.length===0 && <p style={{color:'var(--grey-light)'}}>No enquiries yet.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
