import '~/styles/globals.css';

import { type Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';

const BASE_URL = 'https://oneapp.today';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'OneApp | AI-Powered Website Builder, SEO, CRM & Billing for Service Businesses',
    template: '%s | OneApp',
  },
  description:
    "OneApp is an all-in-one AI platform for service businesses. Build websites with AI, automate SEO & AEO, manage leads with a built-in CRM, and handle invoicing & payments — all from one dashboard. More revenue. Less chaos.",
  keywords: [
    'AI website builder',
    'AI-powered business platform',
    'CRM for service businesses',
    'automated invoicing software',
    'SEO automation tool',
    'AEO AI engine optimization',
    'all-in-one business software',
    'website builder for small business',
    'lead management CRM',
    'billing and payments platform',
    'OneApp',
    'AI business automation',
    'service business software',
    'web design automation',
    'subscription billing software',
  ],
  authors: [{ name: 'OneApp', url: BASE_URL }],
  creator: 'OneApp',
  publisher: 'OneApp',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'OneApp | AI-Powered Website Builder, SEO, CRM & Billing',
    description:
      "All-in-one AI platform for service businesses. Build websites, automate SEO, manage leads, and handle billing — from one dashboard.",
    url: BASE_URL,
    siteName: 'OneApp',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/oneapp-logo.png`,
        width: 1200,
        height: 630,
        alt: 'OneApp - AI-Powered All-in-One Business Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OneApp | AI-Powered Website Builder, SEO, CRM & Billing',
    description:
      "All-in-one AI platform for service businesses. Build websites, automate SEO, manage leads, and handle billing — from one dashboard.",
    images: [`${BASE_URL}/oneapp-logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [{ url: '/Facebook-Profile.jpg', type: 'image/jpeg' }],
    shortcut: '/Facebook-Profile.jpg',
    apple: [{ url: '/Facebook-Profile.jpg' }],
  },
  alternates: {
    canonical: BASE_URL,
  },
  other: {
    'ai-content-declaration': 'This website describes OneApp, an AI-powered all-in-one business platform for service businesses.',
  },
};

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'OneApp',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/oneapp-logo.png`,
      },
      description:
        'OneApp is an all-in-one AI-powered platform for service businesses, combining website building, SEO, CRM, and billing into a single dashboard.',
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'OneApp',
      publisher: { '@id': `${BASE_URL}/#organization` },
      description:
        'AI-powered all-in-one business platform. Build websites, automate SEO & AEO, manage leads with CRM, and handle invoicing — from one dashboard.',
    },
    {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/#webpage`,
      url: BASE_URL,
      name: 'OneApp | AI-Powered Website Builder, SEO, CRM & Billing for Service Businesses',
      isPartOf: { '@id': `${BASE_URL}/#website` },
      about: { '@id': `${BASE_URL}/#organization` },
      description:
        'OneApp is an all-in-one AI platform for service businesses. Build websites with AI, automate SEO & AEO, manage leads with a built-in CRM, and handle invoicing & payments.',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'OneApp',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: BASE_URL,
      description:
        'All-in-one AI-powered business platform combining AI website builder, SEO & AEO automation, CRM with lead management, web design optimization, and invoicing & billing for service businesses.',
      offers: {
        '@type': 'Offer',
        price: '297',
        priceCurrency: 'USD',
        description: 'Monthly subscription starting at $297/mo after $3,500 one-time setup',
      },
      featureList: [
        'AI Website Builder — describe your site and generate it instantly',
        'SEO & AEO Automation — rank on Google and get cited by AI search engines',
        'Conversion-Optimized Web Design — fast, mobile-first, performance-tuned sites',
        'Built-in CRM — track leads, manage pipeline, automate follow-ups',
        'Invoicing & Billing — branded invoices, payment collection, subscription management',
      ],
      provider: { '@id': `${BASE_URL}/#organization` },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is OneApp?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'OneApp is an all-in-one AI-powered platform for service businesses that combines website building, SEO & AEO optimization, CRM, web design, and invoicing into a single dashboard. It replaces fragmented tools with one unified system.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does OneApp help with SEO and AI search?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'OneApp automates both traditional SEO (Google rankings) and AI Engine Optimization (AEO) so your business gets found by Google, ChatGPT, Perplexity, and other AI search engines. It handles keyword tracking, content optimization, and structured data automatically.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does OneApp cost?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'OneApp has a one-time setup fee of $3,500 for custom website build and system integration, then monthly plans starting at $297/mo for the Starter tier, $497/mo for Growth, and $797/mo for Scale.',
          },
        },
        {
          '@type': 'Question',
          name: 'Who is OneApp built for?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'OneApp is built for service businesses — agencies, contractors, consultants, and local businesses that need a professional website, lead management, and billing in one place without juggling multiple tools.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrains.variable}`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
