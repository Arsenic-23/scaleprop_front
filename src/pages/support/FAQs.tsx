import React from "react";
import InfoPage from "../../components/InfoPage";

const FAQs: React.FC = () => {
  return (
    <InfoPage headerTitle="FAQs" backLabel="Support">

      <section className="flex flex-col gap-2 rounded-xl bg-ios-bg-secondary">

        <details className="group">
          <summary className="flex cursor-pointer items-center justify-between border-b border-ios-separator p-4">
            <span className="text-base text-ios-label">How do I open an account?</span>
            <span className="material-symbols-outlined text-ios-label-secondary">expand_more</span>
          </summary>
          <div className="p-4 pt-2 text-sm text-ios-label-secondary">
            Opening an account is simple. Download the app → Sign Up → Verify identity.
          </div>
        </details>

        <details className="group">
          <summary className="flex cursor-pointer items-center justify-between border-b border-ios-separator p-4">
            <span className="text-base text-ios-label">Is my money safe?</span>
            <span className="material-symbols-outlined text-ios-label-secondary">expand_more</span>
          </summary>
          <div className="p-4 pt-2 text-sm text-ios-label-secondary">
            Your funds are protected with bank-level encryption and insured systems.
          </div>
        </details>

      </section>

    </InfoPage>
  );
};

export default FAQs;
