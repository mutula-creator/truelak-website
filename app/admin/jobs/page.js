'use client';
import { useState } from 'react';
import styles from './page.module.css';

export default function AdminJobsPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed]     = useState(false);
  const [jobs, setJobs]         = useState([]);
  const [applications, setApplications] = useState([]);
  const [employers, setEmployers]       = useState([]);
  const [posts, setPosts]               = useState([]);
  const [tab, setTab]           = useState('jobs');
  const [msg, setMsg]           = useState(null);
  const [loading, setLoading]   = useState(false);

  // Job form
  const [jobForm, setJobForm] = useState({ title:'', category:'professional', location:'', type:'Permanent', description:'', requirements:'', salary:'' });

  // Blog form
  const [blogForm, setBlogForm] = useState({ title:'', category:'Industry Insights', excerpt:'', content:'', image:'/images/hero.jpg', isPublished: true });

  const load = async (pw) => {
    const [j, a, e, b] = await Promise.all([
      fetch('/api/jobs').then(r=>r.json()),
      fetch(`/api/applications?pw=${pw}`).then(r=>r.json()),
      fetch(`/api/employers?pw=${pw}`).then(r=>r.json()),
      fetch('/api/blog').then(r=>r.json()),
    ]);
    setJobs(j.jobs||[]);
    setApplications(a.applications||[]);
    setEmployers(e.enquiries||[]);
    setPosts(b.posts||[]);
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const check = await fetch('/api/auth', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ password }) });
      if (check.ok) { setAuthed(true); load(password); }
      else setMsg({ type:'error', text:'Wrong password' });
    } catch { setMsg({ type:'error', text:'Something went wrong.' }); }
  };

  const postJob = async (e) => {
    e.preventDefault(); setLoading(true); setMsg(null);
    const res = await fetch('/api/jobs', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ ...jobForm, adminPassword: password }) });
    if (res.ok) { setMsg({ type:'success', text:'Job posted!' }); setJobForm({ title:'', category:'professional', location:'', type:'Permanent', description:'', requirements:'', salary:'' }); load(password); }
    else setMsg({ type:'error', text:'Failed to post job.' });
    setLoading(false);
  };

  const postBlog = async (e) => {
    e.preventDefault(); setLoading(true); setMsg(null);
    const res = await fetch('/api/blog', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ ...blogForm, adminPassword: password }) });
    if (res.ok) { setMsg({ type:'success', text:'Blog post published!' }); setBlogForm({ title:'', category:'Industry Insights', excerpt:'', content:'', image:'/images/hero.jpg', isPublished: true }); load(password); }
    else setMsg({ type:'error', text:'Failed to publish post.' });
    setLoading(false);
  };

  const deleteJob = async (id) => {
    if (!confirm('Delete this job?')) return;
    await fetch(`/api/jobs/${id}`, { method:'DELETE', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ adminPassword: password }) });
    load(password);
  };

  const deletePost = async (id) => {
    if (!confirm('Delete this blog post?')) return;
    await fetch(`/api/blog/${id}`, { method:'DELETE', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ adminPassword: password }) });
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
          {[['jobs','💼 Jobs'],['post','➕ Post Job'],['blog','📝 Blog'],['newpost','✏️ New Post'],['applications','📋 Applications'],['enquiries','🏢 Enquiries']].map(([key,label])=>(
            <button key={key} onClick={()=>{setTab(key);setMsg(null);}} className={`${styles.tab} ${tab===key?styles.activeTab:''}`}>{label}</button>
          ))}
        </div>

        {msg && <div className={`alert alert-${msg.type}`} style={{marginBottom:'1.5rem'}}>{msg.text}</div>}

        {/* ── Post Job ── */}
        {tab==='post' && (
          <div className="card">
            <h3 style={{marginBottom:'1.5rem'}}>Post a New Job</h3>
            <form onSubmit={postJob}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
                <div className="form-group"><label>Job Title *</label><input value={jobForm.title} onChange={e=>setJobForm({...jobForm,title:e.target.value})} required placeholder="e.g. Senior Accountant" /></div>
                <div className="form-group"><label>Location *</label><input value={jobForm.location} onChange={e=>setJobForm({...jobForm,location:e.target.value})} required placeholder="e.g. Nairobi, CBD" /></div>
                <div className="form-group"><label>Category *</label><select value={jobForm.category} onChange={e=>setJobForm({...jobForm,category:e.target.value})}><option value="professional">Professional</option><option value="labour">Labour / Blue-Collar</option></select></div>
                <div className="form-group"><label>Type *</label><select value={jobForm.type} onChange={e=>setJobForm({...jobForm,type:e.target.value})}><option value="Permanent">Permanent</option><option value="Contract">Contract</option><option value="Temporary">Temporary</option></select></div>
              </div>
              <div className="form-group"><label>Salary</label><input value={jobForm.salary} onChange={e=>setJobForm({...jobForm,salary:e.target.value})} placeholder="e.g. KES 80,000 – 100,000/month" /></div>
              <div className="form-group"><label>Job Description *</label><textarea value={jobForm.description} onChange={e=>setJobForm({...jobForm,description:e.target.value})} required rows={6} placeholder="Describe the role and responsibilities..." /></div>
              <div className="form-group"><label>Requirements</label><textarea value={jobForm.requirements} onChange={e=>setJobForm({...jobForm,requirements:e.target.value})} rows={4} placeholder="Qualifications and experience needed..." /></div>
              <button type="submit" className="btn btn-primary" disabled={loading}>{loading?'Posting...':'Post Job'}</button>
            </form>
          </div>
        )}

        {/* ── Jobs List ── */}
        {tab==='jobs' && (
          <div>
            <p style={{marginBottom:'1rem',color:'var(--grey-light)'}}>{jobs.length} job{jobs.length!==1?'s':''} total</p>
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
            {jobs.length===0 && <p style={{color:'var(--grey-light)'}}>No jobs yet. Use Post Job to add your first listing.</p>}
          </div>
        )}

        {/* ── New Blog Post ── */}
        {tab==='newpost' && (
          <div className="card">
            <h3 style={{marginBottom:'1.5rem'}}>Write a New Blog Post</h3>
            <form onSubmit={postBlog}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
                <div className="form-group"><label>Post Title *</label><input value={blogForm.title} onChange={e=>setBlogForm({...blogForm,title:e.target.value})} required placeholder="e.g. Top 5 CV Tips for 2026" /></div>
                <div className="form-group"><label>Category *</label>
                  <select value={blogForm.category} onChange={e=>setBlogForm({...blogForm,category:e.target.value})}>
                    <option value="Job Seekers">Job Seekers</option>
                    <option value="Employers">Employers</option>
                    <option value="Industry Insights">Industry Insights</option>
                    <option value="UAE Opportunities">UAE Opportunities</option>
                    <option value="Company News">Company News</option>
                  </select>
                </div>
              </div>
              <div className="form-group"><label>Short Excerpt * (shown on blog listing page)</label><textarea value={blogForm.excerpt} onChange={e=>setBlogForm({...blogForm,excerpt:e.target.value})} required rows={3} placeholder="A 2-3 sentence summary of the post..." /></div>
              <div className="form-group"><label>Full Article Content *</label><textarea value={blogForm.content} onChange={e=>setBlogForm({...blogForm,content:e.target.value})} required rows={15} placeholder="Write your full article here. You can use plain text or basic HTML..." style={{fontFamily:'monospace',fontSize:'0.9rem'}} /></div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
                <div className="form-group"><label>Cover Image URL</label><input value={blogForm.image} onChange={e=>setBlogForm({...blogForm,image:e.target.value})} placeholder="/images/hero.jpg" /></div>
                <div className="form-group"><label>Status</label>
                  <select value={blogForm.isPublished} onChange={e=>setBlogForm({...blogForm,isPublished:e.target.value==='true'})}>
                    <option value="true">Published</option>
                    <option value="false">Draft</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>{loading?'Publishing...':'Publish Post'}</button>
            </form>
          </div>
        )}

        {/* ── Blog Posts List ── */}
        {tab==='blog' && (
          <div>
            <p style={{marginBottom:'1rem',color:'var(--grey-light)'}}>{posts.length} post{posts.length!==1?'s':''} published</p>
            {posts.map(post=>(
              <div key={post._id} className="card" style={{marginBottom:'1rem',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'1rem'}}>
                <div>
                  <span style={{background:'var(--crimson)',color:'#fff',fontSize:'0.75rem',fontWeight:700,padding:'0.2rem 0.6rem',borderRadius:'999px',marginBottom:'0.5rem',display:'inline-block'}}>{post.category}</span>
                  <h4 style={{marginTop:'0.25rem'}}>{post.title}</h4>
                  <p style={{fontSize:'0.85rem',color:'var(--grey-light)'}}>{new Date(post.createdAt).toLocaleDateString()} · {post.isPublished ? '✅ Published' : '⏸ Draft'}</p>
                </div>
                <button onClick={()=>deletePost(post._id)} className="btn btn-primary" style={{padding:'0.5rem 1rem',fontSize:'0.85rem'}}>Delete</button>
              </div>
            ))}
            {posts.length===0 && <p style={{color:'var(--grey-light)'}}>No blog posts yet. Use New Post to write your first article.</p>}
          </div>
        )}

        {/* ── Applications ── */}
        {tab==='applications' && (
          <div>
            <p style={{marginBottom:'1rem',color:'var(--grey-light)'}}>{applications.length} application{applications.length!==1?'s':''}</p>
            {applications.map(app=>(
              <div key={app._id} className="card" style={{marginBottom:'1rem'}}>
                <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'0.5rem',marginBottom:'0.5rem'}}>
                  <strong>{app.fullName}</strong>
                  <span className={`tag tag-${app.jobCategory}`}>{app.jobCategory}</span>
                </div>
                <p style={{fontSize:'0.85rem',color:'var(--grey-light)'}}>{app.email} · {app.phone} · {new Date(app.createdAt).toLocaleDateString()}</p>
                {app.jobTitle && <p style={{fontSize:'0.9rem',marginTop:'0.25rem'}}>Role: {app.jobTitle}</p>}
                {app.cvUrl && app.cvUrl.startsWith('http') && (
                  <p style={{marginTop:'0.5rem'}}>
                    <a href={app.cvUrl} target="_blank" rel="noreferrer" style={{color:'var(--navy)',fontWeight:600}}>📄 Download CV</a>
                  </p>
                )}
                {app.message && <p style={{marginTop:'0.5rem',fontSize:'0.9rem'}}>{app.message}</p>}
              </div>
            ))}
            {applications.length===0 && <p style={{color:'var(--grey-light)'}}>No applications yet.</p>}
          </div>
        )}

        {/* ── Enquiries ── */}
        {tab==='enquiries' && (
          <div>
            <p style={{marginBottom:'1rem',color:'var(--grey-light)'}}>{employers.length} enquir{employers.length!==1?'ies':'y'}</p>
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
