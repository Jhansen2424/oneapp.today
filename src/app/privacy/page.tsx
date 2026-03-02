import { type Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'OneApp Privacy Policy - How we collect, use, and protect your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="py-6 px-4 sm:px-6 md:px-8 border-b border-white/5">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="transition-opacity hover:opacity-80">
            <Image
              src="/oneapp-logo.png"
              alt="OneApp Logo"
              width={200}
              height={50}
              className="h-8 sm:h-10 w-auto"
            />
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base mb-12">
            Last Updated: February 2026
          </p>

          <div className="prose prose-invert prose-neutral max-w-none space-y-10 text-neutral-300 text-sm sm:text-base leading-relaxed">
            <p>
              This Privacy Policy describes how OneApp (&ldquo;OneApp,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and shares your personal information when you use our services.
            </p>

            {/* Section 1 */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>

              <h3 className="text-lg font-medium text-white mb-2">Information You Provide:</h3>
              <ul className="list-disc list-inside space-y-1 mb-4">
                <li>Account information (name, email, phone number)</li>
                <li>Company details (business name, address, industry)</li>
                <li>Payment information (processed securely through Stripe)</li>
                <li>Content you upload or create within the platform</li>
                <li>Communications with our support team</li>
              </ul>

              <h3 className="text-lg font-medium text-white mb-2">Information Collected Automatically:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Device information (browser type, operating system)</li>
                <li>Usage data (features accessed, actions taken)</li>
                <li>IP addresses and location data</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
              <p className="mb-2">We use your information to:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send billing communications</li>
                <li>Send service-related notifications and updates</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Analyze usage patterns to enhance user experience</li>
                <li>Detect and prevent fraud or security threats</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">3. Data Storage and Security</h2>
              <p className="mb-4">
                Your data is stored securely using industry-standard encryption (AES-256 at rest, TLS 1.3 in transit). We implement appropriate technical and organizational measures to protect your personal information, including:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Regular security assessments and penetration testing</li>
                <li>Access controls and authentication requirements</li>
                <li>Employee training on data protection</li>
                <li>Incident response procedures</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">4. Data Sharing</h2>
              <p className="font-semibold text-white mb-4">We do not sell your personal information.</p>
              <p className="mb-2">We may share data with:</p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><span className="font-medium text-white">Service Providers:</span> Third parties who assist in operating our platform (cloud hosting, payment processing, email delivery)</li>
                <li><span className="font-medium text-white">Business Transfers:</span> In connection with a merger, acquisition, or sale of assets</li>
                <li><span className="font-medium text-white">Legal Requirements:</span> When required by law, court order, or government request</li>
                <li><span className="font-medium text-white">With Your Consent:</span> When you explicitly authorize sharing</li>
              </ul>

              <h3 className="text-lg font-medium text-white mb-2">Third-Party Services We Use:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Stripe (payment processing)</li>
                <li>Microsoft Azure (cloud infrastructure)</li>
                <li>SendGrid (email delivery)</li>
                <li>Analytics providers</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">5. Your Rights</h2>
              <p className="mb-2">Depending on your location, you may have the right to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><span className="font-medium text-white">Access:</span> Request a copy of your personal data</li>
                <li><span className="font-medium text-white">Correction:</span> Request correction of inaccurate data</li>
                <li><span className="font-medium text-white">Deletion:</span> Request deletion of your personal data</li>
                <li><span className="font-medium text-white">Portability:</span> Receive your data in a portable format</li>
                <li><span className="font-medium text-white">Objection:</span> Object to certain processing activities</li>
                <li><span className="font-medium text-white">Restriction:</span> Request limitation of processing</li>
                <li><span className="font-medium text-white">Withdraw Consent:</span> Where processing is based on consent</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us at{' '}
                <a href="mailto:privacy@oneapp.today" className="text-blue-400 hover:text-blue-300 underline">privacy@oneapp.today</a>.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">6. GDPR Rights (European Users)</h2>
              <p className="mb-2">
                If you are located in the European Economic Area (EEA), you have additional rights under the General Data Protection Regulation (GDPR):
              </p>
              <ul className="list-disc list-inside space-y-1 mb-4">
                <li>Right to lodge a complaint with a supervisory authority</li>
                <li>Right to be informed about automated decision-making</li>
                <li>Right not to be subject to solely automated decisions with legal effects</li>
              </ul>
              <p>
                Our legal bases for processing include: contract performance, legitimate interests, consent, and legal compliance.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">7. CCPA Rights (California Residents)</h2>
              <p className="mb-2">
                California residents have specific rights under the California Consumer Privacy Act (CCPA):
              </p>
              <ul className="list-disc list-inside space-y-1 mb-4">
                <li>Right to know what personal information is collected</li>
                <li>Right to know whether personal information is sold or disclosed</li>
                <li>Right to say no to the sale of personal information</li>
                <li>Right to equal service and price (non-discrimination)</li>
              </ul>
              <p>We do not sell personal information as defined by the CCPA.</p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">8. Cookies and Tracking</h2>
              <p className="mb-4">We use cookies and similar technologies to:</p>
              <ul className="list-disc list-inside space-y-1 mb-4">
                <li>Maintain your session and preferences</li>
                <li>Analyze usage and improve performance</li>
                <li>Provide personalized experiences</li>
              </ul>

              <h3 className="text-lg font-medium text-white mb-2">Types of Cookies:</h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><span className="font-medium text-white">Essential:</span> Required for basic platform functionality</li>
                <li><span className="font-medium text-white">Analytics:</span> Help us understand how users interact with our service</li>
                <li><span className="font-medium text-white">Preferences:</span> Remember your settings and choices</li>
              </ul>
              <p>
                You can manage cookie preferences through your browser settings. Disabling certain cookies may limit platform functionality.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">9. Data Retention</h2>
              <p className="mb-2">
                We retain your information for as long as your account is active or as needed to provide services. After account closure:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Account data is retained for 30 days, then deleted</li>
                <li>Backup copies may be retained for up to 90 days</li>
                <li>Certain information may be retained longer as required by law (e.g., financial records)</li>
              </ul>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">10. International Data Transfers</h2>
              <p>
                If you are located outside the United States, your data may be transferred to and processed in the United States, where our servers are located. We ensure appropriate safeguards are in place for such transfers, including Standard Contractual Clauses where required.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">11. Marketing Communications</h2>
              <p className="mb-2">
                We may send you marketing communications about our services. You can opt out at any time by:
              </p>
              <ul className="list-disc list-inside space-y-1 mb-4">
                <li>Clicking &ldquo;unsubscribe&rdquo; in any marketing email</li>
                <li>Adjusting your notification preferences in account settings</li>
                <li>Contacting us at <a href="mailto:privacy@oneapp.today" className="text-blue-400 hover:text-blue-300 underline">privacy@oneapp.today</a></li>
              </ul>
              <p>
                Service-related communications (billing, security alerts) are not affected by marketing opt-outs.
              </p>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">12. Children&apos;s Privacy</h2>
              <p>
                Our services are not intended for children under 13 (or 16 in the EEA). We do not knowingly collect personal information from children. If we learn that we have collected information from a child, we will delete it promptly.
              </p>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">13. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Material changes will be communicated via email or platform notification at least 30 days before taking effect. The &ldquo;Last Updated&rdquo; date at the top reflects the most recent revision.
              </p>
            </section>

            {/* Section 14 */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">14. Contact Us</h2>
              <p className="mb-4">For privacy inquiries or to exercise your rights, contact us at:</p>
              <ul className="list-none space-y-2">
                <li><span className="font-medium text-white">Email:</span>{' '}
                  <a href="mailto:privacy@oneapp.today" className="text-blue-400 hover:text-blue-300 underline">privacy@oneapp.today</a>
                </li>
                <li><span className="font-medium text-white">Address:</span> OneApp, 7633 S Main St, Midvale, UT 84047</li>
                <li><span className="font-medium text-white">Data Protection Officer:</span>{' '}
                  <a href="mailto:dpo@oneapp.today" className="text-blue-400 hover:text-blue-300 underline">dpo@oneapp.today</a>
                </li>
              </ul>
              <p className="mt-4">
                For EU residents, you may also contact our EU representative at{' '}
                <a href="mailto:eu-representative@oneapp.today" className="text-blue-400 hover:text-blue-300 underline">eu-representative@oneapp.today</a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 md:px-8 border-t border-white/5 bg-black/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-8">
          <Link href="/" className="transition-opacity hover:opacity-80">
            <Image
              src="/oneapp-logo.png"
              alt="OneApp Logo"
              width={200}
              height={50}
              className="h-8 sm:h-10 md:h-12 w-auto"
            />
          </Link>
          <p className="text-neutral-500 text-xs sm:text-sm font-medium text-center">
            &copy; {new Date().getFullYear()} OneApp. Precision-engineered growth.
          </p>
        </div>
      </footer>
    </div>
  );
}
