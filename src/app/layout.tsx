import '~/styles/globals.css';

import { type Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';

const BASE_URL = 'https://oneapp.today';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'OneApp | Automate More. Manage Less. Grow Faster.',
    template: '%s | OneApp',
  },
  description:
    "We build fast, secure, and scalable digital systems that replace plugin chaos with automation. From websites and CRM to workflows, everything works together so your business runs smoother.",
  keywords: [
    'business automation',
    'AI-powered business systems',
    'CRM software',
    'AI voice agents',
    'website automation',
    'OneApp',
    'automated lead follow-up',
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
    title: 'OneApp | Automate More. Manage Less. Grow Faster.',
    description:
      "We build fast, secure, and scalable digital systems that replace plugin chaos with automation.",
    url: BASE_URL,
    siteName: 'OneApp',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'OneApp - AI-Powered Business Systems',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OneApp | Automate More. Manage Less. Grow Faster.',
    description:
      "We build fast, secure, and scalable digital systems that replace plugin chaos with automation.",
    images: [`${BASE_URL}/og-image.jpg`],
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrains.variable}`}
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
