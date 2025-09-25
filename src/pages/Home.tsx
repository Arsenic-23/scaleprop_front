import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import { ProgressBarsGroup } from "../components/ProgressBars";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

/* -------------------------
   Small utilities & types
   ------------------------- */
type MetricPoint = { time: string; balance: number; equity: number; dd: number };

/* -------------------------
   Animated Counter (no deps)
   ------------------------- */
function Counter({ value, prefix = "$", duration = 1000 }: { value: number; prefix?: string; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef<number | null>(null);
  const startValue = useRef(0);

  useEffect(() => {
    startRef.current = null;
    startValue.current = display;
    let raf = 0;

    const step = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(1, elapsed / duration);
      const eased = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
      const next = startValue.current + (value - startValue.current) * eased;
      setDisplay(next);
      if (progress < 1) raf = requestAnimationFrame(step);
      else setDisplay(value);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return (
    <div className="text-3xl font-bold">
      {prefix}
      {display >= 1000 ? display.toLocaleString(undefined, { maximumFractionDigits: 2 }) : display.toFixed(2)}
    </div>
  );
}

/* -------------------------
   Mock metric data (replace with API)
   ------------------------- */
const useMockMetrics = () => {
  return useMemo<MetricPoint[]>(
    () => [
      { time: "09:00", balance: 48000, equity: 48120, dd: 0 },
      { time: "10:00", balance: 48250, equity: 48400, dd: -150 },
      { time: "11:00", balance: 48500, equity: 48600, dd: -50 },
      { time: "12:00", balance: 49000, equity: 49150, dd: 0 },
      { time: "13:00", balance: 49200, equity: 49280, dd: -80 },
      { time: "14:00", balance: 49500, equity: 49650, dd: 0 },
      { time: "15:00", balance: 50000, equity: 50120, dd: -120 },
    ],
    []
  );
};

/* -------------------------
   Main Page
   ------------------------- */
const Home: React.FC = () => {
  const userId = localStorage.getItem("user_id") || "—";

  const [balance, setBalance] = useState(50000);
  const [target, setTarget] = useState(3000);
  const [targetMax] = useState(5000);

  const [dailyDd, setDailyDd] = useState(800);
  const [dailyDdMax] = useState(2500);

  const [totalDd, setTotalDd] = useState(1800);
  const [totalDdMax] = useState(5000);

  const metrics = useMockMetrics();

  useEffect(() => {
    const t = setTimeout(() => {
      setBalance(50000);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-900 text-white flex flex-col">
      {/* Sticky header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-black/40 border-b border-white/6">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">📊 Trading Dashboard</h1>
            <p className="text-xs text-gray-400">
              User ID: <span className="font-mono">{userId}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-gray-400">Status</p>
              <div className="text-sm font-semibold px-3 py-1 rounded-full bg-green-600/20 border border-green-600/25 text-green-200">
                Live
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-6 space-y-6">
          {/* Stat row */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl p-5 bg-gradient-to-tr from-white/3 to-white/2 border border-white/6 backdrop-blur-md shadow-xl">
              <p className="text-xs text-gray-400">Account Balance</p>
              <Counter value={balance} />
              <p className="text-xs text-gray-400 mt-2">Live balance from connected bridge</p>
            </div>

            <div className="rounded-2xl p-5 bg-gradient-to-tr from-white/3 to-white/2 border border-white/6 backdrop-blur-md shadow-xl">
              <p className="text-xs text-gray-400">Profit Target</p>
              <Counter value={targetMax} prefix="$" />
              <p className="text-xs text-gray-400 mt-2">Target to complete current phase</p>
            </div>

            <div className="rounded-2xl p-5 bg-gradient-to-tr from-white/3 to-white/2 border border-white/6 backdrop-blur-md shadow-xl">
              <p className="text-xs text-gray-400">Max Drawdown</p>
              <Counter value={totalDdMax} prefix="$" />
              <p className="text-xs text-gray-400 mt-2">Allowed drawdown remaining</p>
            </div>
          </section>

          {/* Progress bars */}
          <ProgressBarsGroup
            target={target}
            targetMax={targetMax}
            dailyDd={dailyDd}
            dailyDdMax={dailyDdMax}
            totalDd={totalDd}
            totalDdMax={totalDdMax}
          />

          {/* Quick actions */}
          <section>
            <h2 className="text-sm text-gray-300 font-semibold mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <ActionTile to="/plans" label="Buy Challenge" emoji="💼" />
              <ActionTile to="/account" label="Trading Account" emoji="📊" />
              <ActionTile to="/rules" label="View Rules" emoji="📘" />
              <ActionTile to="/payout" label="Request Payout" emoji="💸" />
              <ActionTile to="/announcements" label="Announcements" emoji="📢" />
              <ActionTile to="/support" label="Support" emoji="📞" />
            </div>
          </section>

          {/* Trading metrics */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Trading Metrics</h2>
              <div className="text-sm text-gray-400">Real-time overview</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Balance & Equity chart */}
              <div className="rounded-2xl p-4 bg-gradient-to-tr from-white/3 to-white/2 border border-white/6 backdrop-blur-md shadow-lg">
                <p className="text-xs text-gray-400 mb-2">Balance / Equity</p>
                <div style={{ width: "100%", height: 260 }}>
                  <ResponsiveContainer>
                    <AreaChart data={metrics} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00c853" stopOpacity={0.18} />
                          <stop offset="95%" stopColor="#00c853" stopOpacity={0.02} />
                        </linearGradient>
                        <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2979ff" stopOpacity={0.12} />
                          <stop offset="95%" stopColor="#2979ff" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>

                      <XAxis dataKey="time" axisLine={false} tick={{ fill: "#9CA3AF" }} />
                      <YAxis
                        tickFormatter={(v) => `$${(v as number).toLocaleString()}`}
                        axisLine={false}
                        tick={{ fill: "#9CA3AF" }}
                      />
                      <CartesianGrid strokeDasharray="3 6" stroke="#ffffff08" />
                      <Tooltip
                        contentStyle={{ background: "#0f1720", border: "1px solid rgba(255,255,255,0.06)" }}
                        labelStyle={{ color: "#cbd5e1" }}
                        itemStyle={{ color: "#fff" }}
                        formatter={(val: any) => `$${Number(val).toLocaleString()}`}
                      />
                      <Area type="monotone" dataKey="balance" stroke="#00c853" fillOpacity={1} fill="url(#colorBalance)" strokeWidth={2} />
                      <Area type="monotone" dataKey="equity" stroke="#2979ff" fillOpacity={1} fill="url(#colorEquity)" strokeWidth={2} />
                      <Legend wrapperStyle={{ color: "#cbd5e1" }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Equity & DD line chart */}
              <div className="rounded-2xl p-4 bg-gradient-to-tr from-white/3 to-white/2 border border-white/6 backdrop-blur-md shadow-lg">
                <p className="text-xs text-gray-400 mb-2">Equity Curve & Drawdown</p>
                <div style={{ width: "100%", height: 260 }}>
                  <ResponsiveContainer>
                    <LineChart data={metrics} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                      <XAxis dataKey="time" tick={{ fill: "#9CA3AF" }} />
                      <YAxis tickFormatter={(v) => `$${(v as number).toLocaleString()}`} tick={{ fill: "#9CA3AF" }} />
                      <CartesianGrid stroke="#ffffff08" strokeDasharray="3 6" />
                      <Tooltip
                        contentStyle={{ background: "#0f1720", border: "1px solid rgba(255,255,255,0.06)" }}
                        formatter={(val: any) => `$${Number(val).toLocaleString()}`}
                      />
                      <Line type="monotone" dataKey="equity" stroke="#2979ff" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="dd" stroke="#ff7043" strokeWidth={1.5} strokeDasharray="4 4" dot={{ r: 2 }} />
                      <Legend wrapperStyle={{ color: "#cbd5e1" }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* quick stats */}
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Current Equity</p>
                    <p className="font-semibold">${metrics[metrics.length - 1].equity.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Peak Balance</p>
                    <p className="font-semibold">${Math.max(...metrics.map((m) => m.balance)).toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Current DD</p>
                    <p className="font-semibold text-red-400">{metrics[metrics.length - 1].dd}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Bottom nav */}
      <footer className="fixed left-0 right-0 bottom-0 pointer-events-none">
        <div className="max-w-5xl mx-auto px-6 pb-4 pointer-events-auto">
          <BottomNav />
        </div>
      </footer>
    </div>
  );
};

/* -------------------------
   Action tile component
   ------------------------- */
const ActionTile = ({ to, label, emoji }: { to: string; label: string; emoji: string }) => {
  return (
    <Link
      to={to}
      className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white/3 border border-white/6 backdrop-blur-sm hover:scale-105 transition transform"
      aria-label={label}
    >
      <div className="text-2xl">{emoji}</div>
      <div className="text-sm font-medium">{label}</div>
    </Link>
  );
};

export default Home;