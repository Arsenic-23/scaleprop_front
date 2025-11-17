import React from "react";
import InfoPage from "../../components/InfoPage";

const FAQs: React.FC = () => {
  return (
    <InfoPage headerTitle="FAQs" backLabel="Support">
      <section className="flex flex-col gap-2 rounded-xl bg-ios-bg-secondary">

        {/* Account Opening */}
        <details className="group">
          <summary className="flex cursor-pointer items-center justify-between border-b border-ios-separator p-4">
            <span className="text-base text-ios-label">How do I open an account?</span>
            <span className="material-symbols-outlined text-ios-label-secondary">expand_more</span>
          </summary>
          <div className="p-4 pt-2 text-sm text-ios-label-secondary">
            Creating an account with Scalefund is simple. Download the app, tap
            <strong> “Sign Up”</strong>, fill in your basic details, and complete the identity
            verification. Once verified, you can purchase your evaluation instantly.
          </div>
        </details>

        {/* Safety / Transparency */}
        <details className="group">
          <summary className="flex cursor-pointer items-center justify-between border-b border-ios-separator p-4">
            <span className="text-base text-ios-label">Is my money safe with Scalefund?</span>
            <span className="material-symbols-outlined text-ios-label-secondary">expand_more</span>
          </summary>
          <div className="p-4 pt-2 text-sm text-ios-label-secondary">
            Yes. Scalefund follows strict operational transparency across all services. All
            transactions, evaluations, and payouts are handled securely using verified channels.
            No hidden fees, no manipulation, and a fully transparent model.
          </div>
        </details>

        {/* Payout Frequency */}
        <details className="group">
          <summary className="flex cursor-pointer items-center justify-between border-b border-ios-separator p-4">
            <span className="text-base text-ios-label">How often are payouts processed?</span>
            <span className="material-symbols-outlined text-ios-label-secondary">expand_more</span>
          </summary>
          <div className="p-4 pt-2 text-sm text-ios-label-secondary">
            Payouts at Scalefund are processed <strong>every 14 days</strong>. Once approved, your
            payout will be sent manually by our team through crypto transfers.
          </div>
        </details>

        {/* Crypto Payments Only */}
        <details className="group">
          <summary className="flex cursor-pointer items-center justify-between border-b border-ios-separator p-4">
            <span className="text-base text-ios-label">What payment methods does Scalefund support?</span>
            <span className="material-symbols-outlined text-ios-label-secondary">expand_more</span>
          </summary>
          <div className="p-4 pt-2 text-sm text-ios-label-secondary">
            Scalefund supports <strong>only crypto transactions</strong> for all activities —
            purchasing evaluation accounts, receiving payouts, and other firm-related transactions.
            This ensures fast, secure, and global compatibility.
          </div>
        </details>

        {/* Exchanges Supported */}
        <details className="group">
          <summary className="flex cursor-pointer items-center justify-between border-b border-ios-separator p-4">
            <span className="text-base text-ios-label">Which crypto exchanges and coins are supported for payouts?</span>
            <span className="material-symbols-outlined text-ios-label-secondary">expand_more</span>
          </summary>
          <div className="p-4 pt-2 text-sm text-ios-label-secondary">
            You may receive payouts in commonly supported cryptocurrencies through major exchanges
            like Binance, Coinbase, Bybit, OKX, and others. Available coins include USDT (TRC20 /
            ERC20), USDC, and a few others depending on availability.
          </div>
        </details>

        {/* Manual Payout Handling */}
        <details className="group">
          <summary className="flex cursor-pointer items-center justify-between border-b border-ios-separator p-4">
            <span className="text-base text-ios-label">Are payouts sent automatically?</span>
            <span className="material-symbols-outlined text-ios-label-secondary">expand_more</span>
          </summary>
          <div className="p-4 pt-2 text-sm text-ios-label-secondary">
            No. All payouts are handled <strong>manually</strong> by the Scalefund team to ensure
            accuracy, full verification, and security for every trader.
          </div>
        </details>

        {/* Ban / Deactivation Issues */}
        <details className="group">
          <summary className="flex cursor-pointer items-center justify-between border-b border-ios-separator p-4">
            <span className="text-base text-ios-label">What if my account gets banned or deactivated?</span>
            <span className="material-symbols-outlined text-ios-label-secondary">expand_more</span>
          </summary>
          <div className="p-4 pt-2 text-sm text-ios-label-secondary">
            If your account faces restrictions, limits, or deactivation, contact
            <strong> Live Support</strong> immediately. Our team will review your case and provide a
            resolution based on firm rules and evaluation terms.
          </div>
        </details>

        {/* Support Hours */}
        <details className="group">
          <summary className="flex cursor-pointer items-center justify-between border-b border-ios-separator p-4">
            <span className="text-base text-ios-label">What are the Live Support hours?</span>
            <span className="material-symbols-outlined text-ios-label-secondary">expand_more</span>
          </summary>
          <div className="p-4 pt-2 text-sm text-ios-label-secondary">
            Live Support is available from <strong>10:00 AM to 10:00 PM</strong>. You can only
            access real-time chat during this window. Outside these hours, you may leave a message.
          </div>
        </details>

        {/* Support Response Time */}
        <details className="group">
          <summary className="flex cursor-pointer items-center justify-between border-b border-ios-separator p-4">
            <span className="text-base text-ios-label">How long does Live Support take to respond?</span>
            <span className="material-symbols-outlined text-ios-label-secondary">expand_more</span>
          </summary>
          <div className="p-4 pt-2 text-sm text-ios-label-secondary">
            Live Support replies typically take <strong>3–4 hours</strong> depending on queue and
            traffic. Please be patient — every case is reviewed carefully.
          </div>
        </details>

        {/* Evaluation Rules */}
        <details className="group">
          <summary className="flex cursor-pointer items-center justify-between p-4">
            <span className="text-base text-ios-label">Where can I learn more about evaluation rules?</span>
            <span className="material-symbols-outlined text-ios-label-secondary">expand_more</span>
          </summary>
          <div className="p-4 pt-2 text-sm text-ios-label-secondary">
            You can view all Scalefund challenge rules inside the <strong>Rules</strong> section of
            the app. This includes drawdown limits, targets, daily loss limits, and trading
            restrictions.
          </div>
        </details>
      </section>
    </InfoPage>
  );
};

export default FAQs;
