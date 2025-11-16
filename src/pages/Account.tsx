import React from "react";
import Header from "../components/Header";

const Account: React.FC = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col font-display bg-ios-bg text-ios-label">
      {/* Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />

      {/* KEEPING YOUR HEADER EXACTLY AS IS */}
      <Header title="Account" />

      <main className="flex-1 flex flex-col gap-6 p-4">

        {/* Account Info */}
        <section className="overflow-hidden rounded-xl bg-ios-bg-secondary">
          <ul className="flex flex-col">

            <li className="flex items-center justify-between gap-4 border-b border-ios-separator px-4 py-3">
              <p className="text-base text-ios-label-secondary">Account ID</p>
              <div className="flex items-center gap-2">
                <p className="text-base text-ios-label">SF-EVAL-2981</p>
                <span className="material-symbols-outlined text-ios-label-secondary !text-lg !font-light">
                  content_copy
                </span>
              </div>
            </li>

            <li className="flex items-center justify-between gap-4 px-4 py-3">
              <p className="text-base text-ios-label-secondary">Account Type</p>
              <div className="rounded-full bg-ios-blue/20 px-3 py-1">
                <p className="text-sm font-medium text-ios-blue">Evaluation</p>
              </div>
            </li>

          </ul>
        </section>

        {/* Phase Progress */}
        <section className="flex flex-col gap-4 rounded-xl bg-ios-bg-secondary p-4">

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-ios-label">Phase Progress</h2>
            <span className="material-symbols-outlined text-ios-label-secondary">info</span>
          </div>

          <div className="flex items-baseline justify-between">
            <p className="text-sm text-ios-label-secondary">Profit Target</p>
            <p className="text-2xl font-semibold text-ios-green">$8,000</p>
          </div>

          <div className="relative h-2 w-full rounded-full bg-ios-progress-bg">
            <div
              className="h-2 rounded-full bg-ios-green"
              style={{ width: "30.625%" }}
            ></div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-ios-label-secondary">Current Profit</p>
            <p className="text-sm font-medium text-ios-label">$2,450.00</p>
          </div>

        </section>

        {/* Payout Insights (FULLY UPDATED TO MATCH HTML) */}
        <section className="cursor-pointer overflow-hidden rounded-xl bg-ios-bg-secondary">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">

              {/* GREEN ICON */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ios-green">
                <span className="material-symbols-outlined text-black">payments</span>
              </div>

              <div className="flex flex-col">
                <h2 className="text-base font-semibold text-ios-label">Payout Insights</h2>
                <p className="text-sm text-ios-label-secondary">
                  Check your eligibility &amp; history
                </p>
              </div>
            </div>

            <span className="material-symbols-outlined text-ios-label-secondary">
              chevron_right
            </span>
          </div>
        </section>

        {/* Balances */}
        <section className="overflow-hidden rounded-xl bg-ios-bg-secondary">
          <ul className="flex flex-col">

            <li className="flex justify-between gap-4 border-b border-ios-separator px-4 py-3">
              <p className="text-base text-ios-label-secondary">Starting Balance</p>
              <p className="text-base text-ios-label">$100,000.00</p>
            </li>

            <li className="flex justify-between gap-4 border-b border-ios-separator px-4 py-3">
              <p className="text-base text-ios-label-secondary">Current Balance</p>
              <p className="text-base text-ios-label">$102,450.00</p>
            </li>

            <li className="flex justify-between gap-4 px-4 py-3">
              <p className="text-base text-ios-label-secondary">Equity</p>
              <p className="text-base text-ios-label">$102,510.50</p>
            </li>

          </ul>
        </section>

        {/* Trading History */}
        <section className="overflow-hidden rounded-xl bg-ios-bg-secondary">

          <div className="border-b border-ios-separator px-4 py-3">
            <h2 className="text-lg font-semibold text-ios-label">Trading History</h2>
          </div>

          <ul className="flex flex-col">

            <li className="flex items-center justify-between gap-4 border-b border-ios-separator px-4 py-3">
              <div className="flex flex-col">
                <p className="font-medium text-ios-label">EUR/USD</p>
                <p className="text-sm text-ios-label-secondary">
                  Nov 22, 2023 · Buy 1.5 @ 1.0915
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="font-medium text-ios-green">+$450.75</p>
                <p className="text-sm text-ios-label-secondary">Closed</p>
              </div>
            </li>

            <li className="flex items-center justify-between gap-4 border-b border-ios-separator px-4 py-3">
              <div className="flex flex-col">
                <p className="font-medium text-ios-label">NASDAQ 100</p>
                <p className="text-sm text-ios-label-secondary">
                  Nov 21, 2023 · Sell 1.0 @ 15980.5
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="font-medium text-ios-red">-$210.20</p>
                <p className="text-sm text-ios-label-secondary">Closed</p>
              </div>
            </li>

            <li className="flex items-center justify-between gap-4 border-b border-ios-separator px-4 py-3">
              <div className="flex flex-col">
                <p className="font-medium text-ios-label">GOLD</p>
                <p className="text-sm text-ios-label-secondary">
                  Nov 21, 2023 · Buy 0.5 @ 1995.30
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="font-medium text-ios-green">+$1,230.50</p>
                <p className="text-sm text-ios-label-secondary">Closed</p>
              </div>
            </li>

            <li className="flex cursor-pointer items-center justify-center gap-2 px-4 py-3 text-ios-blue">
              <p className="text-base font-medium">View All History</p>
              <span className="material-symbols-outlined !text-xl !font-medium">
                chevron_right
              </span>
            </li>

          </ul>
        </section>

        {/* Bottom Button */}
        <div className="mt-auto pb-4 pt-2">
          <button className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-ios-blue text-base font-semibold text-white">
            View Trading Dashboard
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>

      </main>
    </div>
  );
};

export default Account;
