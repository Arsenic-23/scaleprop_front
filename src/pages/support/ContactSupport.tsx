import React from "react";
import InfoPage from "../../components/InfoPage";

const ContactSupport: React.FC = () => {
  return (
    <InfoPage headerTitle="Contact Support" backLabel="Support">

      {/* Support Overview */}
      <section className="rounded-xl bg-ios-bg-secondary p-4 space-y-4">
        <h2 className="text-lg font-semibold text-ios-label">Need Assistance?</h2>
        <p className="text-sm text-ios-label-secondary">
          Our support team is available from <strong>10:00 AM to 10:00 PM</strong>.
          Responses usually take <strong>3–4 hours</strong> depending on the queue.
        </p>
        <p className="text-sm text-ios-label-secondary">
          Before contacting us, you may find an instant solution in the{" "}
          <strong>FAQs</strong> or the <strong>Knowledge Base</strong>.
        </p>
      </section>

      {/* Email Support */}
      <section className="rounded-xl bg-ios-bg-secondary p-4 space-y-4">
        <h2 className="text-lg font-semibold text-ios-label">Email Support</h2>
        <p className="text-sm text-ios-label-secondary">
          For account issues, payout questions, evaluation concerns, or technical glitches, 
          you can email us directly. We typically respond within a few hours during support hours.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => window.location.href = 'mailto:scalefund.contact@gmail.com'}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-ios-separator text-base font-semibold text-ios-label"
          >
            <span className="material-symbols-outlined">mail</span>
            scalefund.contact@gmail.com
          </button>

          <button
            onClick={() => window.location.href = 'mailto:scalefund.team@gmail.com'}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-ios-separator text-base font-semibold text-ios-label"
          >
            <span className="material-symbols-outlined">mail</span>
            scalefund.team@gmail.com
          </button>
        </div>
      </section>

      {/* Additional Help */}
      <section className="rounded-xl bg-ios-bg-secondary p-4 space-y-3 mb-4">
        <h2 className="text-lg font-semibold text-ios-label">Other Resources</h2>
        <p className="text-sm text-ios-label-secondary">
          You can explore these sections—often the answer you need is already available:
        </p>

        <div className="space-y-2">
          <div className="rounded-lg border border-ios-separator p-3">
            <p className="text-base text-ios-label font-medium">FAQs</p>
            <p className="text-xs text-ios-label-secondary mt-1">
              Quick answers to the most common questions.
            </p>
          </div>

          <div className="rounded-lg border border-ios-separator p-3">
            <p className="text-base text-ios-label font-medium">Knowledge Base</p>
            <p className="text-xs text-ios-label-secondary mt-1">
              In-depth guides on evaluations, crypto payments, cTrader accounts, and platform usage.
            </p>
          </div>

          <div className="rounded-lg border border-ios-separator p-3">
            <p className="text-base text-ios-label font-medium">Community Forum</p>
            <p className="text-xs text-ios-label-secondary mt-1">
              Learn from other traders, see common issues, and share your experiences.
            </p>
          </div>
        </div>

        <p className="text-xs text-ios-label-secondary pt-1">
          If your issue requires account-specific review, email is the fastest and safest way to reach us.
        </p>
      </section>

    </InfoPage>
  );
};

export default ContactSupport;
