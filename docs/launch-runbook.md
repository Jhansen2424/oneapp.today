# OneApp.today launch runbook

The launch candidate is not production-ready until every item below is checked
against the exact PR head. `main` is the rollback source until production
verification is complete.

## Required OneApp lead form

Create separate staging and production lead forms under the OneApp platform
company (companyId 1). Use these exact field keys and mappings:

| Key | Mapping |
| --- | --- |
| `first_name` | First Name |
| `last_name` | Last Name |
| `email` | Email |
| `phone` | Phone |
| `company` | Company Name |
| `website` | Website |
| `message` | `metadata.message` |
| `client_submission_id` | `metadata.clientSubmissionId` |
| `utm_source` | `metadata.utmSource` |
| `utm_medium` | `metadata.utmMedium` |
| `utm_campaign` | `metadata.utmCampaign` |
| `utm_content` | `metadata.utmContent` |
| `utm_term` | `metadata.utmTerm` |
| `gclid` | `metadata.gclid` |
| `msclkid` | `metadata.msclkid` |
| `fbclid` | `metadata.fbclid` |
| `landing_page` | `metadata.landingPage` |
| `referrer` | `metadata.referrer` |

Required fields: first name, last name, email, company, and message. Configure
the production form URL as `ONEAPP_LEAD_FORM_URL` in Vercel Production and the
staging form URL in Preview. Never point preview builds at production.

## Tracking

Configure either `NEXT_PUBLIC_GTM_ID` or `NEXT_PUBLIC_GA_MEASUREMENT_ID` in
Vercel. Prefer GTM. The site records `form_start`, `generate_lead`, and
`form_error`; `generate_lead` fires only after OneApp confirms the lead.
UTM values and supported click IDs are stored for the browser session and sent
with the lead.

## Acceptance on the exact preview revision

- [ ] GitHub Launch checks pass.
- [ ] Vercel preview is bound to the reviewed commit SHA.
- [ ] Desktop and mobile navigation, screenshots, form, privacy page, robots,
      and sitemap render without console errors.
- [ ] Consent decline sends no GA/GTM requests; consent accept sends a page
      view.
- [ ] Invalid form input stays client-side; a simulated upstream failure shows
      the visitor-safe error and does not fire `generate_lead`.
- [ ] One real staging submission creates exactly one CRM lead and one opening
      Messages conversation with attribution and the submission id.
- [ ] Internal lead notification reaches the intended OneApp recipients.
- [ ] Links, keyboard focus, labels, color contrast, 404s, and responsive layout
      pass review.
- [ ] Security headers are present on the preview response.

## Production cutover and rollback

1. Record the current production commit and deployment URL as the rollback
   target.
2. Confirm Production uses the production lead form URL and the approved
   tracking identifier.
3. Merge only the reviewed PR head and verify Vercel deployed that SHA.
4. Submit one recognizable production test lead. Confirm CRM, Messages,
   notification delivery, and the analytics `generate_lead` event.
5. Verify canonical URLs resolve to `https://www.oneapp.today` and the apex
   redirects once without a loop.
6. If any critical check fails, immediately redeploy the recorded prior
   production commit, then verify the homepage and existing contact path.
