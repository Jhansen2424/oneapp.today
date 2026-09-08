export type AnalyticsEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    oneAppUsesGtm?: boolean;
    oneAppAnalyticsGranted?: boolean;
  }
}

export function trackEvent(name: string, params: AnalyticsEventParams = {}) {
  if (typeof window === 'undefined') return;
  if (window.oneAppAnalyticsGranted !== true) return;

  window.dataLayer = window.dataLayer || [];

  if (window.oneAppUsesGtm) {
    window.dataLayer.push({ event: name, ...params });
    return;
  }

  if (window.gtag) {
    window.gtag('event', name, params);
  }
}
