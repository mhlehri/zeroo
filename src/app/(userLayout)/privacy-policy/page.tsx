export default function PrivacyPolicy() {
  return (
    <div className="px-6 py-12 md:px-16 lg:px-32">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-primary-800 mb-6 text-center text-3xl font-bold text-balance md:text-4xl">
          Privacy Policy
        </h1>
        <p className="text-primary-600 mb-8 text-center text-lg leading-relaxed">
          At Rongberong, your privacy is our top priority. This Privacy Policy
          explains how we collect, use, and protect your personal information
          when you interact with our e-commerce platform.
        </p>

        <section className="mb-10">
          <h2 className="text-primary-800 mb-4 text-2xl font-semibold">
            1. Information We Collect
          </h2>
          <ul className="text-primary-700 list-inside list-disc space-y-2">
            <li>
              <span className="font-semibold">Personal Information:</span> When
              you create an account, place an order, or contact us, we may
              collect your name, email address, phone number, shipping address,
              and payment details.
            </li>
            <li>
              <span className="font-semibold">Device Information:</span> We may
              collect details about your device, including your IP address,
              browser type, and operating system, for analytics and security
              purposes.
            </li>
            <li>
              <span className="font-semibold">Cookies:</span> We use cookies to
              enhance your shopping experience and analyze site traffic.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-primary-800 mb-4 text-2xl font-semibold">
            2. How We Use Your Information
          </h2>
          <ul className="text-primary-700 list-inside list-disc space-y-2">
            <li>To process and fulfill your orders efficiently.</li>
            <li>To provide customer support and respond to your inquiries.</li>
            <li>
              To improve our website and personalize your shopping experience.
            </li>
            <li>
              To send you updates, promotions, and important notifications.
            </li>
            <li>To comply with legal obligations and ensure security.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-primary-800 mb-4 text-2xl font-semibold">
            3. How We Protect Your Information
          </h2>
          <p className="text-primary-700 leading-relaxed">
            We implement a variety of security measures, including encryption
            and secure servers, to protect your personal information from
            unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-primary-800 mb-4 text-2xl font-semibold">
            4. Sharing Your Information
          </h2>
          <p className="text-primary-700 leading-relaxed">
            We do not sell or rent your personal information to third parties.
            However, we may share your data with trusted service providers who
            assist us in operating our platform, as well as in cases where
            disclosure is required by law.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-primary-800 mb-4 text-2xl font-semibold">
            5. Your Rights
          </h2>
          <p className="text-primary-700 leading-relaxed">
            You have the right to access, correct, or delete your personal
            information. You may also opt-out of receiving promotional emails by
            following the unsubscribe instructions provided in those emails.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-primary-800 mb-4 text-2xl font-semibold">
            6. Changes to This Policy
          </h2>
          <p className="text-primary-700 leading-relaxed">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. Any updates will be posted on this page.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-primary-800 mb-4 text-2xl font-semibold">
            7. Contact Us
          </h2>
          <p className="text-primary-700 leading-relaxed">
            If you have any questions or concerns about this Privacy Policy,
            please contact us at:
          </p>
          <ul className="text-primary-700 mt-4 list-none">
            <li>
              Email:{" "}
              <a
                href="mailto:support@Rongberong.com"
                className="text-blue-600 underline"
              >
                support@Rongberong.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href="tel:+1234567890" className="text-blue-600 underline">
                +1 234 567 890
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
