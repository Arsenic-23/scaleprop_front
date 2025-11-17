import React from "react";
import InfoPage from "../../components/InfoPage";

const CommunityForum: React.FC = () => {
  return (
    <InfoPage headerTitle="Community Forum" backLabel="Support">

      {/* Hot Discussions */}
      <section className="rounded-xl bg-ios-bg-secondary p-4 space-y-4">
        <h2 className="text-lg font-semibold text-ios-label">Trending Discussions</h2>

        <div className="flex flex-col gap-3">

          {/* Discussion 1 */}
          <div className="rounded-lg border border-ios-separator p-3">
            <p className="text-base text-ios-label">
              Passed Phase 1 at Scalefund — tips for Phase 2?
            </p>
            <p className="text-xs text-ios-label-secondary mt-1">48 replies • Active now</p>
          </div>

          {/* Discussion 2 */}
          <div className="rounded-lg border border-ios-separator p-3">
            <p className="text-base text-ios-label">
              Best setups to avoid daily drawdown breaches?
            </p>
            <p className="text-xs text-ios-label-secondary mt-1">36 replies • Today</p>
          </div>

          {/* Discussion 3 */}
          <div className="rounded-lg border border-ios-separator p-3">
            <p className="text-base text-ios-label">
              How long did your first payout with Scalefund take?
            </p>
            <p className="text-xs text-ios-label-secondary mt-1">29 replies • 1d ago</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="rounded-xl bg-ios-bg-secondary p-4 space-y-4">
        <h2 className="text-lg font-semibold text-ios-label">Categories</h2>

        <div className="flex flex-col gap-3">

          <div className="rounded-lg border border-ios-separator p-3">
            <p className="text-base text-ios-label">Evaluation Tips & Guidance</p>
            <p className="text-xs text-ios-label-secondary mt-1">
              Learn how traders pass Scalefund challenges efficiently.
            </p>
          </div>

          <div className="rounded-lg border border-ios-separator p-3">
            <p className="text-base text-ios-label">Risk Management Strategies</p>
            <p className="text-xs text-ios-label-secondary mt-1">
              Community knowledge on managing DD and improving consistency.
            </p>
          </div>

          <div className="rounded-lg border border-ios-separator p-3">
            <p className="text-base text-ios-label">Crypto Payouts & Withdrawals</p>
            <p className="text-xs text-ios-label-secondary mt-1">
              Discussions on payout speed, crypto exchanges, and best practices.
            </p>
          </div>

          <div className="rounded-lg border border-ios-separator p-3">
            <p className="text-base text-ios-label">General Trading Talk</p>
            <p className="text-xs text-ios-label-secondary mt-1">
              Market news, trading ideas, setups, and psychology.
            </p>
          </div>

        </div>
      </section>

      {/* Recent Activity */}
      <section className="rounded-xl bg-ios-bg-secondary p-4 space-y-4">
        <h2 className="text-lg font-semibold text-ios-label">Recent Activity</h2>

        <div className="flex flex-col gap-3">

          <div className="rounded-lg border border-ios-separator p-3">
            <p className="text-base text-ios-label">
              “Anyone trading during news on Scalefund challenge?”
            </p>
            <p className="text-xs text-ios-label-secondary mt-1">12 replies • 3h ago</p>
          </div>

          <div className="rounded-lg border border-ios-separator p-3">
            <p className="text-base text-ios-label">
              “What's your crypto preference for receiving payouts?”
            </p>
            <p className="text-xs text-ios-label-secondary mt-1">19 replies • 6h ago</p>
          </div>

          <div className="rounded-lg border border-ios-separator p-3">
            <p className="text-base text-ios-label">
              “My account got flagged — support resolved it fast!”
            </p>
            <p className="text-xs text-ios-label-secondary mt-1">8 replies • 1d ago</p>
          </div>

        </div>
      </section>

      {/* Create Post Button */}
      <section className="rounded-xl bg-ios-bg-secondary p-4 flex flex-col items-center">
        <button className="w-full h-12 rounded-lg bg-ios-blue text-white font-semibold text-base flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">edit</span>
          Create New Post
        </button>
      </section>

    </InfoPage>
  );
};

export default CommunityForum;
