import React from "react";
import Header from "../components/Header";

const Checkout: React.FC = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col font-display bg-ios-bg text-ios-label">

      {/* Load fonts exactly like raw HTML */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />

      {/* Custom checkbox style */}
      <style>{`
        .custom-checkbox {
          appearance: none;
          -webkit-appearance: none;
          width: 24px;
          height: 24px;
          border: 2px solid #8E8E93;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          transition: background-color 0.2s, border-color 0.2s;
        }
        .custom-checkbox:checked {
          background-color: #0A84FF;
          border-color: #0A84FF;
        }
        .custom-checkbox:checked::after {
          content: 'check';
          font-family: 'Material Symbols Outlined';
          font-weight: 700;
          font-size: 18px;
          color: white;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>

      <Header title="Checkout" />

      {/* Main */}
      <main className="flex-1 flex flex-col gap-6 p-4 pt-6">

        {/* Challenge Card */}
        <section className="flex flex-col gap-4 rounded-xl bg-ios-bg-secondary">
          <div className="flex items-center justify-between p-4 pb-0">
            <h2 className="text-[22px] font-bold text-ios-label">
              $100,000 Apex
            </h2>
            <p className="text-[22px] font-bold text-ios-blue">$499</p>
          </div>

          <p className="px-4 text-[17px] text-ios-label-secondary">
            Standard Challenge
          </p>

          <div className="border-t border-ios-separator p-4">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">

              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-ios-green text-lg">
                  insights
                </span>
                <p className="text-sm font-medium text-ios-label">
                  Profit Target: $10,000
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-ios-red text-lg">
                  trending_down
                </span>
                <p className="text-sm font-medium text-ios-label">
                  Max Daily Loss: $5,000
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-ios-red text-lg">
                  show_chart
                </span>
                <p className="text-sm font-medium text-ios-label">
                  Max Total Loss: $10,000
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-ios-blue text-lg">
                  balance
                </span>
                <p className="text-sm font-medium text-ios-label">
                  Leverage: 1:100
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Transaction Details */}
        <section className="flex flex-col">
          <h3 className="px-4 pb-2 text-xs font-medium uppercase tracking-wider text-ios-label-secondary">
            Transaction Details
          </h3>

          <div className="divide-y divide-ios-separator overflow-hidden rounded-xl bg-ios-bg-secondary">
            <div className="flex items-center justify-between p-4">
              <p className="text-[17px] text-ios-label">Price</p>
              <p className="text-[17px] text-ios-label-secondary">$499.00</p>
            </div>

            <div className="flex items-center justify-between p-4">
              <p className="text-[17px] text-ios-label">Discount</p>
              <p className="text-[17px] text-ios-label-secondary">-$0.00</p>
            </div>

            <div className="flex items-center justify-between p-4">
              <p className="text-[17px] font-semibold text-ios-label">Total</p>
              <p className="text-[17px] font-semibold text-ios-label">
                $499.00
              </p>
            </div>
          </div>
        </section>

        {/* Payment Method */}
        <section className="flex flex-col">
          <h3 className="px-4 pb-2 text-xs font-medium uppercase tracking-wider text-ios-label-secondary">
            Payment Method
          </h3>

          <div className="divide-y divide-ios-separator overflow-hidden rounded-xl bg-ios-bg-secondary">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-yellow-500">
                  <span className="material-symbols-outlined !text-xl text-white">
                    currency_bitcoin
                  </span>
                </div>
                <p className="text-[17px] text-ios-label">Crypto</p>
              </div>

              <span className="material-symbols-outlined text-ios-green !text-2xl font-bold">
                check_circle
              </span>
            </div>
          </div>
        </section>

        {/* General Trading Rules */}
        <section className="flex flex-col">
          <h3 className="px-4 pb-2 text-xs font-medium uppercase tracking-wider text-ios-label-secondary">
            General Trading Rules
          </h3>

          <div className="divide-y divide-ios-separator overflow-hidden rounded-xl bg-ios-bg-secondary">

            <div className="flex items-start gap-3 p-4">
              <span className="material-symbols-outlined text-ios-label-secondary text-lg mt-0.5">
                shield
              </span>
              <p className="text-[15px] text-ios-label-secondary">
                No trading during sudden news events
              </p>
            </div>

            <div className="flex items-start gap-3 p-4">
              <span className="material-symbols-outlined text-ios-label-secondary text-lg mt-0.5">
                location_off
              </span>
              <p className="text-[15px] text-ios-label-secondary">
                Avoid frequent changes in trading location
              </p>
            </div>

            <div className="flex items-start gap-3 p-4">
              <span className="material-symbols-outlined text-ios-label-secondary text-lg mt-0.5">
                devices_other
              </span>
              <p className="text-[15px] text-ios-label-secondary">
                Do not change trading devices often
              </p>
            </div>

          </div>
        </section>

        {/* Bottom Section */}
        <div className="mt-auto flex flex-col gap-4 pb-4">

          <label className="flex items-start gap-3 px-2">
            <input type="checkbox" className="custom-checkbox mt-0.5 shrink-0" />
            <span className="text-sm text-ios-label-secondary">
              I have read and agree to the General Trading Rules.
            </span>
          </label>

          <div className="flex flex-col gap-4">

            <div className="flex items-start gap-3 px-2">
              <span className="material-symbols-outlined mt-0.5 text-ios-label-secondary">
                verified_user
              </span>
              <p className="text-sm text-ios-label-secondary">
                Your information is secure. By completing your purchase, you
                agree to our{" "}
                <a href="#" className="text-ios-blue">
                  Terms of Service
                </a>.
              </p>
            </div>

            <button className="flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-ios-blue text-[17px] font-semibold text-white active:bg-opacity-80">
              Pay Now
            </button>

          </div>
        </div>

      </main>
    </div>
  );
};

export default Checkout;
