import React from "react";
import Header from "../components/Header";

const Payout: React.FC = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col font-display bg-ios-bg text-ios-label">

      {/* Load fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />

      <Header title="Payout Insights" />

      {/* Main */}
      <main className="flex flex-1 flex-col gap-8 p-4">

        {/* Available For Payout */}
        <section className="flex flex-col gap-4 rounded-xl bg-ios-bg-secondary p-4">

          <div>
            <p className="text-base text-ios-label-secondary">Available for Payout</p>
            <p className="text-4xl font-bold text-ios-green">$2,450.00</p>
          </div>

          <p className="text-sm text-ios-label-tertiary">
            This is the total profit eligible for withdrawal. Payouts can be
            requested once every 30 days.
          </p>

        </section>

        {/* Request Crypto Payout (NEW COMPONENT INSERTED HERE) */}
        <section className="flex flex-col gap-4">
          <h2 className="px-4 text-xl font-semibold text-ios-label">Request Crypto Payout</h2>

          <div className="flex flex-col gap-4 overflow-hidden rounded-xl bg-ios-bg-secondary p-4">

            {/* Amount */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-ios-label-secondary" htmlFor="payout-amount">
                Amount (USD)
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 !text-lg text-ios-label-tertiary">
                  attach_money
                </span>
                <input
                  id="payout-amount"
                  type="text"
                  placeholder="2,450.00"
                  className="h-12 w-full rounded-lg border-0 bg-ios-bg-tertiary pl-9 pr-4 text-base text-ios-label placeholder-ios-label-tertiary focus:ring-2 focus:ring-ios-blue"
                />
              </div>
            </div>

            {/* Crypto Selection */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-ios-label-secondary" htmlFor="cryptocurrency">
                Cryptocurrency
              </label>
              <div className="relative">
                <select
                  id="cryptocurrency"
                  className="h-12 w-full cursor-pointer rounded-lg border-0 bg-ios-bg-tertiary pl-4 pr-10 text-base text-ios-label focus:ring-2 focus:ring-ios-blue"
                >
                  <option>USDC (ERC20)</option>
                  <option>USDT (ERC20)</option>
                  <option>Bitcoin (BTC)</option>
                  <option>Ethereum (ETH)</option>
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ios-label-tertiary">
                  unfold_more
                </span>
              </div>
            </div>

            {/* Wallet Address */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-ios-label-secondary" htmlFor="crypto-wallet">
                Wallet Address
              </label>
              <div className="relative">
                <input
                  id="crypto-wallet"
                  type="text"
                  placeholder="Enter your wallet address"
                  className="h-12 w-full rounded-lg border-0 bg-ios-bg-tertiary pl-4 pr-12 text-base text-ios-label placeholder-ios-label-tertiary focus:ring-2 focus:ring-ios-blue"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-ios-bg-secondary p-1.5 text-ios-blue">
                  <span className="material-symbols-outlined !text-xl">qr_code_scanner</span>
                </button>
              </div>
            </div>

            {/* Confirm Button */}
            <button className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-ios-blue text-base font-semibold text-white">
              Confirm Payout
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>

          </div>
        </section>

        {/* Payout History */}
        <section className="flex flex-col gap-4">

          <h2 className="px-4 text-xl font-semibold text-ios-label">Payout History</h2>

          <div className="overflow-hidden rounded-xl bg-ios-bg-secondary">
            <ul className="flex flex-col">

              <li className="flex items-center justify-between gap-4 border-b border-ios-separator px-4 py-3">
                <div className="flex flex-col">
                  <p className="text-base text-ios-label">Payout #003</p>
                  <p className="text-sm text-ios-label-secondary">May 15, 2024</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-base font-medium text-ios-label">$1,500.00</p>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-ios-green">
                    <span className="material-symbols-outlined !text-base text-black">done</span>
                  </div>
                </div>
              </li>

              <li className="flex items-center justify-between gap-4 border-b border-ios-separator px-4 py-3">
                <div className="flex flex-col">
                  <p className="text-base text-ios-label">Payout #002</p>
                  <p className="text-sm text-ios-label-secondary">April 12, 2024</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-base font-medium text-ios-label">$2,120.50</p>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-ios-green">
                    <span className="material-symbols-outlined !text-base text-black">done</span>
                  </div>
                </div>
              </li>

              <li className="flex items-center justify-between gap-4 px-4 py-3">
                <div className="flex flex-col">
                  <p className="text-base text-ios-label">Payout #001</p>
                  <p className="text-sm text-ios-label-secondary">March 10, 2024</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-base font-medium text-ios-label">$980.00</p>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-ios-green">
                    <span className="material-symbols-outlined !text-base text-black">done</span>
                  </div>
                </div>
              </li>

            </ul>
          </div>
        </section>

        {/* Next Payout Cycle */}
        <section className="flex flex-col gap-4">
          <h2 className="px-4 text-xl font-semibold text-ios-label">Next Payout Cycle</h2>

          <div className="rounded-xl bg-ios-bg-secondary p-4">
            <div className="flex items-center justify-between">
              <p className="text-base text-ios-label-secondary">Next eligible date</p>
              <p className="text-base font-medium text-ios-label">June 14, 2024</p>
            </div>

            <div className="mt-3 h-2 w-full rounded-full bg-ios-progress-bg">
              <div className="h-2 rounded-full bg-ios-blue" style={{ width: "70%" }}></div>
            </div>

            <div className="mt-2 flex items-center justify-between text-sm text-ios-label-secondary">
              <span>21 days</span>
              <span>9 days left</span>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Payout;
