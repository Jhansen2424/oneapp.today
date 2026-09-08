"use client";

import { ArrowRight, Check, LoaderCircle } from 'lucide-react';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import { captureLeadAttribution, type LeadAttribution } from '~/lib/attribution';
import { trackEvent } from '~/lib/analytics';

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  websiteUrl: string;
  message: string;
  companyUrl: string;
};

const initialForm: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  websiteUrl: '',
  message: '',
  companyUrl: '',
};

export function DemoRequestForm() {
  const [form, setForm] = useState(initialForm);
  const [attribution, setAttribution] = useState<LeadAttribution>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const started = useRef(false);

  useEffect(() => {
    setAttribution(captureLeadAttribution());
  }, []);

  const update = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    trackEvent('form_start', { form_name: 'platform_demo' });
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    setError('');

    try {
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          attribution: {
            ...attribution,
            landing_page: attribution.landing_page || window.location.href,
            referrer: attribution.referrer || document.referrer || undefined,
          },
          clientSubmissionId: crypto.randomUUID(),
        }),
      });

      const result = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || result.success !== true) {
        throw new Error(result.message || 'We could not send your request.');
      }

      setStatus('success');
      setForm(initialForm);
      trackEvent('generate_lead', {
        form_name: 'platform_demo',
        form_destination: 'oneapp_crm',
      });
    } catch (submitError) {
      console.error('[demo-request] submission failed', submitError);
      setStatus('error');
      setError('We could not send your request. Please try again or email info@oneapp.today.');
      trackEvent('form_error', {
        form_name: 'platform_demo',
        error_type: 'submission_failed',
      });
    }
  };

  if (status === 'success') {
    return (
      <div className="mx-auto max-w-xl rounded-[28px] border border-[#69f7d3]/25 bg-[#69f7d3]/[0.08] p-8 text-left sm:p-10" role="status">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#69f7d3]/15 text-[#69f7d3]">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="mt-6 text-3xl font-bold tracking-[-.04em]">Your request is in.</h3>
        <p className="mt-3 leading-relaxed text-white/60">
          We&apos;ll review your commerce operation and follow up within one business day.
        </p>
      </div>
    );
  }

  const inputClass =
    'mt-2 w-full rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3.5 text-base text-white outline-none transition placeholder:text-white/25 focus:border-[#c153ff]/70 focus:ring-2 focus:ring-[#c153ff]/15';

  return (
    <form onSubmit={submit} onFocus={markStarted} className="mx-auto mt-10 max-w-3xl text-left">
      <input
        type="text"
        name="companyUrl"
        value={form.companyUrl}
        onChange={(event) => update('companyUrl', event.target.value)}
        className="absolute -left-[10000px] h-px w-px overflow-hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-white/70">
          First name
          <input
            required
            name="firstName"
            autoComplete="given-name"
            maxLength={80}
            value={form.firstName}
            onChange={(event) => update('firstName', event.target.value)}
            className={inputClass}
          />
        </label>
        <label className="text-sm font-semibold text-white/70">
          Last name
          <input
            required
            name="lastName"
            autoComplete="family-name"
            maxLength={80}
            value={form.lastName}
            onChange={(event) => update('lastName', event.target.value)}
            className={inputClass}
          />
        </label>
        <label className="text-sm font-semibold text-white/70">
          Work email
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            maxLength={254}
            value={form.email}
            onChange={(event) => update('email', event.target.value)}
            className={inputClass}
          />
        </label>
        <label className="text-sm font-semibold text-white/70">
          Phone <span className="font-normal text-white/35">(optional)</span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            maxLength={40}
            value={form.phone}
            onChange={(event) => update('phone', event.target.value)}
            className={inputClass}
          />
        </label>
        <label className="text-sm font-semibold text-white/70">
          Company or brand
          <input
            required
            name="company"
            autoComplete="organization"
            maxLength={160}
            value={form.company}
            onChange={(event) => update('company', event.target.value)}
            className={inputClass}
          />
        </label>
        <label className="text-sm font-semibold text-white/70">
          Website <span className="font-normal text-white/35">(optional)</span>
          <input
            type="url"
            name="websiteUrl"
            autoComplete="url"
            maxLength={500}
            placeholder="https://"
            value={form.websiteUrl}
            onChange={(event) => update('websiteUrl', event.target.value)}
            className={inputClass}
          />
        </label>
      </div>

      <label className="mt-5 block text-sm font-semibold text-white/70">
        What would you most like OneApp to improve?
        <textarea
          required
          name="message"
          rows={4}
          maxLength={3000}
          value={form.message}
          onChange={(event) => update('message', event.target.value)}
          className={`${inputClass} resize-y`}
          placeholder="Tell us where growth, data, or execution is getting stuck."
        />
      </label>

      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="group flex min-w-56 items-center justify-center gap-3 rounded-full bg-white px-7 py-4 font-bold text-black transition hover:bg-[#d7ff7b] disabled:cursor-wait disabled:opacity-60"
        >
          {status === 'submitting' ? (
            <><LoaderCircle className="h-5 w-5 animate-spin" /> Sending request</>
          ) : (
            <>Request a platform demo <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" /></>
          )}
        </button>
        <p className="max-w-sm text-xs leading-relaxed text-white/35">
          Your details go directly to the OneApp team. No list rental or automated sales blast.
        </p>
      </div>

      <p className="mt-4 min-h-6 text-sm text-[#ff9cae]" role="alert" aria-live="polite">
        {error ? <>{error} <a className="font-semibold underline" href="mailto:info@oneapp.today">Email us</a>.</> : null}
      </p>
    </form>
  );
}
