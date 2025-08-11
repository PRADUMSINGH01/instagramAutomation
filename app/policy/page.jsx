import React from "react";
import { ShieldAlert, DatabaseZap, UserCheck, Mail } from "lucide-react";

// Main App Component for displaying the Privacy Policy
export default function App() {
  return (
    <div className="bg-gray-900 min-h-screen font-sans text-gray-300">
      <PrivacyPolicy />
    </div>
  );
}

// Privacy Policy Component for Zapchat.world
function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-2xl my-10">
      <div className="p-8 md:p-12">
        <header className="text-center mb-10 border-b border-gray-700 pb-6">
          <ShieldAlert className="w-16 h-16 mx-auto text-purple-400 mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
            Privacy Policy
          </h1>
          <p className="text-md text-gray-400">Last Updated: August 7, 2025</p>
          <p className="text-md text-gray-400">
            Your privacy is critically important to us.
          </p>
        </header>

        <main className="space-y-8">
          {/* Section 1: Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-100 mb-3">
              1. Introduction
            </h2>
            <p className="text-gray-400 leading-relaxed">
              This Privacy Policy explains how Zapchat.world ("we," "us," or
              "our") handles information in connection with your use of our
              Instagram automation services (the "Service"). Our core principle
              is to collect only what is necessary to provide our service while
              prioritizing your security and privacy.
            </p>
          </section>

          {/* Section 2: Information We Do NOT Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-100 mb-3 flex items-center">
              <DatabaseZap className="w-6 h-6 mr-3 text-pink-400" /> 2.
              Information We Do NOT Collect
            </h2>
            <p className="text-gray-400 leading-relaxed font-semibold">
              We want to be crystal clear about what we don't do:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400 pl-4 mt-2">
              <li>
                <span className="font-bold text-pink-400">
                  We NEVER ask for, see, or store your Instagram password.
                </span>{" "}
                Our service utilizes secure, official authentication methods
                that do not expose your password to us.
              </li>
              <li>
                We do not store your personal messages, photos, or content from
                your Instagram account on our servers.
              </li>
            </ul>
          </section>

          {/* Section 3: Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-100 mb-3">
              3. Information We Collect
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              To provide the Service, we may collect the following information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400 pl-4">
              <li>
                <b>Account Information:</b> When you register, we collect basic
                information like your name and email address for billing and
                communication purposes.
              </li>
              <li>
                <b>Configuration Data:</b> We store the settings you configure
                for the automation service, such as target hashtags, accounts,
                or locations. This is necessary for the service to function as
                you direct.
              </li>
              <li>
                <b>Usage Data:</b> We may collect non-personally identifiable
                information about how you interact with our Service to help us
                improve its functionality and user experience.
              </li>
            </ul>
          </section>

          {/* Section 4: How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-100 mb-3">
              4. How We Use Your Information
            </h2>
            <p className="text-gray-400 leading-relaxed">
              The information we collect is used exclusively to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400 pl-4 mt-2">
              <li>Provide, operate, and maintain our Service.</li>
              <li>Process your subscription payments securely.</li>
              <li>
                Communicate with you, including for customer support and
                service-related updates.
              </li>
              <li>
                Monitor and analyze usage to improve and enhance the safety and
                security of our Service.
              </li>
            </ul>
          </section>

          {/* Section 5: Data Security */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-100 mb-3 flex items-center">
              <UserCheck className="w-6 h-6 mr-3 text-teal-400" /> 5. Data
              Security
            </h2>
            <p className="text-gray-400 leading-relaxed">
              We are committed to protecting your information. We use
              industry-standard security measures, including encryption and
              secure protocols, to protect the data you entrust to us. However,
              no method of transmission over the Internet or electronic storage
              is 100% secure, but we strive to use commercially acceptable means
              to protect your information.
            </p>
          </section>

          {/* Section 6: Changes to This Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-100 mb-3">
              6. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-400 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Last Updated" date. You are advised to review
              this Privacy Policy periodically for any changes.
            </p>
          </section>

          {/* Section 7: Contact Us */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-100 mb-3 flex items-center">
              <Mail className="w-6 h-6 mr-3 text-purple-400" /> 7. Contact Us
            </h2>
            <p className="text-gray-400 leading-relaxed">
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <a
                href="mailto:privacy@zapchat.world"
                className="text-purple-400 hover:underline"
              >
                privacy@zapchat.world
              </a>
              .
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
