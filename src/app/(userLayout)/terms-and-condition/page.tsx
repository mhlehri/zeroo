export default function TermsAndConditions() {
  return (
    <div className="px-6 py-12 md:px-16 lg:px-32">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-primary-800 mb-6 text-center text-3xl font-bold text-balance md:text-4xl">
          Terms and Conditions
        </h1>
        <p className="text-primary-600 mb-8 text-center text-lg leading-relaxed">
          Welcome to Rongberong! These terms and conditions outline the rules
          and regulations for the use of our e-commerce platform.
        </p>

        <section className="mb-10">
          <h2 className="text-primary-800 mb-4 text-2xl font-semibold">
            1. Acceptance of Terms
          </h2>
          <p className="text-primary-700 leading-relaxed">
            By accessing or using Rongberong, you agree to be bound by these
            terms and conditions. If you do not agree with any part of these
            terms, you must not use our platform.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-primary-800 mb-4 text-2xl font-semibold">
            2. Account Responsibilities
          </h2>
          <ul className="text-primary-700 list-inside list-disc space-y-2">
            <li>
              You are responsible for maintaining the confidentiality of your
              account and password.
            </li>
            <li>
              You agree to provide accurate and complete information during
              account registration.
            </li>
            <li>
              Any activities conducted under your account are your
              responsibility.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-primary-800 mb-4 text-2xl font-semibold">
            3. Prohibited Activities
          </h2>
          <ul className="text-primary-700 list-inside list-disc space-y-2">
            <li>Engaging in fraudulent or unlawful activities.</li>
            <li>
              Disrupting or interfering with the platform&apos;s functionality.
            </li>
            <li>Using our platform to distribute harmful software or spam.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-primary-800 mb-4 text-2xl font-semibold">
            4. Intellectual Property
          </h2>
          <p className="text-primary-700 leading-relaxed">
            All content on Rongberong, including logos, text, images, and
            designs, is the intellectual property of Rongberong and protected by
            copyright laws. Unauthorized use is strictly prohibited.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-primary-800 mb-4 text-2xl font-semibold">
            5. Limitation of Liability
          </h2>
          <p className="text-primary-700 leading-relaxed">
            Rongberong will not be liable for any direct, indirect, incidental,
            or consequential damages arising from your use of the platform.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-primary-800 mb-4 text-2xl font-semibold">
            6. Termination
          </h2>
          <p className="text-primary-700 leading-relaxed">
            We reserve the right to terminate or suspend your access to
            Rongberong at any time, without notice, for any violation of these
            terms.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-primary-800 mb-4 text-2xl font-semibold">
            7. Changes to Terms
          </h2>
          <p className="text-primary-700 leading-relaxed">
            We may revise these terms and conditions from time to time. Any
            updates will be posted on this page, and your continued use of the
            platform signifies your acceptance of the revised terms.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-primary-800 mb-4 text-2xl font-semibold">
            8. Contact Us
          </h2>
          <p className="text-primary-700 leading-relaxed">
            If you have any questions or concerns about these terms, please
            contact us at:
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
