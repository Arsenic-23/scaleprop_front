// src/pages/Account.tsx
import { useEffect, useState } from "react";

interface AccountData {
  login: string;
  server: string;
  password: string;
  balance: number;
  equity: number;
  profit: number;
  status: string;
}

const Account = () => {
  const [account, setAccount] = useState<AccountData | null>(null);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    // 🚀 Replace with backend fetch later
    const mockAccount: AccountData = {
      login: "10123456",
      server: "MetaTrader-Demo",
      password: "trader123",
      balance: 10000,
      equity: 9985.5,
      profit: -14.5,
      status: "Active",
    };

    setTimeout(() => setAccount(mockAccount), 800); // smooth loading
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black p-6 text-white">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-center tracking-wide mb-1">
          📊 Trading Account
        </h2>
        <p className="text-sm text-gray-400 mb-8 text-center">
          User ID: {userId}
        </p>

        {/* Account Card */}
        {account ? (
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 shadow-2xl rounded-2xl p-6 space-y-6 transition-all duration-300 hover:shadow-blue-500/20">
            {/* Account Info Grid */}
            <div className="grid grid-cols-2 gap-6">
              <InfoBlock label="Login" value={account.login} />
              <InfoBlock label="Server" value={account.server} />
              <InfoBlock label="Password" value={account.password} />
              <StatusBlock status={account.status} />
            </div>

            <hr className="border-white/10" />

            {/* Account Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <StatBlock label="Balance" value={account.balance} />
              <StatBlock label="Equity" value={account.equity} />
              <ProfitBlock profit={account.profit} />
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 text-sm animate-pulse">
            Loading account details...
          </div>
        )}
      </div>
    </div>
  );
};

const InfoBlock = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-gray-400">{label}</p>
    <p className="font-semibold tracking-wide">{value}</p>
  </div>
);

const StatusBlock = ({ status }: { status: string }) => (
  <div>
    <p className="text-xs text-gray-400">Status</p>
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
        status === "Active"
          ? "bg-green-500/20 text-green-400 border border-green-500/30"
          : "bg-red-500/20 text-red-400 border border-red-500/30"
      }`}
    >
      {status}
    </span>
  </div>
);

const StatBlock = ({ label, value }: { label: string; value: number }) => (
  <div className="bg-white/5 border border-white/10 p-3 rounded-xl hover:border-blue-500/30 transition-all duration-200">
    <p className="text-xs text-gray-400">{label}</p>
    <p className="text-lg font-bold">${value.toFixed(2)}</p>
  </div>
);

const ProfitBlock = ({ profit }: { profit: number }) => (
  <div
    className={`bg-white/5 border border-white/10 p-3 rounded-xl transition-all duration-200 ${
      profit >= 0
        ? "hover:border-green-500/30"
        : "hover:border-red-500/30"
    }`}
  >
    <p className="text-xs text-gray-400">Profit</p>
    <p
      className={`text-lg font-bold ${
        profit >= 0 ? "text-green-400" : "text-red-400"
      }`}
    >
      ${profit.toFixed(2)}
    </p>
  </div>
);

export default Account;