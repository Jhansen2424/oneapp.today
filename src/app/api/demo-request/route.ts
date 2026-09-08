import { type NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const MAX_BODY_BYTES = 20_000;
const FORM_URL_PATTERN = /^https:\/\/(staging|prod)\.oneapp\.today\/api\/v1\/lead-forms\/[a-f0-9]{32}\/submit$/i;

type DemoRequest = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  websiteUrl?: unknown;
  message?: unknown;
  companyUrl?: unknown;
  clientSubmissionId?: unknown;
  attribution?: Record<string, unknown>;
};

const attributionKeys = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'msclkid',
  'fbclid',
  'landing_page',
  'referrer',
] as const;

function text(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function response(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

function leadFormUrl() {
  const configured = process.env.ONEAPP_LEAD_FORM_URL?.trim();
  return configured && FORM_URL_PATTERN.test(configured) ? configured : null;
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return response({ success: false, message: 'Request is too large.' }, 413);
  }

  let body: DemoRequest;
  try {
    body = (await request.json()) as DemoRequest;
  } catch {
    return response({ success: false, message: 'Invalid request.' }, 400);
  }

  // A bot receives an indistinguishable success response without creating a lead.
  if (text(body.companyUrl, 500)) {
    return response({ success: true, message: 'Request received.' }, 200);
  }

  const firstName = text(body.firstName, 80);
  const lastName = text(body.lastName, 80);
  const email = text(body.email, 254).toLowerCase();
  const phone = text(body.phone, 40);
  const company = text(body.company, 160);
  const websiteUrl = text(body.websiteUrl, 500);
  const message = text(body.message, 3000);
  const clientSubmissionId = text(body.clientSubmissionId, 64);

  if (!firstName || !lastName || !company || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    return response({ success: false, message: 'Please complete the required fields.' }, 400);
  }

  const url = leadFormUrl();
  if (!url) {
    console.error('[demo-request] ONEAPP_LEAD_FORM_URL is missing or invalid');
    return response({ success: false, message: 'Demo requests are temporarily unavailable.' }, 503);
  }

  const attribution = body.attribution || {};
  const outbound: Record<string, string> = {
    first_name: firstName,
    last_name: lastName,
    email,
    company,
    message,
    client_submission_id: clientSubmissionId,
    _hp: '',
  };
  if (phone) outbound.phone = phone;
  if (websiteUrl) outbound.website = websiteUrl;

  for (const key of attributionKeys) {
    const value = text(attribution[key], key.endsWith('page') || key === 'referrer' ? 1000 : 255);
    if (value) outbound[key] = value;
  }

  try {
    const upstream = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'OneApp.today demo request proxy',
      },
      body: JSON.stringify(outbound),
      cache: 'no-store',
      signal: AbortSignal.timeout(20_000),
    });

    const result = (await upstream.json().catch(() => ({}))) as {
      success?: boolean;
      message?: string;
      contactId?: number | null;
      leadId?: number | null;
    };

    if (!upstream.ok || result.success !== true) {
      console.error('[demo-request] OneApp rejected submission', {
        status: upstream.status,
        submissionId: clientSubmissionId,
      });
      return response({ success: false, message: 'We could not send your request.' }, 502);
    }

    console.info('[demo-request] OneApp accepted submission', {
      submissionId: clientSubmissionId,
      contactId: result.contactId || result.leadId || null,
    });
    return response({ success: true, message: result.message || 'Request received.' }, 200);
  } catch (error) {
    console.error('[demo-request] OneApp request failed', {
      submissionId: clientSubmissionId,
      error: error instanceof Error ? error.message : String(error),
    });
    return response({ success: false, message: 'We could not send your request.' }, 502);
  }
}
