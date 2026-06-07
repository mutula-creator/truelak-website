import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import styles from './page.module.css';

export const metadata = { title: 'Blog & News | TrueLak Recruitment Agency' };

const STATIC_POSTS = [
  { _id: 'how-to-write-a-standout-cv', slug: 'how-to-write-a-standout-cv', category: 'Job Seekers', createdAt: '2026-05-12', title: 'How to Write a CV That Gets You Noticed in 2026', excerpt: 'A strong CV is your first impression. Here are the key elements every job seeker in East Africa should include to stand out from hundreds of applicants.', image: '/images/white.jpg' },
];

async function getPosts() {
  try {
    const conn = await dbConnect();
    if (!conn) return STATIC_POSTS;
    const { Blog } = await import('@/lib/models');
    const dbPosts = await Blog.find({ isPublished: true }).sort({ createdAt: -1 }).lean();
    const serialized = JSON.parse(JSON.stringify(dbPosts));
    return serialized.length > 0 ? [...serialized, ...STATIC_POSTS] : STATIC_POSTS;
  } catch { return STATIC_POSTS; }
}

export default async function BlogPage() {
  const posts = await getPosts();
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
            {posts.map((post) => (
              <article key={post._id} className={styles.card}>
                <div className={styles.cardImage} style={{ backgroundImage: `url(${post.image})` }}>
                  <span className={styles.catTag}>{post.category}</span>
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.date}>{new Date(post.createdAt).toLocaleDateString('en-KE', { day:'numeric', month:'long', year:'numeric' })}</p>
                  <h2 className={styles.title}>{post.title}</h2>
                  <p className={styles.excerpt}>{post.excerpt}</p>
                  <Link href={post.slug ? `/blog/${post.slug}` : '#'} className={styles.readMore}>Read More →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background:'var(--navy)', padding:'4rem 0' }}>
        <div className="container" style={{ textAlign:'center' }}>
          <h2 style={{ color:'var(--white)', marginBottom:'0.75rem' }}>Ready to take the next step?</h2>
          <p style={{ color:'rgba(255,255,255,0.65)', marginBottom:'2rem' }}>Whether you are hiring or job seeking, TrueLak is here to help.</p>
          <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/jobs" className="btn btn-primary">Browse Jobs</Link>
            <Link href="/contact" className="btn btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
