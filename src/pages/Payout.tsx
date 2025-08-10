// src/pages/Payout.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";

const Payout = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState("UPI");
  const [details, setDetails] = useState("");

  const handleSubmit = () => {
    if (!details.trim()) {
      return alert("⚠️ Please enter your payout details");
    }
    alert(`✅ Payout request sent via ${method}. Our team will process it soon.`);
    setDetails("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col">
      {/* Top bar */}
      <div className="flex items-center p-4 border-b border-white/10 backdrop-blur-md bg-black/30 sticky top-0 z-50">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-white/10 transition"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="ml-3 text-lg font-semibold tracking-wide">Request Payout</h1>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/10">
          <h2 className="text-2xl font-bold mb-6 text-center">💸 Secure Payout</h2>

          {/* Method Selection */}
          <div className="mb-6">
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
          <div className="mb-6">
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

          {/* Info */}
          <p className="text-xs text-gray-400 mt-4 text-center">
            All payouts require manual verification by our admin team for security.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payout;