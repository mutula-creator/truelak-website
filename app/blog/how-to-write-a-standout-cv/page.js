import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'How to Write a CV That Gets You Noticed in 2026 | TrueLak Blog',
  description: 'A strong CV is your first impression. Here are the key elements every job seeker in East Africa should include to stand out from hundreds of applicants.',
};

export default function BlogPostCV() {
  return (
    <>
      {/* Hero */}
      <div className={styles.hero}>
        <div className="container">
          <Link href="/blog" className={styles.back}>← Back to Blog</Link>
          <div className={styles.meta}>
            <span className={styles.category}>Job Seekers</span>
            <span className={styles.date}>May 12, 2026</span>
            <span className={styles.readTime}>6 min read</span>
          </div>
          <h1>How to Write a CV That Gets You Noticed in 2026</h1>
          <p className={styles.intro}>
            A strong CV is your first impression on any employer. In a competitive job market across East Africa and the UAE,
            the difference between getting an interview and being overlooked often comes down to just a few key details.
            Here is exactly what you need to include — and what to leave out.
          </p>
        </div>
      </div>

      {/* Article body */}
      <article className={styles.article}>
        <div className={`container ${styles.layout}`}>

          {/* Main content */}
          <div className={styles.content}>

            <div className={styles.tip}>
              <strong>TrueLak Tip:</strong> Recruiters spend an average of 7 seconds scanning a CV before deciding whether to read further. Make those 7 seconds count.
            </div>

            <h2>1. Start with a strong personal statement</h2>
            <p>
              The top of your CV should include a 3–4 sentence professional summary that tells the reader who you are,
              what you do, and what value you bring. Avoid generic phrases like "hardworking team player" — instead, be specific.
            </p>
            <div className={styles.example}>
              <p className={styles.exampleLabel}>Good example:</p>
              <p className={styles.exampleText}>
                "Results-driven CPA with 5 years of experience in financial reporting and tax compliance for manufacturing firms
                in Nairobi. Reduced audit preparation time by 40% through process automation. Seeking a senior finance role
                where I can drive efficiency and accuracy."
              </p>
            </div>
            <div className={styles.example} style={{ borderColor: '#E24B4A' }}>
              <p className={styles.exampleLabel} style={{ color: '#A32D2D' }}>Avoid:</p>
              <p className={styles.exampleText}>
                "I am a hardworking and dedicated professional looking for a challenging opportunity to grow my career in a dynamic organisation."
              </p>
            </div>

            <h2>2. Tailor your CV for every application</h2>
            <p>
              One of the biggest mistakes job seekers make is sending the same CV to every employer. Take 10 minutes to read
              the job description carefully and mirror the language and keywords used. If the job asks for "stakeholder management"
              and you have that experience, use those exact words — many companies use software to scan CVs before a human reads them.
            </p>
            <ul className={styles.list}>
              <li>Match your job title to the one advertised (if accurate)</li>
              <li>Include skills listed in the job description that you genuinely have</li>
              <li>Reorder your bullet points to lead with the most relevant experience</li>
              <li>Adjust your personal statement for each role</li>
            </ul>

            <h2>3. Quantify your achievements</h2>
            <p>
              Employers are not just interested in what you did — they want to know the impact. Wherever possible,
              add numbers to your experience.
            </p>
            <div className={styles.compareGrid}>
              <div className={styles.compareCard} style={{ borderTop: '3px solid #E24B4A' }}>
                <p className={styles.compareLabel}>Weak</p>
                <p>"Managed a team of drivers"</p>
                <p>"Responsible for social media"</p>
                <p>"Helped increase sales"</p>
              </div>
              <div className={styles.compareCard} style={{ borderTop: '3px solid #1D9E75' }}>
                <p className={styles.compareLabel}>Strong</p>
                <p>"Managed a team of 12 drivers across 3 routes"</p>
                <p>"Grew Instagram following from 2K to 18K in 6 months"</p>
                <p>"Increased branch sales by 23% in Q3 2025"</p>
              </div>
            </div>

            <h2>4. Keep the format clean and simple</h2>
            <p>
              A cluttered CV is hard to read and looks unprofessional. Follow these formatting rules:
            </p>
            <ul className={styles.list}>
              <li><strong>Font:</strong> Use a clean font like Calibri, Arial, or Garamond at 10–12pt</li>
              <li><strong>Length:</strong> 1 page for under 5 years experience, 2 pages maximum for senior roles</li>
              <li><strong>Margins:</strong> Keep margins at 1.5–2cm on all sides</li>
              <li><strong>Colour:</strong> A subtle accent colour is fine (navy, dark green) but avoid bright or distracting colours</li>
              <li><strong>File format:</strong> Always save and send as PDF — Word documents can lose formatting on different devices</li>
            </ul>

            <h2>5. Essential sections every CV must have</h2>
            <div className={styles.sectionsGrid}>
              {[
                { icon: '👤', title: 'Contact details', desc: 'Full name, phone number, professional email, LinkedIn URL, and city/town. No need to include your full home address.' },
                { icon: '📝', title: 'Personal statement', desc: '3–4 lines summarising who you are and what you bring. Tailored for each application.' },
                { icon: '💼', title: 'Work experience', desc: 'Listed in reverse chronological order. Include company name, your title, dates, and 3–5 bullet points of achievements.' },
                { icon: '🎓', title: 'Education', desc: 'Degree or diploma, institution, and year of completion. Add GPA only if it was strong (above 3.0 / upper second).' },
                { icon: '🛠', title: 'Skills', desc: 'Technical skills relevant to the role. For professional roles: software tools, languages, certifications. For labour roles: licences, machinery, trade skills.' },
                { icon: '📜', title: 'Certifications', desc: 'Any professional certifications — CPA, CIPS, NEBOSH, driving licence class, security training, etc.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className={styles.sectionCard}>
                  <span className={styles.sectionIcon}>{icon}</span>
                  <div>
                    <strong>{title}</strong>
                    <p>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2>6. Common mistakes to avoid</h2>
            <ul className={styles.list}>
              <li>Including a photo (not required and can introduce unconscious bias)</li>
              <li>Listing references on the CV — simply write "References available on request"</li>
              <li>Using an unprofessional email address (create a gmail with your name)</li>
              <li>Spelling and grammar errors — always proofread at least twice</li>
              <li>Lying or exaggerating — employers do background checks</li>
              <li>Including irrelevant personal details like marital status, religion, or date of birth</li>
            </ul>

            <h2>7. For labour and trade roles specifically</h2>
            <p>
              If you are applying for a driving, security, hospitality, or construction role, your CV can be shorter and more direct.
              Focus on:
            </p>
            <ul className={styles.list}>
              <li>Your licence class and years of experience (for drivers)</li>
              <li>Any certifications — NEBOSH, security training certificates, food handler certificates</li>
              <li>The types of vehicles, equipment, or tools you have operated</li>
              <li>Names of previous employers and duration — reliability matters hugely in these roles</li>
            </ul>

            <div className={styles.ctaBox}>
              <h3>Ready to put your CV to work?</h3>
              <p>
                Submit your CV to TrueLak today and our recruitment team will match you with suitable opportunities
                across East Africa and the UAE — completely free of charge.
              </p>
              <Link href="/job-seekers" className="btn btn-primary">Submit Your CV</Link>
            </div>

          </div>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sideCard}>
              <h4>In this article</h4>
              <ul className={styles.toc}>
                <li><a href="#s1">1. Personal statement</a></li>
                <li><a href="#s2">2. Tailor your CV</a></li>
                <li><a href="#s3">3. Quantify achievements</a></li>
                <li><a href="#s4">4. Format and design</a></li>
                <li><a href="#s5">5. Essential sections</a></li>
                <li><a href="#s6">6. Common mistakes</a></li>
                <li><a href="#s7">7. Labour & trade roles</a></li>
              </ul>
            </div>

            <div className={styles.sideCard}>
              <h4>Looking for work?</h4>
              <p>Submit your CV to TrueLak and we will match you with the right employer.</p>
              <Link href="/job-seekers" className="btn btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: '1rem' }}>
                Submit CV
              </Link>
            </div>

            <div className={styles.sideCard}>
              <h4>More articles</h4>
              <ul className={styles.relatedList}>
                <li><Link href="/blog/hiring-in-kenya-what-employers-need-to-know">Hiring in Kenya: What Employers Need to Know</Link></li>
                <li><Link href="/blog/top-in-demand-jobs-east-africa-2026">Most In-Demand Jobs in East Africa Right Now</Link></li>
                <li><Link href="/blog/uae-job-market-opportunities-for-kenyan-professionals">UAE Job Market: Opportunities for East Africans</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
