'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
export default function ApplyForm({ jobId, jobTitle, jobCategory }) {
  const [status, setStatus] = useState(null);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const onSubmit = async (data) => {
    try {
      const fd = new FormData();
      Object.entries(data).forEach(([k,v]) => { if(k==='cv') fd.append(k,v[0]); else fd.append(k,v); });
      fd.append('jobId', jobId||''); fd.append('jobTitle', jobTitle||''); fd.append('jobCategory', jobCategory||'professional');
      const res = await fetch('/api/applications', { method: 'POST', body: fd });
      if (res.ok) { setStatus('success'); reset(); } else setStatus('error');
    } catch { setStatus('error'); }
  };
  if (status==='success') return <div className="alert alert-success">✅ Application submitted! Our team will be in touch shortly.</div>;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {status==='error' && <div className="alert alert-error">Something went wrong. Please try again or WhatsApp us.</div>}
      <div className="form-group"><label>Full Name *</label><input {...register('fullName',{required:'Required'})} placeholder="e.g. Jane Muthoni" />{errors.fullName && <span className="form-error">{errors.fullName.message}</span>}</div>
      <div className="form-group"><label>Email *</label><input type="email" {...register('email',{required:'Required'})} placeholder="jane@email.com" />{errors.email && <span className="form-error">{errors.email.message}</span>}</div>
      <div className="form-group"><label>Phone *</label><input {...register('phone',{required:'Required'})} placeholder="+254 700 000 000" />{errors.phone && <span className="form-error">{errors.phone.message}</span>}</div>
      <div className="form-group"><label>Upload CV (PDF or Word) *</label><input type="file" accept=".pdf,.doc,.docx" {...register('cv',{required:'Please upload your CV'})} />{errors.cv && <span className="form-error">{errors.cv.message}</span>}</div>
      <div className="form-group"><label>Cover Message</label><textarea {...register('message')} placeholder="Tell us why you are a great fit..." rows={4} /></div>
      <button type="submit" className="btn btn-primary" style={{width:'100%'}} disabled={isSubmitting}>{isSubmitting?'Submitting...':'Submit Application'}</button>
    </form>
  );
}
