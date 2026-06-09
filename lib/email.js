// lib/email.js
// Centralised email notifications using Resend (resend.com - free tier: 3,000/month)

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFY_EMAIL   = process.env.NOTIFY_EMAIL || 'info@truelak.co.ke';
const FROM_EMAIL     = process.env.FROM_EMAIL   || 'notifications@truelak.co.ke';

async function sendEmail({ subject, html }) {
  if (!RESEND_API_KEY) {
    // No API key set yet — log and continue without crashing
    console.log('[Email] RESEND_API_KEY not set. Skipping email:', subject);
    return;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `TrueLak Notifications <${FROM_EMAIL}>`,
        to: [NOTIFY_EMAIL],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[Email] Resend error:', err);
    } else {
      console.log('[Email] Sent:', subject);
    }
  } catch (err) {
    console.error('[Email] Failed to send:', err);
  }
}

// ── Email templates ──────────────────────────────────────────

export async function sendCvApplicationEmail({ fullName, email, phone, jobCategory, jobTitle, message, cvUrl, cvFileName }) {
  await sendEmail({
    subject: `📋 New CV Application — ${fullName} (${jobCategory})`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#0B1F3A;padding:24px;border-radius:8px 8px 0 0;">
          <h2 style="color:white;margin:0;">New CV Application</h2>
          <p style="color:rgba(255,255,255,0.6);margin:4px 0 0;">TrueLak Recruitment Agency</p>
        </div>
        <div style="background:#f7f8fa;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#6b7280;width:140px;"><strong>Name</strong></td><td style="padding:8px 0;color:#111827;">${fullName}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;"><strong>Email</strong></td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#C0192A;">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;"><strong>Phone</strong></td><td style="padding:8px 0;color:#111827;"><a href="tel:${phone}" style="color:#C0192A;">${phone}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;"><strong>Category</strong></td><td style="padding:8px 0;color:#111827;">${jobCategory === 'professional' ? '💼 Professional' : '🔧 Labour'}</td></tr>
            ${jobTitle ? `<tr><td style="padding:8px 0;color:#6b7280;"><strong>Role Sought</strong></td><td style="padding:8px 0;color:#111827;">${jobTitle}</td></tr>` : ''}
            ${message ? `<tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Message</strong></td><td style="padding:8px 0;color:#111827;">${message}</td></tr>` : ''}
          </table>
          ${cvUrl ? `
          <div style="margin-top:20px;padding:16px;background:#f0fdf4;border-radius:6px;border-left:4px solid #16a34a;">
            <p style="margin:0 0 8px;color:#111827;font-size:14px;font-weight:bold;">📄 CV Uploaded: ${cvFileName}</p>
            <a href="${cvUrl}" style="color:#16a34a;font-weight:600;">Click here to download CV</a>
          </div>` : `
          <div style="margin-top:20px;padding:16px;background:#fff3cd;border-radius:6px;border-left:4px solid #C0192A;">
            <p style="margin:0;color:#111827;font-size:14px;">⚠️ No CV was uploaded with this application.</p>
          </div>`}
          <div style="margin-top:20px;text-align:center;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/jobs" style="background:#0B1F3A;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;">View in Admin Panel</a>
          </div>
        </div>
        <p style="text-align:center;color:#9ca3af;font-size:12px;margin-top:16px;">TrueLak Recruitment Agency — East Africa &amp; UAE</p>
      </div>
    `,
  });
}

export async function sendEmployerEnquiryEmail({ companyName, contactPerson, email, phone, roleNeeded, numberOfStaff, jobCategory, message }) {
  await sendEmail({
    subject: `🏢 New Employer Enquiry — ${companyName}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#0B1F3A;padding:24px;border-radius:8px 8px 0 0;">
          <h2 style="color:white;margin:0;">New Employer Enquiry</h2>
          <p style="color:rgba(255,255,255,0.6);margin:4px 0 0;">TrueLak Recruitment Agency</p>
        </div>
        <div style="background:#f7f8fa;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#6b7280;width:160px;"><strong>Company</strong></td><td style="padding:8px 0;color:#111827;font-weight:bold;">${companyName}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;"><strong>Contact Person</strong></td><td style="padding:8px 0;color:#111827;">${contactPerson}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;"><strong>Email</strong></td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#C0192A;">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;"><strong>Phone</strong></td><td style="padding:8px 0;"><a href="tel:${phone}" style="color:#C0192A;">${phone}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;"><strong>Role Needed</strong></td><td style="padding:8px 0;color:#111827;">${roleNeeded}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;"><strong>No. of Staff</strong></td><td style="padding:8px 0;color:#111827;">${numberOfStaff}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;"><strong>Category</strong></td><td style="padding:8px 0;color:#111827;">${jobCategory || 'Not specified'}</td></tr>
            ${message ? `<tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Details</strong></td><td style="padding:8px 0;color:#111827;">${message}</td></tr>` : ''}
          </table>
          <div style="margin-top:20px;text-align:center;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/jobs" style="background:#0B1F3A;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;">View in Admin Panel</a>
          </div>
        </div>
        <p style="text-align:center;color:#9ca3af;font-size:12px;margin-top:16px;">TrueLak Recruitment Agency — East Africa &amp; UAE</p>
      </div>
    `,
  });
}

export async function sendContactEmail({ name, email, phone, type, message }) {
  const typeLabel = type === 'job_seeker' ? '👤 Job Seeker' : type === 'employer' ? '🏢 Employer' : '💬 Other';
  await sendEmail({
    subject: `💬 New Contact Message — ${name}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#0B1F3A;padding:24px;border-radius:8px 8px 0 0;">
          <h2 style="color:white;margin:0;">New Contact Message</h2>
          <p style="color:rgba(255,255,255,0.6);margin:4px 0 0;">TrueLak Recruitment Agency</p>
        </div>
        <div style="background:#f7f8fa;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#6b7280;width:140px;"><strong>Name</strong></td><td style="padding:8px 0;color:#111827;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;"><strong>Email</strong></td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#C0192A;">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding:8px 0;color:#6b7280;"><strong>Phone</strong></td><td style="padding:8px 0;"><a href="tel:${phone}" style="color:#C0192A;">${phone}</a></td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#6b7280;"><strong>Type</strong></td><td style="padding:8px 0;color:#111827;">${typeLabel}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Message</strong></td><td style="padding:8px 0;color:#111827;">${message}</td></tr>
          </table>
          <div style="margin-top:20px;text-align:center;">
            <a href="mailto:${email}" style="background:#C0192A;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;">Reply to ${name}</a>
          </div>
        </div>
        <p style="text-align:center;color:#9ca3af;font-size:12px;margin-top:16px;">TrueLak Recruitment Agency — East Africa &amp; UAE</p>
      </div>
    `,
  });
}
