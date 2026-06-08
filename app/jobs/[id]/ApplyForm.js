'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ApplyForm({ jobId, jobTitle, jobCategory }) {
  const [status, setStatus]         = useState(null);
  const [uploading, setUploading]   = useState(false);
  const [uploadMsg, setUploadMsg]   = useState('');
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const uploadCV = async (file) => {
    try {
      setUploadMsg('Uploading CV...');
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload-cv', { method: 'POST', body: formData });
      if (!res.ok) {
        const err = await res.json();
        console.error('Upload failed:', err);
        return null;
      }
      const data = await res.json();
      setUploadMsg('CV uploaded ✅');
      return data.url || null;
    } catch (err) {
      console.error('Upload error:', err);
      return null;
    }
  };

  const onSubmit = async (data) => {
    try {
      setUploading(true);
      let cvUrl = '';
      let cvFileName = '';

      if (data.cv?.[0]) {
        cvFileName = data.cv[0].name;
        cvUrl = await uploadCV(data.cv[0]) || '';
      }
      setUploading(false);
      setUploadMsg('');

      const fd = new FormData();
      fd.append('fullName',    data.fullName);
      fd.append('email',       data.email);
      fd.append('phone',       data.phone);
      fd.append('jobCategory', jobCategory || 'professional');
      fd.append('jobTitle',    jobTitle || '');
      fd.append('message',     data.message || '');
      fd.append('cvUrl',       cvUrl);
      fd.append('cvFileName',  cvFileName);

      const res = await fetch('/api/applications', { method: 'POST', body: fd });
      if (res.ok) { setStatus('success'); reset(); }
      else setStatus('error');
    } catch {
      setUploading(false);
      setUploadMsg('');
      setStatus('error');
    }
  };

  if (status === 'success') return (
    <div className="alert alert-success">
      ✅ Application submitted! Our team will review your CV and be in touch shortly.
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {status === 'error' && <div className="alert alert-error">Something went wrong. Please try again or WhatsApp us.</div>}
      <div className="form-group">
        <label>Full Name *</label>
        <input {...register('fullName', { required: 'Required' })} placeholder="e.g. Jane Muthoni" />
        {errors.fullName && <span className="form-error">{errors.fullName.message}</span>}
      </div>
      <div className="form-group">
        <label>Email *</label>
        <input type="email" {...register('email', { required: 'Required' })} placeholder="jane@email.com" />
        {errors.email && <span className="form-error">{errors.email.message}</span>}
      </div>
      <div className="form-group">
        <label>Phone *</label>
        <input {...register('phone', { required: 'Required' })} placeholder="+254 700 000 000" />
        {errors.phone && <span className="form-error">{errors.phone.message}</span>}
      </div>
      <div className="form-group">
        <label>Upload CV (PDF or Word) *</label>
        <input type="file" accept=".pdf,.doc,.docx" {...register('cv', { required: 'Please upload your CV' })} />
        {errors.cv && <span className="form-error">{errors.cv.message}</span>}
        {uploading && <p style={{ fontSize: '0.85rem', color: 'var(--crimson)', marginTop: '0.3rem' }}>⏳ {uploadMsg}</p>}
      </div>
      <div className="form-group">
        <label>Cover Message</label>
        <textarea {...register('message')} placeholder="Tell us why you are a great fit..." rows={4} />
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting || uploading}>
        {uploading ? uploadMsg : isSubmitting ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  );
}
