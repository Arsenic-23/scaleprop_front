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
    // 🚀 Later, fetch this from your backend
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
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-1 text-center">
          📊 Trading Account
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          User ID: {userId}
        </p>

        {account ? (
          <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4 transition-all duration-300 hover:shadow-xl">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Login</p>
                <p className="font-semibold text-gray-800">{account.login}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Server</p>
                <p className="font-semibold text-gray-800">{account.server}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Password</p>
                <p className="font-semibold text-gray-800">
                  {account.password}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    account.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {account.status}
                </span>
              </div>
            </div>

            <hr className="my-2" />

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-gray-50 p-3 rounded-xl">
                <p className="text-xs text-gray-500">Balance</p>
                <p className="text-lg font-bold text-gray-800">
                  ${account.balance.toFixed(2)}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                <p className="text-xs text-gray-500">Equity</p>
                <p className="text-lg font-bold text-gray-800">
                  ${account.equity.toFixed(2)}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                <p className="text-xs text-gray-500">Profit</p>
                <p
                  className={`text-lg font-bold ${
                    account.profit >= 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  ${account.profit.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 text-sm">
            Loading account details...
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;