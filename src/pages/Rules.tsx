// src/pages/Rules.tsx
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Rules = () => {
  const navigate = useNavigate();

  const rules = [
    {
      type: "allowed",
      title: "Max Daily Drawdown",
      detail: "5% of starting balance",
      icon: "📉",
    },
    {
      type: "allowed",
      title: "Max Total Drawdown",
      detail: "10%",
      icon: "📊",
    },
    {
      type: "allowed",
      title: "Profit Target",
      detail: "8% in 30 days",
      icon: "🎯",
    },
    {
      type: "allowed",
      title: "Trading Days Required",
      detail: "Minimum 5 active days",
      icon: "📅",
    },
    {
      type: "restricted",
      title: "EA/Bot Usage",
      detail: "Not allowed",
      icon: "🤖",
    },
    {
      type: "restricted",
      title: "News Trading",
      detail: "Restricted during high-volatility events",
      icon: "📰",
    },
    {
      type: "restricted",
      title: "Holding Trades Over Weekend",
      detail: "Not permitted",
      icon: "📆",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="flex items-center gap-3 bg-white shadow px-4 py-3 sticky top-0">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-lg font-semibold">📘 Challenge Rules</h2>
      </div>

      {/* Rules List */}
      <div className="p-4 max-w-2xl mx-auto space-y-4">
        {rules.map((rule, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 p-4 rounded-xl shadow-sm border transition hover:shadow-md ${
              rule.type === "allowed"
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="text-2xl">{rule.icon}</div>
            <div>
              <h3 className="font-semibold text-gray-800">{rule.title}</h3>
              <p className="text-gray-600 text-sm">{rule.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-8 mb-6 text-center text-xs text-gray-500 px-4">
        ⚠️ Violation of rules will result in account disqualification.
      </div>
    </div>
  );
};

export default Rules;