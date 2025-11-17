import React from "react";
import InfoPage from "../../components/InfoPage";

const ContactSupport: React.FC = () => {
  return (
    <InfoPage headerTitle="Contact Support" backLabel="Support">

      <section className="rounded-xl bg-ios-bg-secondary p-4 space-y-4">
        <h2 className="text-lg font-semibold text-ios-label">We’re here to help</h2>
        <p className="text-sm text-ios-label-secondary">Our team responds within minutes.</p>

        <div className="flex flex-col gap-3">
          <button className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-ios-blue text-base font-semibold text-white">
            <span className="material-symbols-outlined">chat</span>
            Start Live Chat
          </button>

          <button className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-ios-separator text-base font-semibold text-ios-label">
            <span className="material-symbols-outlined">mail</span>
            Email Support
          </button>
        </div>
      </section>

    </InfoPage>
  );
};

export default ContactSupport;
