'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
export default function CvForm() {
  const [status, setStatus] = useState(null);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const onSubmit = async (data) => {
    try {
      const fd = new FormData();
      Object.entries(data).forEach(([k,v]) => { if(k==='cv') fd.append(k,v[0]); else fd.append(k,v); });
      const res = await fetch('/api/applications', { method: 'POST', body: fd });
      if (res.ok) { setStatus('success'); reset(); } else setStatus('error');
    } catch { setStatus('error'); }
  };
  if (status==='success') return <div className="alert alert-success">🎉 Your CV has been received! We will be in touch within 1–3 business days.</div>;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {status==='error' && <div className="alert alert-error">Something went wrong. Please try again or email us directly.</div>}
      <div className="form-group"><label>Full Name *</label><input {...register('fullName',{required:'Required'})} placeholder="e.g. Peter Ochieng" />{errors.fullName && <span className="form-error">{errors.fullName.message}</span>}</div>
      <div className="form-group"><label>Email *</label><input type="email" {...register('email',{required:'Required'})} placeholder="peter@email.com" />{errors.email && <span className="form-error">{errors.email.message}</span>}</div>
      <div className="form-group"><label>Phone *</label><input {...register('phone',{required:'Required'})} placeholder="+254 700 000 000" />{errors.phone && <span className="form-error">{errors.phone.message}</span>}</div>
      <div className="form-group"><label>I am looking for *</label><select {...register('jobCategory',{required:true})}><option value="">— Select —</option><option value="professional">Professional / Office Job</option><option value="labour">Labour / Trade Job</option></select>{errors.jobCategory && <span className="form-error">Please select</span>}</div>
      <div className="form-group"><label>Preferred Job Title</label><input {...register('jobTitle')} placeholder="e.g. Accountant, Driver" /></div>
      <div className="form-group"><label>Upload CV (PDF or Word) *</label><input type="file" accept=".pdf,.doc,.docx" {...register('cv',{required:'Please attach your CV'})} />{errors.cv && <span className="form-error">{errors.cv.message}</span>}</div>
      <div className="form-group"><label>Additional Notes</label><textarea {...register('message')} placeholder="Any availability, location preference, etc." rows={3} /></div>
      <button type="submit" className="btn btn-primary" style={{width:'100%'}} disabled={isSubmitting}>{isSubmitting?'Uploading...':'Submit My CV'}</button>
    </form>
  );
}
