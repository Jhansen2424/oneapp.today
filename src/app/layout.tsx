import '~/styles/globals.css';

import { type Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { AnalyticsConsent } from '~/components/AnalyticsConsent';
import { OneAppLiveChat } from '~/components/OneAppLiveChat';

const BASE_URL = 'https://www.oneapp.today';

function validTrackingId(value: string | undefined, pattern: RegExp) {
  const normalized = value?.trim();
  return normalized && pattern.test(normalized) ? normalized : undefined;
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'OneApp | The AI Operating System for Commerce Growth',
    template: '%s | OneApp',
  },
  description:
    'Connect acquisition, products, marketplaces, customers, and operations. OneApp turns commerce signals into coordinated growth action.',
  keywords: [
    'commerce operating system',
    'AI ecommerce platform',
    'commerce growth intelligence',
    'marketplace automation',
    'ecommerce operations software',
    'product data automation',
    'commerce AI agents',
    'multi-channel commerce platform',
    'OneApp',
    'AI commerce automation',
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
    title: 'OneApp | AI Growth Engine for Commerce',
    description:
      'Connect acquisition, products, marketplaces, customers and operations with AI built for commerce growth.',
    url: BASE_URL,
    siteName: 'OneApp',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/social/oneapp-ai-growth-engine-v2.png`,
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'OneApp. AI Growth Engine for Commerce.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OneApp | AI Growth Engine for Commerce',
    description:
      'Connect acquisition, products, marketplaces, customers and operations with AI built for commerce growth.',
    images: [{
      url: `${BASE_URL}/social/oneapp-ai-growth-engine-v2.png`,
      alt: 'OneApp. AI Growth Engine for Commerce.',
    }],
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
    'ai-content-declaration': 'This website describes OneApp, an AI operating system for commerce growth.',
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
        'OneApp is an AI operating system connecting acquisition, products, marketplaces, customers, and commerce operations.',
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'OneApp',
      publisher: { '@id': `${BASE_URL}/#organization` },
      description:
        'AI-powered commerce operating system that turns connected signals into coordinated growth action.',
    },
    {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/#webpage`,
      url: BASE_URL,
      name: 'OneApp | The AI Operating System for Commerce Growth',
      isPartOf: { '@id': `${BASE_URL}/#website` },
      about: { '@id': `${BASE_URL}/#organization` },
      description:
        'OneApp connects acquisition, product data, marketplaces, customers, and operations for commerce brands.',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'OneApp',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: BASE_URL,
      description:
        'AI operating system for commerce growth, combining intelligence, workflows, integrations, and AI execution across the commerce operation.',
      featureList: [
        'Growth intelligence connecting advertising, product economics, margin, and inventory',
        'Commerce operations workflows for teams and AI agents',
        'Marketplace and product data coordination',
        'Customer intelligence across leads, conversations, and retention',
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
            text: 'OneApp is an AI operating system that connects acquisition, products, marketplaces, customers, and operations so commerce teams can turn intelligence into coordinated action.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does OneApp help commerce teams grow?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'OneApp connects commercial signals across advertising, products, inventory, customers, and marketplaces, then helps operators and AI agents prioritize and execute the highest-value work.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is OneApp software or a managed service?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'OneApp is the commerce platform. Brands that also want an embedded strategy and operating team can engage Webaholics for managed growth powered by OneApp.',
          },
        },
        {
          '@type': 'Question',
          name: 'Who is OneApp built for?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'OneApp is built for established commerce brands and operators managing multiple channels, products, marketplaces, customer signals, and operational workflows.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const gtmId = validTrackingId(process.env.NEXT_PUBLIC_GTM_ID, /^GTM-[A-Z0-9]+$/);
  const gaMeasurementId = validTrackingId(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, /^G-[A-Z0-9]+$/);

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
        <OneAppLiveChat />
        <AnalyticsConsent gtmId={gtmId} gaMeasurementId={gaMeasurementId} />
      </body>
    </html>
  );
}
