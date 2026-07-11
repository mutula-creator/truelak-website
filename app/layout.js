import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Script from 'next/script';

export const metadata = {
  title: 'TrueLak Recruitment Agency | Professional & Labour Placements in East Africa & UAE',
  description: 'TrueLak connects top talent with leading employers across East Africa and UAE.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <Script 
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}