"use client";

import Script from 'next/script';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Consent = 'granted' | 'denied' | null;

const STORAGE_KEY = 'oneapp.analytics-consent.v1';

export function AnalyticsConsent({
  gaMeasurementId,
  gtmId,
}: {
  gaMeasurementId?: string;
  gtmId?: string;
}) {
  const [consent, setConsent] = useState<Consent>(null);
  const [choiceLoaded, setChoiceLoaded] = useState(false);

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.oneAppUsesGtm = Boolean(gtmId);
    window.oneAppAnalyticsGranted = false;
    window.gtag = window.gtag || function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500,
    });

    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // Storage can be unavailable in privacy-restricted browser contexts.
    }
    const nextConsent = saved === 'granted' || saved === 'denied' ? saved : null;
    window.oneAppAnalyticsGranted = nextConsent === 'granted';
    setConsent(nextConsent);
    setChoiceLoaded(true);
    if (nextConsent === 'granted') {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }
  }, [gtmId]);

  const choose = (nextConsent: Exclude<Consent, null>) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, nextConsent);
    } catch {
      // Consent still applies for this page even if it cannot be persisted.
    }
    window.oneAppAnalyticsGranted = nextConsent === 'granted';
    setConsent(nextConsent);
    window.gtag?.('consent', 'update', {
      analytics_storage: nextConsent,
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  };

  const trackingEnabled = Boolean(gtmId || gaMeasurementId);

  return (
    <>
      {trackingEnabled && consent === 'granted' && gtmId ? (
        <Script id="oneapp-gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      ) : null}

      {trackingEnabled && consent === 'granted' && !gtmId && gaMeasurementId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="oneapp-ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaMeasurementId}',{send_page_view:true});`}
          </Script>
        </>
      ) : null}

      {trackingEnabled && choiceLoaded && consent === null ? (
        <aside
          aria-label="Analytics preferences"
          className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl rounded-2xl border border-white/15 bg-[#17131d]/95 p-4 text-white shadow-2xl backdrop-blur-xl sm:flex sm:items-center sm:gap-6 sm:p-5"
        >
          <p className="text-sm leading-relaxed text-white/65">
            We use analytics to understand which OneApp experiences help commerce teams. Read our{' '}
            <Link href="/privacy" className="font-semibold text-white underline underline-offset-4">
              privacy policy
            </Link>.
          </p>
          <div className="mt-4 flex shrink-0 gap-2 sm:mt-0">
            <button
              type="button"
              onClick={() => choose('denied')}
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/70 transition hover:border-white/35 hover:text-white"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => choose('granted')}
              className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0b0a10] transition hover:bg-[#d7ff7b]"
            >
              Allow analytics
            </button>
          </div>
        </aside>
      ) : null}
    </>
  );
}
