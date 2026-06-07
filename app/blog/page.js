import Link from 'next/link';
import styles from './page.module.css';

export const metadata = { title: 'Blog & News | TrueLak Recruitment Agency' };

const POSTS = [
  {
    slug: 'how-to-write-a-standout-cv',
    category: 'Job Seekers',
    date: 'May 12, 2026',
    title: 'How to Write a CV That Gets You Noticed in 2026',
    excerpt: 'A strong CV is your first impression. Here are the key elements every job seeker in East Africa should include to stand out from hundreds of applicants.',
    image: '/images/white.jpg',
  },
  {
    slug: 'hiring-in-kenya-what-employers-need-to-know',
    category: 'Employers',
    date: 'April 28, 2026',
    title: 'Hiring in Kenya: What Every Employer Needs to Know',
    excerpt: 'From employment contracts to statutory deductions, navigating Kenyan labour law can be complex. We break down what employers must get right before making their first hire.',
    image: '/images/blue.jpg',
  },
  {
    slug: 'top-in-demand-jobs-east-africa-2026',
    category: 'Industry Insights',
    date: 'April 10, 2026',
    title: 'The Most In-Demand Jobs in East Africa Right Now',
    excerpt: 'Technology, logistics, and healthcare are driving explosive hiring growth across Kenya, Uganda, and Tanzania. Here are the roles companies are scrambling to fill.',
    image: '/images/hero.jpg',
  },
  {
    slug: 'uae-job-market-opportunities-for-kenyan-professionals',
    category: 'UAE Opportunities',
    date: 'March 20, 2026',
    title: 'UAE Job Market: Opportunities for East African Professionals',
    excerpt: 'The UAE continues to be a top destination for skilled professionals from East Africa. We explore the sectors with the most openings and how TrueLak can help you make the move.',
    image: '/images/about_us.jpg',
  },
];

export default function BlogPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Blog &amp; News</h1>
          <p>Recruitment tips, industry insights, and career advice for East Africa and UAE</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {POSTS.map((post) => (
              <article key={post.slug} className={styles.card}>
                <div className={styles.cardImage} style={{ backgroundImage: `url(${post.image})` }}>
                  <span className={styles.catTag}>{post.category}</span>
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.date}>{post.date}</p>
                  <h2 className={styles.title}>{post.title}</h2>
                  <p className={styles.excerpt}>{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--navy)', padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'var(--white)', marginBottom: '0.75rem' }}>Ready to take the next step?</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '2rem' }}>Whether you are hiring or job seeking, TrueLak is here to help.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/jobs" className="btn btn-primary">Browse Jobs</Link>
            <Link href="/contact" className="btn btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
