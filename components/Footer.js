import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logoWrap}>
            <Image src="/images/truelak-logo.svg" alt="TrueLak Recruitment Agency" width={130} height={48}
              style={{ objectFit: 'contain', height: '48px', width: 'auto' }} />
          </div>
          <p>Connecting talent with opportunity across East Africa and UAE. Professional &amp; Labour placements you can trust.</p>
          <div className={styles.socials}>
            <a href="https://www.facebook.com/p/TrueLak-Recruitment-Agency-100075816026848" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebook size={20} /></a>
            <a href="https://linkedin.com/company/truelak-recruitment-agency" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className={styles.heading}>Quick Links</h4>
          <ul className={styles.list}>
            {[['/','Home'],['/about','About Us'],['/jobs','Find a Job'],
              ['/employers','For Employers'],['/candidates','For Job Seekers'],
              ['/blog','Blog'],['/contact','Contact Us']
            ].map(([href, label]) => (
              <li key={href}><Link href={href}>{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className={styles.heading}>Contact Us</h4>
          <ul className={styles.contact}>
            <li><FaMapMarkerAlt /> Nairobi, Kenya &amp; UAE</li>
            <li><FaPhone /> <a href="tel:+254700000000">+254 700 000 000</a></li>
            <li><FaEnvelope /> <a href="mailto:info@truelak.co.ke">info@truelak.co.ke</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p>&copy; {year} TrueLak Recruitment Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
