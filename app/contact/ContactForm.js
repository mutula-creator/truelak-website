'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ContactForm() {
  const [status, setStatus] = useState(null);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    // Simple contact — could integrate email service here
    // For now we store as an employer enquiry
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) { setStatus('success'); reset(); }
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return <div className="alert alert-success">✅ Message sent! We'll get back to you within 24 hours.</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {status === 'error' && <div className="alert alert-error">Something went wrong. Please WhatsApp us directly.</div>}

      <div className="form-group">
        <label>Your Name *</label>
        <input {...register('name', { required: 'Required' })} placeholder="Full name" />
        {errors.name && <span className="form-error">{errors.name.message}</span>}
      </div>
      <div className="form-group">
        <label>Email *</label>
        <input type="email" {...register('email', { required: 'Required' })} placeholder="you@email.com" />
        {errors.email && <span className="form-error">{errors.email.message}</span>}
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input {...register('phone')} placeholder="+254 700 000 000" />
      </div>
      <div className="form-group">
        <label>I am a *</label>
        <select {...register('type', { required: true })}>
          <option value="job_seeker">Job Seeker</option>
          <option value="employer">Employer / Business</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label>Message *</label>
        <textarea {...register('message', { required: 'Required' })} placeholder="How can we help you?" rows={5} />
        {errors.message && <span className="form-error">{errors.message.message}</span>}
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
