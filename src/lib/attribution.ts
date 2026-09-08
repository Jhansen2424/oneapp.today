export type LeadAttribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  msclkid?: string;
  fbclid?: string;
  landing_page?: string;
  referrer?: string;
};

const STORAGE_KEY = 'oneapp.lead-attribution.v1';
const ATTRIBUTION_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'msclkid',
  'fbclid',
] as const;

function clean(value: string | null, maxLength = 500) {
  const trimmed = value?.trim();
  return trimmed ? trimmed.slice(0, maxLength) : undefined;
}

export function captureLeadAttribution(): LeadAttribution {
  if (typeof window === 'undefined') return {};

  let stored: LeadAttribution = {};
  try {
    stored = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}') as LeadAttribution;
  } catch {
    stored = {};
  }

  const params = new URLSearchParams(window.location.search);
  const captured: LeadAttribution = { ...stored };

  for (const key of ATTRIBUTION_KEYS) {
    const value = clean(params.get(key), 255);
    if (value) captured[key] = value;
  }

  captured.landing_page ||= clean(window.location.href, 1000);
  captured.referrer ||= clean(document.referrer, 1000);

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(captured));
  } catch {
    // Privacy modes can disable storage. The current-page values still submit.
  }

  return captured;
}
