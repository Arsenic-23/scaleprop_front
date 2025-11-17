import React from "react";
import InfoPage from "../../components/InfoPage";

const KnowledgeBase: React.FC = () => {
  return (
    <InfoPage headerTitle="Knowledge Base" backLabel="Support">

      <section className="flex flex-col gap-3 rounded-xl bg-ios-bg-secondary p-4">
        <h2 className="text-lg font-semibold text-ios-label">Popular Guides</h2>
        <ul className="text-sm text-ios-label-secondary space-y-2">
          <li>• How to verify your account</li>
          <li>• Adding a bank account</li>
          <li>• Understanding market orders</li>
          <li>• Security & privacy settings</li>
        </ul>
      </section>

    </InfoPage>
  );
};

export default KnowledgeBase;
