import React from "react";
import Header from "../components/Header";

const Plans: React.FC = () => {
  return (
    <div className="font-display bg-ios-bg text-ios-label min-h-screen w-full">
      {/* Load Fonts EXACTLY like HTML */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />

      <div className="relative flex min-h-screen w-full flex-col">
        <Header title="Challenges" />

        {/* ----- MAKE DESKTOP LOOK PERFECT ----- */}
        <main className="flex-1 flex flex-col gap-8 p-4 pt-6 mx-auto w-full max-w-3xl">

          {/* ---------- FIRST CARD ---------- */}
          <section
            className="flex flex-col gap-6 rounded-2xl bg-ios-bg-secondary p-5 transition-all
                       duration-200 hover:shadow-lg hover:-translate-y-1 active:scale-[0.98]"
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold tracking-tight text-ios-label">
                  $25,000 Stellar
                </h2>
                <p className="text-[17px] text-ios-label-secondary">
                  Standard Challenge
                </p>
              </div>
              <div className="text-2xl font-bold text-ios-label">$169</div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-ios-green text-xl">
                  insights
                </span>
                <div>
                  <p className="text-sm text-ios-label-secondary">Profit Target</p>
                  <p className="text-[17px] font-medium text-ios-label">$2,500</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-ios-red text-xl">
                  trending_down
                </span>
                <div>
                  <p className="text-sm text-ios-label-secondary">Max Daily Loss</p>
                  <p className="text-[17px] font-medium text-ios-label">$1,250</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-ios-red text-xl">
                  show_chart
                </span>
                <div>
                  <p className="text-sm text-ios-label-secondary">Max Total Loss</p>
                  <p className="text-[17px] font-medium text-ios-label">$2,500</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-ios-blue text-xl">
                  balance
                </span>
                <div>
                  <p className="text-sm text-ios-label-secondary">Leverage</p>
                  <p className="text-[17px] font-medium text-ios-label">1:100</p>
                </div>
              </div>
            </div>

            <button className="flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-ios-fill-tertiary text-[17px] font-semibold text-ios-label active:bg-ios-separator active:scale-[0.98] transition-all">
              Get Challenge
            </button>
          </section>

          {/* ---------- POPULAR CARD ---------- */}
          <section
            className="relative flex flex-col gap-6 rounded-2xl bg-ios-bg-secondary p-5 ring-2 ring-ios-blue
                       transition-all duration-200 hover:shadow-xl hover:-translate-y-1 active:scale-[0.98]"
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 transform">
              <div className="flex items-center gap-1.5 rounded-full bg-ios-blue px-3 py-1">
                <span className="material-symbols-outlined text-sm text-white">
                  star
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Popular
                </span>
              </div>
            </div>

            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold tracking-tight text-ios-label">
                  $100,000 Apex
                </h2>
                <p className="text-[17px] text-ios-label-secondary">
                  Standard Challenge
                </p>
              </div>
              <div className="text-2xl font-bold text-ios-blue">$499</div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-ios-green text-xl">
                  insights
                </span>
                <div>
                  <p className="text-sm text-ios-label-secondary">Profit Target</p>
                  <p className="text-[17px] font-medium text-ios-label">$10,000</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-ios-red text-xl">
                  trending_down
                </span>
                <div>
                  <p className="text-sm text-ios-label-secondary">Max Daily Loss</p>
                  <p className="text-[17px] font-medium text-ios-label">$5,000</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-ios-red text-xl">
                  show_chart
                </span>
                <div>
                  <p className="text-sm text-ios-label-secondary">Max Total Loss</p>
                  <p className="text-[17px] font-medium text-ios-label">$10,000</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-ios-blue text-xl">
                  balance
                </span>
                <div>
                  <p className="text-sm text-ios-label-secondary">Leverage</p>
                  <p className="text-[17px] font-medium text-ios-label">1:100</p>
                </div>
              </div>
            </div>

            <button className="flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-ios-blue text-[17px] font-semibold text-white active:bg-opacity-80 active:scale-[0.98] transition-all">
              Get Challenge
            </button>
          </section>

          {/* ---------- THIRD CARD ---------- */}
          <section
            className="flex flex-col gap-6 rounded-2xl bg-ios-bg-secondary p-5 transition-all
                       duration-200 hover:shadow-lg hover:-translate-y-1 active:scale-[0.98]"
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold tracking-tight text-ios-label">
                  $200,000 Summit
                </h2>
                <p className="text-[17px] text-ios-label-secondary">
                  Standard Challenge
                </p>
              </div>
              <div className="text-2xl font-bold text-ios-label">$949</div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-ios-green text-xl">
                  insights
                </span>
                <div>
                  <p className="text-sm text-ios-label-secondary">Profit Target</p>
                  <p className="text-[17px] font-medium text-ios-label">$20,000</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-ios-red text-xl">
                  trending_down
                </span>
                <div>
                  <p className="text-sm text-ios-label-secondary">Max Daily Loss</p>
                  <p className="text-[17px] font-medium text-ios-label">$10,000</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-ios-red text-xl">
                  show_chart
                </span>
                <div>
                  <p className="text-sm text-ios-label-secondary">Max Total Loss</p>
                  <p className="text-[17px] font-medium text-ios-label">$20,000</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-ios-blue text-xl">
                  balance
                </span>
                <div>
                  <p className="text-sm text-ios-label-secondary">Leverage</p>
                  <p className="text-[17px] font-medium text-ios-label">1:100</p>
                </div>
              </div>
            </div>

            <button className="flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-ios-fill-tertiary text-[17px] font-semibold text-ios-label active:bg-ios-separator active:scale-[0.98] transition-all">
              Get Challenge
            </button>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Plans;
