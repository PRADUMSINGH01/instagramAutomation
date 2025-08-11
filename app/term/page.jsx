import React from "react";
import { ShieldCheck, FileText, Globe } from "lucide-react";

// Main App Component for displaying the Terms and Conditions
export default function App() {
  return (
    <div className="bg-gray-900 min-h-screen font-sans text-gray-300">
      <TermsAndConditions />
    </div>
  );
}

// Terms and Conditions Component for Zapchat.world
function TermsAndConditions() {
  return (
    <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-2xl my-10">
      <div className="p-8 md:p-12">
        <header className="text-center mb-10 border-b border-gray-700 pb-6">
          <FileText className="w-16 h-16 mx-auto text-purple-400 mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
            Terms and Conditions
          </h1>
          <p className="text-md text-gray-400">Last Updated: August 7, 2025</p>
          <p className="text-md text-gray-400">
            Please read these terms carefully before using our service.
          </p>
        </header>

        <main className="space-y-8">
          {/* Section 1: Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-100 mb-3 flex items-center">
              <ShieldCheck className="w-6 h-6 mr-3 text-purple-400" /> 1.
              Acceptance of Terms
            </h2>
            <p className="text-gray-400 leading-relaxed">
              By accessing or using Zapchat.world (the "Service"), you agree to
              be bound by these Terms and Conditions ("Terms"). If you disagree
              with any part of the terms, then you may not access the Service.
              This agreement applies to all visitors, users, and others who wish
              to access or use the Service worldwide.
            </p>
          </section>

          {/* Section 2: Description of Service */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-100 mb-3">
              2. Description of Service
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Zapchat.world provides Instagram automation tools designed to help
              manage and grow your Instagram presence. The services include, but
              are not limited to, automated liking, following, unfollowing, and
              other engagement activities. You acknowledge that Zapchat.world is
              a third-party service and is not affiliated with, endorsed, or
              certified by Instagram or its parent company, Meta Platforms, Inc.
            </p>
          </section>

          {/* Section 3: User Responsibilities */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-100 mb-3">
              3. User Responsibilities & Compliance
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              You are solely responsible for your conduct and any data, text,
              information, and content you submit, post, and display on the
              Service. You agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400 pl-4">
              <li>
                Provide accurate and complete information when creating your
                account.
              </li>
              <li>
                Maintain the security of your account password and accept all
                risks of unauthorized access.
              </li>
              <li>
                Comply with all applicable laws, rules, and regulations,
                including but not limited to copyright and data privacy laws.
              </li>
              <li>
                <span className="font-bold text-pink-400">
                  Crucially, you must comply with Instagram's Terms of Use.
                </span>{" "}
                Using automation tools can be against Instagram's policies. You
                acknowledge and accept the risk of your Instagram account being
                restricted, suspended, or terminated. Zapchat.world is not
                responsible for any action taken against your account by
                Instagram.
              </li>
            </ul>
          </section>

          {/* Section 4: Prohibited Activities */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-100 mb-3">
              4. Prohibited Activities
            </h2>
            <p className="text-gray-400 leading-relaxed">
              You are prohibited from using the Service to engage in any
              activity that is illegal, harmful, or violates the rights of
              others. This includes spamming, harassment, distributing malicious
              software, or infringing on intellectual property rights. We
              reserve the right to terminate accounts engaging in such
              activities.
            </p>
          </section>

          {/* Section 5: Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-100 mb-3">
              5. Limitation of Liability
            </h2>
            <p className="text-gray-400 leading-relaxed">
              To the maximum extent permitted by applicable law, in no event
              shall Zapchat.world, its directors, employees, or partners be
              liable for any indirect, incidental, special, consequential or
              punitive damages, including without limitation, loss of profits,
              data, use, goodwill, or other intangible losses, resulting from
              your access to or use of or inability to access or use the Service
              or any action taken against your Instagram account.
            </p>
          </section>

          {/* Section 6: Governing Law */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-100 mb-3 flex items-center">
              <Globe className="w-6 h-6 mr-3 text-teal-400" /> 6. Governing Law
            </h2>
            <p className="text-gray-400 leading-relaxed">
              These Terms shall be governed and construed in accordance with the
              laws of the jurisdiction in which Zapchat.world operates, without
              regard to its conflict of law provisions. Our failure to enforce
              any right or provision of these Terms will not be considered a
              waiver of those rights.
            </p>
          </section>

          {/* Section 7: Changes to Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-100 mb-3">
              7. Changes to Terms
            </h2>
            <p className="text-gray-400 leading-relaxed">
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. If a revision is material, we will
              provide at least 30 days' notice prior to any new terms taking
              effect. What constitutes a material change will be determined at
              our sole discretion.
            </p>
          </section>

          {/* Section 8: Contact Us */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-100 mb-3">
              8. Contact Us
            </h2>
            <p className="text-gray-400 leading-relaxed">
              If you have any questions about these Terms, please contact us at{" "}
              <a
                href="mailto:support@zapchat.world"
                className="text-purple-400 hover:underline"
              >
                support@zapchat.world
              </a>
              .
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
