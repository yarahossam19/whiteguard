import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | WHITEGUARD",
  description:
    "WHITEGUARD Terms of Service - Read our terms and conditions for using our security services and platform.",
};

export default function TermsOfServicePage() {
  return (
    <div className="container py-16">
    <article className="mx-auto max-w-3xl">
      <header className="mb-12">
        <h1 className="font-jakarta text-[clamp(28px,4vw,40px)] font-extrabold leading-tight text-[#003859]">
          Terms of Service
        </h1>
        <p className="mt-3 font-jakarta text-base text-[#52697A]">
          Last updated: March 7, 2026
        </p>
      </header>

      <div className="space-y-10 font-jakarta text-[#52697A]">
        <section>
          <h2 className="mb-3 font-jakarta text-xl font-bold text-[#003859]">
            1. Agreement to Terms
          </h2>
          <p className="leading-relaxed">
            By accessing or using the WHITEGUARD website, platform, or any of
            our cybersecurity services (collectively, the &quot;Services&quot;),
            you agree to be bound by these Terms of Service. If you do not agree
            to these terms, please do not use our Services. These terms apply to
            all visitors, users, and customers of WHITEGUARD and WhiteHawk
            Security.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-jakarta text-xl font-bold text-[#003859]">
            2. Description of Services
          </h2>
          <p className="mb-4 leading-relaxed">
            WHITEGUARD provides intelligent security monitoring, offensive and
            defensive cybersecurity services, governance, risk, and compliance
            (GRC) solutions, security training, and related platform offerings.
            Our Services are designed to help organizations build, manage, and
            scale their cybersecurity programs.
          </p>
          <p className="leading-relaxed">
            The specific scope, deliverables, and terms of any engagement will be
            defined in separate service agreements, statements of work (SOW), or
            order forms executed between you and WHITEGUARD.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-jakarta text-xl font-bold text-[#003859]">
            3. Use of Services
          </h2>
          <p className="mb-4 leading-relaxed">
            You agree to use our Services only for lawful purposes and in
            accordance with these Terms. You shall not:
          </p>
          <ul className="list-inside list-disc space-y-2 pl-2 leading-relaxed">
            <li>
              Use the Services in any way that violates applicable laws or
              regulations
            </li>
            <li>
              Attempt to gain unauthorized access to our systems, networks, or
              other users&apos; accounts
            </li>
            <li>
              Use the Services to conduct or facilitate any malicious or illegal
              activity
            </li>
            <li>
              Reverse engineer, decompile, or disassemble any part of our
              platform or software
            </li>
            <li>
              Resell, sublicense, or redistribute our Services without prior
              written consent
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-jakarta text-xl font-bold text-[#003859]">
            4. Account and Access
          </h2>
          <p className="leading-relaxed">
            When you create an account or receive access credentials, you are
            responsible for maintaining the confidentiality of your login
            information and for all activities that occur under your account.
            You must notify us immediately of any unauthorized use or security
            breach. We reserve the right to suspend or terminate accounts that
            violate these Terms or pose a security risk.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-jakarta text-xl font-bold text-[#003859]">
            5. Intellectual Property
          </h2>
          <p className="leading-relaxed">
            All content, software, methodologies, tools, reports, and materials
            provided by WHITEGUARD remain our exclusive property or that of our
            licensors. You receive a limited, non-exclusive license to use our
            Services for your internal business purposes during the term of your
            engagement. Nothing in these Terms grants you ownership of our
            intellectual property.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-jakarta text-xl font-bold text-[#003859]">
            6. Confidentiality and Data
          </h2>
          <p className="leading-relaxed">
            Both parties agree to maintain the confidentiality of any proprietary
            or sensitive information exchanged in connection with the Services.
            Our collection, use, and protection of personal data are described in
            our{" "}
            <a
              href="/privacy-policy"
              className="font-medium text-[#0087D7] underline hover:text-[#006DAD]"
            >
              Privacy Policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-jakarta text-xl font-bold text-[#003859]">
            7. Limitation of Liability
          </h2>
          <p className="leading-relaxed">
            To the maximum extent permitted by law, WHITEGUARD and WhiteHawk
            Security shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages arising from your use of the
            Services. Our total liability for any claims related to these Terms
            or the Services shall not exceed the fees paid by you for the
            relevant Services in the twelve (12) months preceding the claim.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-jakarta text-xl font-bold text-[#003859]">
            8. Indemnification
          </h2>
          <p className="leading-relaxed">
            You agree to indemnify and hold harmless WHITEGUARD, WhiteHawk
            Security, and our affiliates, officers, and employees from any
            claims, damages, or expenses arising from your misuse of the Services,
            violation of these Terms, or infringement of any third-party rights.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-jakarta text-xl font-bold text-[#003859]">
            9. Modifications
          </h2>
          <p className="leading-relaxed">
            We may update these Terms from time to time. We will notify you of
            material changes by posting the updated Terms on this page and
            updating the &quot;Last updated&quot; date. Your continued use of
            the Services after such changes constitutes acceptance of the revised
            Terms. For significant changes, we may provide additional notice by
            email or through our platform.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-jakarta text-xl font-bold text-[#003859]">
            10. Termination
          </h2>
          <p className="leading-relaxed">
            We may suspend or terminate your access to the Services at any time
            for violation of these Terms, non-payment, or for any other reason at
            our discretion. Upon termination, your right to use the Services
            ceases immediately. Provisions that by their nature should survive
            termination (including intellectual property, confidentiality,
            limitation of liability, and indemnification) shall survive.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-jakarta text-xl font-bold text-[#003859]">
            11. Governing Law
          </h2>
          <p className="leading-relaxed">
            These Terms shall be governed by and construed in accordance with
            the laws of the jurisdiction in which WHITEGUARD operates, without
            regard to conflict of law principles. Any disputes arising from
            these Terms or the Services shall be resolved in the courts of that
            jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-jakarta text-xl font-bold text-[#003859]">
            12. Contact Us
          </h2>
          <p className="leading-relaxed">
            If you have questions about these Terms of Service, please contact
            us at{" "}
            <a
              href="/contact"
              className="font-medium text-[#0087D7] underline hover:text-[#006DAD]"
            >
              our contact page
            </a>
            .
          </p>
        </section>
      </div>
    </article>
    </div>
  );
}
