'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function EmployerForm() {
  const [status, setStatus] = useState(null);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/employers', {
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
    return <div className="alert alert-success">✅ Enquiry received! Our team will contact you within 24 business hours.</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {status === 'error' && <div className="alert alert-error">Something went wrong. Please try again or WhatsApp us directly.</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label>Company Name *</label>
          <input {...register('companyName', { required: true })} placeholder="Acme Ltd" />
          {errors.companyName && <span className="form-error">Required</span>}
        </div>
        <div className="form-group">
          <label>Contact Person *</label>
          <input {...register('contactPerson', { required: true })} placeholder="John Kamau" />
          {errors.contactPerson && <span className="form-error">Required</span>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label>Email *</label>
          <input type="email" {...register('email', { required: true })} placeholder="hr@company.com" />
          {errors.email && <span className="form-error">Required</span>}
        </div>
        <div className="form-group">
          <label>Phone Number *</label>
          <input {...register('phone', { required: true })} placeholder="+254 700 000 000" />
          {errors.phone && <span className="form-error">Required</span>}
        </div>
      </div>

      <div className="form-group">
        <label>Role(s) Needed *</label>
        <input {...register('roleNeeded', { required: true })} placeholder="e.g. Accountant, 3 Drivers, Security Guards" />
        {errors.roleNeeded && <span className="form-error">Required</span>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label>Number of Staff *</label>
          <input {...register('numberOfStaff', { required: true })} placeholder="e.g. 2" />
          {errors.numberOfStaff && <span className="form-error">Required</span>}
        </div>
        <div className="form-group">
          <label>Job Category</label>
          <select {...register('jobCategory')}>
            <option value="professional">Professional / White-Collar</option>
            <option value="labour">Labour / Blue-Collar</option>
            <option value="both">Both</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Additional Details</label>
        <textarea {...register('message')} placeholder="Any specific requirements, location, urgency, etc." rows={4} />
      </div>

      <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Submit Hiring Enquiry'}
      </button>
    </form>
  );
}
