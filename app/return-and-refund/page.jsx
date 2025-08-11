import React from "react";
import { RefreshCcw, CalendarOff, HelpCircle } from "lucide-react";

// Main App Component for displaying the policy
export default function App() {
  return (
    <div className="bg-gray-900 min-h-screen font-sans text-gray-300">
      <ReturnAndRefundPolicy />
    </div>
  );
}

// Return & Refund Policy Component for Zapchat.world
function ReturnAndRefundPolicy() {
  return (
    <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-2xl my-10">
      <div className="p-8 md:p-12">
        <header className="text-center mb-10 border-b border-gray-700 pb-6">
          <RefreshCcw className="w-16 h-16 mx-auto text-purple-400 mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
            Return & Refund Policy
          </h1>
          <p className="text-md text-gray-400">Last Updated: August 7, 2025</p>
          <p className="text-md text-gray-400">
            We believe in a straightforward and fair policy.
          </p>
        </header>

        <main className="space-y-8">
          {/* Section 1: Subscription Cancellation */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-100 mb-3 flex items-center">
              <CalendarOff className="w-6 h-6 mr-3 text-pink-400" /> 1. Your
              Right to Cancel
            </h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              You can cancel your Zapchat.world subscription{" "}
              <span className="font-bold text-pink-400">at any time</span>, for
              any reason.
            </p>
            <p className="text-gray-400 leading-relaxed mt-2">
              Upon cancellation, your access to the Service will continue until
              the end of your current billing period. After that, your
              subscription will not be renewed, and you will not be charged
              again.
            </p>
          </section>

          {/* Section 2: Refund Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-100 mb-3">
              2. Our Refund Policy
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Due to the nature of our digital service, we generally do not
              offer refunds for partial subscription periods or for time unused
              on a subscription. When you cancel, you are cancelling the next
              billing charge, not the current one.
            </p>
            <p className="text-gray-400 leading-relaxed mt-2">
              For example, if you are on a monthly plan and you cancel halfway
              through the month, you will retain access for the remainder of
              that month, and no refund will be issued for the unused portion.
            </p>
            <p className="text-gray-400 leading-relaxed mt-2">
              Exceptions may be considered on a case-by-case basis under special
              circumstances, at the sole discretion of Zapchat.world.
            </p>
          </section>

          {/* Section 3: How to Cancel */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-100 mb-3">
              3. How to Cancel Your Subscription
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Cancelling is simple. You can cancel your subscription directly
              from your account dashboard:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-400 pl-4">
              <li>Log in to your Zapchat.world account.</li>
              <li>Navigate to the 'Billing' or 'Subscription' section.</li>
              <li>Click the 'Cancel Subscription' button.</li>
              <li>Follow the on-screen prompts to confirm the cancellation.</li>
            </ol>
          </section>

          {/* Section 4: Questions */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-100 mb-3 flex items-center">
              <HelpCircle className="w-6 h-6 mr-3 text-purple-400" /> 4.
              Questions?
            </h2>
            <p className="text-gray-400 leading-relaxed">
              If you have any questions about our Return & Refund Policy, or if
              you believe your situation warrants an exception, please do not
              hesitate to contact our support team at{" "}
              <a
                href="mailto:support@zapchat.world"
                className="text-purple-400 hover:underline"
              >
                support@zapchat.world
              </a>
              . We're here to help.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
