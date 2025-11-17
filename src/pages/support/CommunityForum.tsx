import React from "react";
import InfoPage from "../../components/InfoPage";

const CommunityForum: React.FC = () => {
  return (
    <InfoPage headerTitle="Community Forum" backLabel="Support">

      <section className="rounded-xl bg-ios-bg-secondary p-4 space-y-3">
        <h2 className="text-lg font-semibold text-ios-label">Recent Discussions</h2>

        <div className="flex flex-col gap-3">
          <div className="rounded-lg border border-ios-separator p-3">
            <p className="text-base text-ios-label">Best beginner investment strategies?</p>
            <p className="text-xs text-ios-label-secondary mt-1">32 replies</p>
          </div>

          <div className="rounded-lg border border-ios-separator p-3">
            <p className="text-base text-ios-label">How do you track long-term growth?</p>
            <p className="text-xs text-ios-label-secondary mt-1">17 replies</p>
          </div>
        </div>
      </section>

    </InfoPage>
  );
};

export default CommunityForum;
