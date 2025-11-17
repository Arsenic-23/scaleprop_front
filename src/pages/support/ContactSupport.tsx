import React from "react";
import { useNavigate } from "react-router-dom";
import InfoPage from "../../components/InfoPage";

const ContactSupport: React.FC = () => {
  const navigate = useNavigate();

  return (
    <InfoPage headerTitle="Contact Support" backLabel="Support">

      {/* Support Overview */}
      <section className="rounded-xl bg-ios-bg-secondary p-4 space-y-4">
        <h2 className="text-lg font-semibold text-ios-label">Need Assistance?</h2>

        <p className="text-sm text-ios-label-secondary">
          Our support team is available from <strong>10:00 AM to 10:00 PM</strong>.
          Average response time: <strong>3–4 hours</strong>.
        </p>

        <p className="text-sm text-ios-label-secondary">
          Before reaching out, you may find quicker answers in our 
          <strong> FAQs</strong> or <strong>Knowledge Base</strong>.
        </p>
      </section>

      {/* Email Support */}
      <section className="rounded-xl bg-ios-bg-secondary p-4 space-y-4">
        <h2 className="text-lg font-semibold text-ios-label">Email Support</h2>

        <p className="text-sm text-ios-label-secondary">
          Contact us via email for payout issues, evaluation concerns, 
          account reviews, or technical problems. Our team will get back 
          to you as quickly as possible during support hours.
        </p>

        <div className="flex flex-col gap-3">

          {/* iOS style email button 1 */}
          <button
            onClick={() => window.location.href = "mailto:scalefund.contact@gmail.com"}
            className="flex h-12 w-full items-center justify-between rounded-lg bg-ios-bg 
                       border border-ios-separator px-4 text-ios-label active:bg-gray-800/40"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-ios-label">mail</span>
              <span className="font-medium text-sm">scalefund.contact@gmail.com</span>
            </div>
            <span className="material-symbols-outlined text-ios-label-secondary text-sm">north_east</span>
          </button>

          {/* iOS style email button 2 */}
          <button
            onClick={() => window.location.href = "mailto:scalefund.team@gmail.com"}
            className="flex h-12 w-full items-center justify-between rounded-lg bg-ios-bg 
                       border border-ios-separator px-4 text-ios-label active:bg-gray-800/40"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-ios-label">mail</span>
              <span className="font-medium text-sm">scalefund.team@gmail.com</span>
            </div>
            <span className="material-symbols-outlined text-ios-label-secondary text-sm">north_east</span>
          </button>

        </div>
      </section>

      {/* Resource Redirection */}
      <section className="rounded-xl bg-ios-bg-secondary p-4 space-y-4 mb-4">
        <h2 className="text-lg font-semibold text-ios-label">Other Resources</h2>

        <p className="text-sm text-ios-label-secondary">
          You can explore these sections for faster solutions — many issues 
          are already answered by the community or our detailed guides.
        </p>

        {/* Redirect Cards */}
        <div className="space-y-3">

          {/* FAQs */}
          <button
            onClick={() => navigate("/support/faqs")}
            className="w-full rounded-lg border border-ios-separator p-3 text-left 
                       active:bg-gray-800/40"
          >
            <p className="text-base text-ios-label font-medium">FAQs</p>
            <p className="text-xs text-ios-label-secondary mt-1">
              Quick answers to the most commonly asked questions.
            </p>
          </button>

          {/* Knowledge Base */}
          <button
            onClick={() => navigate("/support/knowledge")}
            className="w-full rounded-lg border border-ios-separator p-3 text-left 
                       active:bg-gray-800/40"
          >
            <p className="text-base text-ios-label font-medium">Knowledge Base</p>
            <p className="text-xs text-ios-label-secondary mt-1">
              Step-by-step guides on challenges, crypto payments, 
              cTrader accounts, and dashboard usage.
            </p>
          </button>

          {/* Community Forum */}
          <button
            onClick={() => navigate("/support/community")}
            className="w-full rounded-lg border border-ios-separator p-3 text-left 
                       active:bg-gray-800/40"
          >
            <p className="text-base text-ios-label font-medium">Community Forum</p>
            <p className="text-xs text-ios-label-secondary mt-1">
              Ask questions, share advice, and learn from fellow Scalefund traders.
            </p>
          </button>

        </div>

        <p className="text-xs text-ios-label-secondary pt-2">
          For account-specific concerns, email remains the most reliable way 
          to get direct support from our team.
        </p>
      </section>

    </InfoPage>
  );
};

export default ContactSupport;
