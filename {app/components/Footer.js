import Link from 'next/link';
import { FaFacebook, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <span className={styles.logoText}>
            <span style={{ color: '#fff' }}>True</span>
            <span style={{ color: 'var(--crimson)' }}>Lak</span>
          </span>
          <p>Connecting talent with opportunity across East Africa. Professional &amp; Labour placements you can trust.</p>
          <div className={styles.socials}>
            <a href="https://www.facebook.com/p/TrueLak-Recruitment-Agency-100075816026848" target="_blank" rel="noreferrer" aria-label="Facebook">
              <FaFacebook size={20} />
            </a>
            <a href="https://linkedin.com/company/truelak-recruitment-agency" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className={styles.heading}>Quick Links</h4>
          <ul className={styles.list}>
            {[
              ['/','Home'],['/about','About Us'],['/services','Services'],
              ['/jobs','Current Vacancies'],['/employers','For Employers'],
              ['/candidates','For Job Seekers'],['/contact','Contact Us'],
            ].map(([href, label]) => (
              <li key={href}><Link href={href}>{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className={styles.heading}>Job Categories</h4>
          <ul className={styles.list}>
            <li>HR &amp; Administration</li>
            <li>Finance &amp; Accounting</li>
            <li>IT &amp; Technology</li>
            <li>Management &amp; Executive</li>
            <li>Drivers &amp; Logistics</li>
            <li>Hospitality &amp; Catering</li>
            <li>Security &amp; Cleaning</li>
            <li>Construction &amp; Labour</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className={styles.heading}>Contact Us</h4>
          <ul className={styles.contact}>
            <li><FaMapMarkerAlt /> Nairobi, Kenya</li>
            <li><FaPhone /> <a href="tel:+254700000000">+254 700 000 000</a></li>
            <li><FaEnvelope /> <a href="mailto:info@truelak.co.ke">info@truelak.co.ke</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p>&copy; {year} TrueLak Recruitment Agency. All rights reserved.</p>
          <p>
            <Link href="/admin/jobs">Admin</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
