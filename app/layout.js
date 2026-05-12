import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata = {
  title: 'TrueLak Recruitment Agency | Professional & Labour Placements in Kenya',
  description: 'TrueLak connects top talent with leading employers across East Africa. Find professional jobs, labour placements, and skilled workers today.',
  keywords: 'recruitment agency Kenya, jobs Nairobi, HR jobs, driver jobs Kenya, staffing agency East Africa',
  openGraph: {
    title: 'TrueLak Recruitment Agency',
    description: 'Connecting talent with opportunity across East Africa.',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'TrueLak Recruitment Agency',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
