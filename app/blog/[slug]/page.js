import Link from 'next/link';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import styles from './page.module.css';

async function getPost(slug) {
  try {
    const conn = await dbConnect();
    if (!conn) return null;
    const { Blog } = await import('@/lib/models');
    const post = await Blog.findOne({ slug, isPublished: true }).lean();
    if (!post) return null;
    return JSON.parse(JSON.stringify(post));
  } catch { return null; }
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Blog | TrueLak' };
  return {
    title: `${post.title} | TrueLak Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <>
      <div className={styles.hero}>
        <div className="container">
          <Link href="/blog" className={styles.back}>← Back to Blog</Link>
          <div className={styles.meta}>
            <span className={styles.category}>{post.category}</span>
            <span className={styles.date}>
              {new Date(post.createdAt).toLocaleDateString('en-KE', { day:'numeric', month:'long', year:'numeric' })}
            </span>
          </div>
          <h1>{post.title}</h1>
          <p className={styles.intro}>{post.excerpt}</p>
        </div>
      </div>

      <article className={styles.article}>
        <div className={`container ${styles.layout}`}>
          <div className={styles.content}>
            <div
              className={styles.richContent}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <div className={styles.ctaBox}>
              <h3>Ready to take the next step?</h3>
              <p>Whether you are hiring or job seeking, TrueLak is here to help.</p>
              <div style={{display:'flex',gap:'1rem',flexWrap:'wrap',marginTop:'1rem'}}>
                <Link href="/job-seekers" className="btn btn-primary">Submit Your CV</Link>
                <Link href="/employers" className="btn btn-outline" style={{color:'var(--navy)',border:'1.5px solid var(--navy)'}}>Hire Talent</Link>
              </div>
            </div>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.sideCard}>
              <h4>Looking for work?</h4>
              <p>Submit your CV to TrueLak and we will match you with the right employer.</p>
              <Link href="/job-seekers" className="btn btn-primary" style={{display:'block',textAlign:'center',marginTop:'1rem'}}>
                Submit CV
              </Link>
            </div>
            <div className={styles.sideCard}>
              <h4>Hiring?</h4>
              <p>Tell us what role you need filled and we will find the right candidate fast.</p>
              <Link href="/employers" className="btn btn-navy" style={{display:'block',textAlign:'center',marginTop:'1rem'}}>
                Post a Role
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}