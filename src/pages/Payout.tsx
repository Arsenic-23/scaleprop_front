// src/pages/Payout.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, CheckCircle2 } from "lucide-react";

const Payout = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState("UPI");
  const [details, setDetails] = useState("");
  const [success, setSuccess] = useState(false);

  const transactions = [
    { id: 1, type: "deposit", amount: 1500, date: "2025-08-05" },
    { id: 2, type: "withdraw", amount: 700, date: "2025-08-07" },
    { id: 3, type: "deposit", amount: 2500, date: "2025-08-09" },
  ];

  const handleSubmit = () => {
    if (!details.trim()) return;
    setSuccess(true);
    setDetails("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex flex-col">
      {/* Top Section */}
      <div className="p-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-white/10 transition mb-3"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold tracking-wide">Payout</h1>
        <p className="text-sm text-gray-400">Withdraw your funds securely</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-4">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/10 mb-6">
          {!success ? (
            <>
              <h2 className="text-xl font-semibold mb-6 text-center">
                💸 Request Payout
              </h2>

              {/* Method Selection */}
              <div className="mb-5">
                <label className="block mb-2 font-semibold text-sm text-gray-300">
                  Choose Method:
                </label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full p-3 rounded-lg border border-white/10 bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                >
                  <option value="UPI" className="bg-gray-900">
                    UPI
                  </option>
                  <option value="Crypto" className="bg-gray-900">
                    Crypto (USDT)
                  </option>
                </select>
              </div>

              {/* Details Input */}
              <div className="mb-5">
                <label className="block mb-2 font-semibold text-sm text-gray-300">
                  Enter {method} ID:
                </label>
                <input
                  type="text"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full p-3 rounded-lg border border-white/10 bg-black/40 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  placeholder={method === "UPI" ? "example@upi" : "Your USDT Wallet Address"}
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-5 py-3 rounded-full transition font-semibold shadow-lg hover:shadow-green-500/30"
              >
                <Send size={18} />
                Request Payout
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center text-center py-6">
              <CheckCircle2 size={50} className="text-green-500 mb-3" />
              <h2 className="text-xl font-bold mb-1">Request Sent</h2>
              <p className="text-gray-400 text-sm">
                Your payout request via {method} has been submitted successfully.
              </p>
            </div>
          )}
        </div>

        {/* Transaction History */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-5 shadow-xl border border-white/10">
          <h3 className="text-lg font-semibold mb-4">📜 Transaction History</h3>
          <ul className="space-y-4">
            {transactions.map((tx) => (
              <li
                key={tx.id}
                className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0"
              >
                <div>
                  <p className="font-medium">
                    {tx.type === "deposit" ? "Funds Added" : "Withdrawal"}
                  </p>
                  <p className="text-xs text-gray-400">{tx.date}</p>
                </div>
                <span
                  className={`font-semibold ${
                    tx.type === "deposit" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {tx.type === "deposit" ? "+" : "-"}₹{tx.amount}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="h-6" />
    </div>
  );
};

export default Payout;