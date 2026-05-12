import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import ContactForm from './ContactForm';
import styles from './page.module.css';

export const metadata = { title: 'Contact Us | TrueLak Recruitment Agency' };

export default function ContactPage() {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '254700000000';

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Get in Touch</h1>
          <p>We're here to help — whether you're hiring or job seeking</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.layout}>
            {/* Contact Info */}
            <div>
              <h2 style={{ marginBottom: '2rem' }}>Contact Information</h2>

              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <span className={styles.icon}><FaMapMarkerAlt /></span>
                  <div>
                    <strong>Office Location</strong>
                    <p>Nairobi, Kenya<br />East Africa</p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.icon}><FaPhone /></span>
                  <div>
                    <strong>Phone</strong>
                    <p><a href="tel:+254700000000">+254 700 000 000</a></p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.icon}><FaEnvelope /></span>
                  <div>
                    <strong>Email</strong>
                    <p><a href="mailto:info@truelak.co.ke">info@truelak.co.ke</a></p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.icon} style={{ background: '#25D366' }}><FaWhatsapp /></span>
                  <div>
                    <strong>WhatsApp</strong>
                    <p>
                      <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noreferrer">
                        Chat with us now →
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.socials}>
                <a href="https://www.facebook.com/p/TrueLak-Recruitment-Agency-100075816026848" target="_blank" rel="noreferrer">
                  <FaFacebook /> Facebook — Labour &amp; Trade Jobs
                </a>
                <a href="https://linkedin.com/company/truelak-recruitment-agency" target="_blank" rel="noreferrer">
                  <FaLinkedin /> LinkedIn — Professional Jobs
                </a>
              </div>

              {/* Google Maps Embed placeholder */}
              <div className={styles.mapBox}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255281.19036361946!2d36.707524!3d-1.303209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2ske!4v1700000000000"
                  width="100%"
                  height="240"
                  style={{ border: 0, borderRadius: 8 }}
                  allowFullScreen
                  loading="lazy"
                  title="TrueLak Location"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="card">
              <h3 style={{ marginBottom: '0.25rem' }}>Send Us a Message</h3>
              <p style={{ color: 'var(--grey-light)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                Not sure where to start? Just send us a message and we'll point you in the right direction.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
