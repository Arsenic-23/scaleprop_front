import React from "react";
import Header from "../components/Header";

const mockUser = {
  first_name: "James T. Kirk",
  email: "james.kirk@starfleet.com",
  photo_url:
    "https://www.google.com/imgres?q=cat%20cute&imgurl=https%3A%2F%2Fmedia.tenor.com%2F3zBRB7FbwDsAAAAM%2Fgroei-it-charlottexangie.gif&imgrefurl=https%3A%2F%2Fwww.prologisfreight.com%2F%3Fp%3D345451526&docid=cKPU3q2ObllmqM&tbnid=GtVFSNXI5DlvbM&vet=12ahUKEwity_LEn_GQAxXkSWwGHfKeGNYQM3oECCkQAA..i&w=220&h=220&hcb=2&ved=2ahUKEwity_LEn_GQAxXkSWwGHfKeGNYQM3oECCkQAA",
};

const Profile: React.FC = () => {
  const user = mockUser;

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-black dark overflow-x-hidden font-display">
      {/* Top App Bar */}
      <div className="sticky top-0 z-10 flex items-center bg-black/80 p-4 pb-2 backdrop-blur-sm justify-between">
        <div className="flex size-12 shrink-0 items-center"></div>
        <h2 className="text-[#EAEAEA] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
          My Account
        </h2>
        <div className="flex w-12 items-center justify-end">
          <button className="flex h-12 items-center justify-center rounded-lg text-[#EAEAEA]">
            <span className="material-symbols-outlined text-[#EAEAEA]">
              settings
            </span>
          </button>
        </div>
      </div>

      <main className="flex-1 flex flex-col gap-6 px-4 py-4">
        {/* User Info */}
        <div className="flex items-center gap-4 bg-[#1C1C1E] p-4 rounded-xl justify-between">
          <div className="flex items-center gap-4">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-14"
              style={{ backgroundImage: `url(${user.photo_url})` }}
            ></div>

            <div className="flex flex-col justify-center">
              <p className="text-[#EAEAEA] text-base font-medium leading-normal line-clamp-1">
                {user.first_name}
              </p>
              <p className="text-[#8E8E93] text-sm font-normal leading-normal line-clamp-2">
                {user.email}
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <span className="material-symbols-outlined text-[#8E8E93]">
              chevron_right
            </span>
          </div>
        </div>

        {/* Phase Progress */}
        <div className="bg-[#1C1C1E] p-4 rounded-xl flex flex-col gap-3">
          <h3 className="text-[#EAEAEA] text-lg font-bold tracking-[-0.015em]">
            Phase 1 Progress
          </h3>

          <div className="flex justify-between py-1">
            <p className="text-[#8E8E93] text-sm">Current Profit</p>
            <p className="text-[#34C759] text-sm font-bold">$2,450.00</p>
          </div>

          <div className="w-full bg-[#333333] rounded-full h-2">
            <div
              className="bg-[#0A84FF] h-2 rounded-full"
              style={{ width: "24.5%" }}
            ></div>
          </div>

          <div className="flex justify-between">
            <p className="text-[#8E8E93] text-xs">$0</p>
            <p className="text-[#8E8E93] text-xs">Profit Target: $10,000</p>
          </div>
        </div>

        {/* Account Details */}
        <div className="bg-[#1C1C1E] p-4 rounded-xl">
          <h3 className="text-[#EAEAEA] text-lg font-bold pb-2">
            Account Details
          </h3>

          {[
            ["Account ID", "123456"],
            ["Account Type", "Phase 1 Challenge"],
            ["Starting Balance", "$100,000.00"],
            ["Current Balance", "$102,450.00"],
            ["Equity", "$102,510.50"],
          ].map(([label, value], i) => (
            <div
              key={i}
              className="flex justify-between py-2 border-t border-white/10"
            >
              <p className="text-[#8E8E93] text-sm">{label}</p>
              <p className="text-[#EAEAEA] text-sm text-right">{value}</p>
            </div>
          ))}
        </div>

        {/* Trading Metrics */}
        <div className="bg-[#1C1C1E] p-4 rounded-xl">
          <h3 className="text-[#EAEAEA] text-lg font-bold pb-2">
            Trading Metrics
          </h3>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10">
            {[
              ["Total PnL", "$2,510.50", "text-green-400"],
              ["Total Trades", "82", "text-white"],
              ["Win Rate", "68%", "text-green-400"],
              ["Max Daily Loss", "-$1,840.12", "text-red-500"],
              ["Max Overall Loss", "-$3,112.50", "text-red-500"],
              ["Max Drawdown", "-$2,105.00", "text-red-500"],
            ].map(([label, value, color], i) => (
              <div
                key={i}
                className={`flex flex-col gap-1 py-2 ${
                  i % 2 === 1 ? "text-right" : ""
                }`}
              >
                <p className="text-[#8E8E93] text-sm">{label}</p>
                <p className={`${color} text-base font-bold`}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="py-4">
          <button className="w-full h-12 rounded-lg bg-[#0A84FF] text-white font-bold">
            View Trade History
          </button>
        </div>
      </main>
    </div>
  );
};

export default Profile;
