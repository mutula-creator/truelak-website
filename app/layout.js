import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata = {
  title: 'TrueLak Recruitment Agency | Professional & Labour Placements in East Africa & UAE',
  description: 'TrueLak connects top talent with leading employers across East Africa and UAE.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'TrueLak Recruitment Agency',
    description: 'TrueLak connects top talent with leading employers across East Africa and UAE.',
    url: 'https://www.truelakrecruitment.com',
    siteName: 'TrueLak Recruitment Agency',
    locale: 'en_KE',
    type: 'website',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TrueLak Recruitment Agency',
  url: 'https://www.truelakrecruitment.com',
  logo: 'https://www.truelakrecruitment.com/images/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+254735111625',
    contactType: 'customer service',
    areaServed: ['KE', 'AE'],
    availableLanguage: 'English',
  },
  sameAs: [
    'https://www.facebook.com/p/TrueLak-Recruitment-Agency-100075816026848',
    'https://linkedin.com/company/truelak-recruitment-agency',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}