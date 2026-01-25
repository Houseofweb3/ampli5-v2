import React from "react";
import Container from "../../components/ui/container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Ampli5",
  description: "Privacy Policy for Ampli5 by HOW3 Pte Ltd.",
};

export default function PrivacyPolicyPage() {
  return (
    <Container className="py-12 sm:py-20">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            PRIVACY POLICY
          </h1>
          <p className="text-lg text-gray-600">Ampli5 by HOW3 Pte Ltd.</p>
          <p className="text-sm text-gray-500">Last updated: 25/01/2026</p>
        </div>

        <section className="space-y-4">
          <p className="leading-relaxed text-gray-700">
            HOW3 Pte Ltd (“Company”, “we”, “our”, or “us”) operates Ampli5 and
            related services (“Services”). This Privacy Policy describes how we
            collect, use, store, and disclose information in the ordinary course
            of providing our Services. By accessing or using Ampli5, you
            acknowledge and agree to the practices described below.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            1. Scope of This Policy
          </h2>
          <p className="leading-relaxed text-gray-700">This Privacy Policy applies to:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Visitors to our website</li>
            <li>Clients, partners, and users of Ampli5</li>
            <li>
              Communications conducted via email, forms, messaging platforms, or
              other business channels
            </li>
          </ul>
          <p className="leading-relaxed text-gray-700">
            This policy does not apply to third-party platforms, websites, or
            services linked from Ampli5.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            2. Information We Collect
          </h2>
          <p className="leading-relaxed text-gray-700">
            We may collect information that you voluntarily provide or that is
            generated through your use of the Services, including but not
            limited to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Contact details (name, email address, phone number)</li>
            <li>Business information (company name, role, project details)</li>
            <li>Billing and transactional information</li>
            <li>
              Communications, feedback, approvals, or instructions shared with
              us
            </li>
            <li>
              Technical and usage data such as IP address, device type, browser
              information, and access logs
            </li>
          </ul>
          <p className="leading-relaxed text-gray-700">
            We may also collect publicly available information relevant to the
            Services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            3. How We Use Information
          </h2>
          <p className="leading-relaxed text-gray-700">
            We may use collected information for any lawful business purpose,
            including but not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Providing, operating, and improving the Services</li>
            <li>Executing campaigns, deliverables, and related workflows</li>
            <li>
              Communicating with clients regarding services, updates, or
              operational matters
            </li>
            <li>
              Internal analytics, quality control, training, and record-keeping
            </li>
            <li>
              Compliance with legal, regulatory, accounting, or contractual
              obligations
            </li>
            <li>
              Protecting the Company’s legal rights, enforcing agreements, and
              resolving disputes
            </li>
          </ul>
          <p className="leading-relaxed text-gray-700">
            The Company retains discretion to use information where reasonably
            necessary for legitimate business interests.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            4. Disclosure of Information
          </h2>
          <p className="leading-relaxed text-gray-700">We may disclose information:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              To employees, contractors, affiliates, and service providers on a
              need-to-know basis
            </li>
            <li>
              To third-party platforms or partners involved in service delivery
            </li>
            <li>
              Where required by law, regulation, legal process, or government
              request
            </li>
            <li>
              To protect the rights, property, safety, or legal interests of the
              Company
            </li>
          </ul>
          <p className="leading-relaxed text-gray-700">
            We do not guarantee confidentiality of information shared on public
            or third-party platforms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            5. Data Retention
          </h2>
          <p className="leading-relaxed text-gray-700">
            We retain information for as long as the Company determines
            reasonably necessary for:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Business operations</li>
            <li>Legal, regulatory, or accounting compliance</li>
            <li>Dispute resolution and enforcement of agreements</li>
          </ul>
          <p className="leading-relaxed text-gray-700">
            The Company is under no obligation to delete data upon request where
            retention is required or justified by legitimate business purposes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            6. Data Security
          </h2>
          <p className="leading-relaxed text-gray-700">
            We apply commercially reasonable safeguards to protect information
            under our control. However, the Company does not warrant or
            guarantee absolute security of data. You acknowledge that data
            transmission over the internet carries inherent risks.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            7. International Processing
          </h2>
          <p className="leading-relaxed text-gray-700">
            Information may be processed, stored, or accessed in jurisdictions
            outside your country of residence. By using the Services, you
            consent to such cross-border processing and storage.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            8. Cookies and Analytics
          </h2>
          <p className="leading-relaxed text-gray-700">
            We use cookies, analytics tools, and similar technologies to operate
            and improve the Services. By continuing to use the website, you
            consent to the use of such technologies. You may disable cookies via
            browser settings, subject to functionality limitations.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            9. User Rights and Requests
          </h2>
          <p className="leading-relaxed text-gray-700">
            Any requests relating to access, correction, or deletion of personal
            data may be submitted to the Company. The Company reserves the right
            to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Decline requests where permitted by law</li>
            <li>Require identity verification</li>
            <li>Respond within reasonable timeframes at its discretion</li>
          </ul>
          <p className="leading-relaxed text-gray-700">
            Nothing in this policy creates an absolute right to deletion or
            restriction of data.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            10. Business Transfers
          </h2>
          <p className="leading-relaxed text-gray-700">
            In the event of a merger, acquisition, restructuring, or sale of
            assets, information may be transferred as part of the transaction
            without prior notice.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            11. No Responsibility for Third Parties
          </h2>
          <p className="leading-relaxed text-gray-700">
            The Company is not responsible for the privacy practices, content,
            or security of third-party platforms, services, or websites.
            Engagement with third parties is at your own risk.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            12. Changes to This Policy
          </h2>
          <p className="leading-relaxed text-gray-700">
            The Company may update this Privacy Policy at any time. Updates will
            be posted on this page with a revised “Last updated” date. Continued
            use of the Services constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">13. Contact</h2>
          <p className="leading-relaxed text-gray-700">
            For privacy-related inquiries, you may contact:
          </p>
          <div className="mt-4 p-4  rounded-lg inline-block">
            <p className="font-medium text-gray-900">
              finance@houseofweb3.com
            </p>
            <p className="text-gray-700 mt-1">HOW3 Pte Ltd, Singapore</p>
          </div>
        </section>
      </div>
    </Container>
  );
}
