'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from './Navbar.module.css';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/jobs', label: 'Current Vacancies' },
  { href: '/employers', label: 'For Employers' },
  { href: '/candidates', label: 'For Job Seekers' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/logo.jpg"
            alt="TrueLak Recruitment Agency"
            width={140}
            height={52}
            style={{ objectFit: 'contain', height: '52px', width: 'auto' }}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.nav}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={styles.navLink}>
              {l.label}
            </Link>
          ))}
          <Link href="/jobs" className="btn btn-primary" style={{ padding: '0.55rem 1.3rem', fontSize: '0.88rem' }}>
            Find a Job
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button className={styles.toggle} onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className={styles.mobileMenu}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={styles.mobileLink} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/jobs" className={`btn btn-primary ${styles.mobileCta}`} onClick={() => setOpen(false)}>
            Find a Job
          </Link>
        </div>
      )}
    </header>
  );
}
