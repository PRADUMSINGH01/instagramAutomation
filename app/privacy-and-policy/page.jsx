import React from "react";

/**
 * PrivacyPolicy.jsx
 * React component (single-file) for the Privacy Policy page of zapchat.world
 * - Tailwind CSS classes used for styling.
 * - Exported as default for direct use in a Next.js / React app.
 *
 * Replace [Effective Date] with an actual date before publishing.
 */

export default function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 prose prose-slate dark:prose-invert">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Effective Date: <strong>[10-07-2025]</strong>
        </p>
        <p className="mt-4">
          This Privacy Policy explains how <strong>zapchat.world</strong> ("we",
          "us", or "our") collects, uses, and discloses information when you use
          our automation SaaS that integrates with the Meta (Facebook &
          Instagram) Graph API.
        </p>
      </header>

      <section>
        <h2>1. Information We Collect</h2>
        <ul>
          <li>
            <strong>Account Information:</strong> Information you provide when
            signing up such as name and email address.
          </li>
          <li>
            <strong>Authentication Data:</strong> Access tokens and metadata
            obtained when you authenticate via Facebook Login or Instagram (via
            Meta Graph API).
          </li>
          <li>
            <strong>Social Media Data:</strong> Instagram account ID, username,
            profile picture, posts, comments, messages, and insights — only when
            you explicitly grant access.
          </li>
          <li>
            <strong>Usage Data:</strong> Log files, device information, IP
            address, and analytics data to help operate and improve the service.
          </li>
        </ul>
      </section>

      <section>
        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>
            Authenticate and authorize your account using Facebook/Instagram.
          </li>
          <li>
            Provide automation features such as scheduling posts, replying to
            comments, and managing direct messages via the Meta Graph API.
          </li>
          <li>
            Improve, maintain and optimize our service and user experience.
          </li>
          <li>
            Monitor for abuse and comply with legal and platform requirements.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Legal Basis for Processing (if applicable)</h2>
        <p>
          If you are located in jurisdictions that require us to explain the
          legal basis for processing personal data (for example, the EU), we
          process your data on the following bases:
        </p>
        <ul>
          <li>
            <strong>Contract:</strong> To provide the service you requested
            (e.g., automation features) and perform our contract with you.
          </li>
          <li>
            <strong>Consent:</strong> Where you consent to specific processing
            (for example, granting access to your social media data).
          </li>
          <li>
            <strong>Legitimate interests:</strong> To operate, secure, and
            improve the platform (balanced against your rights).
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Sharing & Disclosure</h2>
        <p>
          We do not sell or rent your personal data. We may share information in
          the following circumstances:
        </p>
        <ul>
          <li>
            <strong>With Meta (Facebook/Instagram):</strong> When required to
            use the Graph API and to comply with platform policies.
          </li>
          <li>
            <strong>Service Providers:</strong> Trusted third-party vendors who
            assist us (hosting, analytics, email) under contract and with
            limited access.
          </li>
          <li>
            <strong>Legal Obligations:</strong> When required by law, court
            order, or to protect our rights or users.
          </li>
        </ul>
      </section>

      <section>
        <h2>5. Data Retention</h2>
        <p>
          We retain your data only as long as necessary to provide the service,
          comply with legal obligations, resolve disputes, and enforce our
          agreements.
        </p>
        <p>
          Access tokens obtained from Meta are stored securely and will be
          deleted if you disconnect your account or request deletion.
        </p>
      </section>

      <section>
        <h2>6. Your Choices & Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you.</li>
          <li>Request correction or deletion of your personal data.</li>
          <li>
            Revoke permissions by disconnecting your Facebook/Instagram account
            from <strong>zapchat.world</strong>.
          </li>
        </ul>
        <p>
          To exercise these rights, contact us at{" "}
          <a href="mailto:support@zapchat.world" className="text-blue-600">
            support@zapchat.world
          </a>
          .
        </p>
      </section>

      <section>
        <h2>7. Security</h2>
        <p>
          We implement industry-standard administrative, technical, and physical
          safeguards to protect personal data. While we strive to protect your
          data, no method of transmission or storage is 100% secure.
        </p>
      </section>

      <section>
        <h2>8. Third-Party Services & Links</h2>
        <p>
          Our service integrates with Meta’s Graph API. By using zapchat.world
          you also agree to Meta’s policies. We may use other third-party
          services (analytics, email, hosting). Please review their privacy
          practices for more information.
        </p>
      </section>

      <section>
        <h2>9. Children</h2>
        <p>
          Our service is not intended for children under the age of 13. We do
          not knowingly collect personal data from children under 13.
        </p>
      </section>

      <section>
        <h2>10. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy occasionally. We will post the
          revised policy on this page and update the &quot;Effective Date&quot;.
        </p>
      </section>

      <section>
        <h2>11. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or data practices,
          contact us at:
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:support@zapchat.world" className="text-blue-600">
            support@zapchat.world
          </a>
        </p>
        <p>
          <strong>Website:</strong>{" "}
          <a href="https://zapchat.world" className="text-blue-600">
            https://zapchat.world
          </a>
        </p>
      </section>

      <footer className="mt-12 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} zapchat.world. All rights reserved.</p>
      </footer>
    </main>
  );
}
