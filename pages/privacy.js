// pages/privacy.js

export default function PrivacyPolicy() {
  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Privacy Policy</h1>
      <p>Last updated: [Month Day, Year]</p>

      <p>
        This Privacy Policy describes how Retro Recommender ("we", "us", or
        "our") collects, uses, and protects your information when you use our
        website and AI services.
      </p>

      <h2>Information We Collect</h2>
      <ul>
        <li>
          <strong>Uploaded Images:</strong> When you use our AI tools, you may
          upload photos. These are processed securely by third-party services
          (e.g., Replicate) and not permanently stored on our servers.
        </li>
        <li>
          <strong>Basic Usage Data:</strong> We may collect information about
          how you use our site, such as IP address, browser type, and device
          info, to improve our services.
        </li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Provide and improve our AI tools.</li>
        <li>Respond to support requests.</li>
        <li>Monitor site usage and prevent abuse.</li>
      </ul>

      <h2>Third-Party Services</h2>
      <p>
        We may use third-party services (e.g., Replicate, Supabase) to process
        and store images or data. These services have their own privacy
        policies.
      </p>

      <h2>Security</h2>
      <p>
        We take reasonable measures to protect your information, but no method
        of transmission over the Internet is 100% secure.
      </p>

      <h2>Children's Privacy</h2>
      <p>
        Our services are not intended for children under 13. We do not knowingly
        collect personal data from children.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page with an updated date.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions, please contact us at [Your future support
        email here].
      </p>
    </main>
  );
}
