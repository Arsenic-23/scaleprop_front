// src/pages/Rules.tsx
import React from "react";
import { ArrowLeft, CheckCircle2, XCircle, Calendar, Activity, Target, Bot, Newspaper, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type Rule = {
  type: "allowed" | "restricted";
  title: string;
  detail: string;
  icon: React.ReactNode;
  note?: string;
};

const rules: Rule[] = [
  { type: "allowed", title: "Max Daily Drawdown", detail: "5% of starting balance", icon: <CheckCircle2 />, note: "Resets each trading day." },
  { type: "allowed", title: "Max Total Drawdown", detail: "10% of account", icon: <Activity />, note: "Account locked if exceeded." },
  { type: "allowed", title: "Profit Target", detail: "8% within 30 days", icon: <Target />, note: "Meets challenge success criteria." },
  { type: "allowed", title: "Trading Days Required", detail: "Minimum 5 active days", icon: <Calendar />, note: "Active day = at least one executed trade." },
  { type: "restricted", title: "EA / Bot Usage", detail: "Not allowed", icon: <Robot />, note: "Automated strategies will cause disqualification." },
  { type: "restricted", title: "News Trading", detail: "Restricted during high-volatility events", icon: <Newspaper />, note: "Check event calendar before trading." },
  { type: "restricted", title: "Holding Trades Over Weekend", detail: "Not permitted", icon: <Clock />, note: "Close positions by EOD Friday." },
];

export default function Rules() {
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } },
  };
  const item = {
    hidden: { opacity: 0, x: -8 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 220, damping: 20 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white antialiased">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-black/60 backdrop-blur-md border-b border-white/6">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-start gap-3">
          <button
            onClick={() => navigate(-1)}
            aria-label="Back"
            className="mt-2 p-2 rounded-full bg-white/4 hover:bg-white/8 transition shadow-sm"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="ml-1">
            <h1 className="text-lg font-semibold tracking-tight">📘 Challenge Rules</h1>
            <p className="text-xs text-gray-400 mt-0.5">Read before you trade. Violations may disqualify your account.</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Summary strip */}
        <div className="flex items-center justify-between bg-gradient-to-r from-white/3 via-white/2 to-white/3 p-3 rounded-xl border border-white/6 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold">Rules Overview</p>
              <p className="text-xs text-gray-400">Clear limits and prohibited actions.</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm font-semibold">Max Drawdown</p>
            <p className="text-xs text-gray-400">Daily 5% • Total 10%</p>
          </div>
        </div>

        {/* Rules as iOS-style chat bubbles */}
        <motion.ul
          initial="hidden"
          animate="show"
          variants={container}
          className="space-y-3"
          aria-live="polite"
        >
          {rules.map((r, i) => (
            <motion.li key={i} variants={item} className="relative">
              <div
                className={`group flex items-start gap-4 p-4 rounded-2xl border transition-shadow ${
                  r.type === "allowed"
                    ? "bg-white/4 border-green-400/10 hover:shadow-[0_8px_30px_rgba(34,197,94,0.06)]"
                    : "bg-white/4 border-red-400/8 hover:shadow-[0_8px_30px_rgba(239,68,68,0.06)]"
                }`}
                role="listitem"
              >
                <div
                  className={`flex-none w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-sm ${
                    r.type === "allowed"
                      ? "bg-gradient-to-br from-green-500 to-emerald-500 text-white"
                      : "bg-gradient-to-br from-rose-500 to-red-500 text-white"
                  }`}
                >
                  {r.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-sm">{r.title}</p>
                      <p className="text-xs text-gray-300 mt-0.5">{r.detail}</p>
                    </div>

                    <div className="text-right">
                      <span
                        className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded-lg ${
                          r.type === "allowed"
                            ? "bg-green-700/20 text-green-300"
                            : "bg-red-700/20 text-red-300"
                        }`}
                      >
                        {r.type === "allowed" ? "Allowed" : "Restricted"}
                      </span>
                    </div>
                  </div>

                  {r.note && (
                    <div className="mt-3 text-xs text-gray-400 bg-black/30 p-2 rounded-md">
                      {r.note}
                    </div>
                  )}
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        {/* Detailed explanatory block */}
        <section className="bg-white/3 border border-white/6 rounded-2xl p-4 backdrop-blur-sm">
          <h3 className="text-sm font-semibold mb-2">How enforcement works</h3>
          <p className="text-xs text-gray-300">
            All metrics are measured on server-side. Drawdown checks run in real time. If a rule is
            violated your account will be paused and reviewed. Appeals are accepted within 48 hours.
          </p>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-black/30 border border-white/6">
              <p className="text-xs text-gray-400">Monitoring</p>
              <p className="font-medium text-sm">Real-time risk checks</p>
            </div>
            <div className="p-3 rounded-lg bg-black/30 border border-white/6">
              <p className="text-xs text-gray-400">Disputes</p>
              <p className="font-medium text-sm">Support response in 24–48 hrs</p>
            </div>
          </div>
        </section>

        {/* Footer note */}
        <div className="text-xs text-gray-500 text-center px-3">
          ⚠️ Repeated or intentional breaches lead to permanent disqualification. Keep a copy of
          these rules for your records.
        </div>
      </main>
    </div>
  );
}