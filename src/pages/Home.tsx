import React, { useMemo, useState } from "react";
import BottomNav from "../components/BottomNav";
import ProgressBar from "../components/ProgressBar";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

/* -------------------------
   Types & mock data
   ------------------------- */
type Point = { date: string; equity: number };

const useMockData = () =>
  useMemo<Point[]>(
    () => [
      { date: "Jan '24", equity: 100000 },
      { date: "Apr '24", equity: 101500 },
      { date: "Jul '24", equity: 103000 },
      { date: "Oct '24", equity: 105000 },
    ],
    []
  );

/* -------------------------
   Challenge card component
   ------------------------- */
const ChallengeCard = ({
  title,
  desc,
  price,
}: {
  title: string;
  desc: string;
  price: number;
}) => (
  <div className="rounded-2xl p-5 bg-gradient-to-tr from-white/5 to-white/2 border border-white/10 shadow-md flex flex-col justify-between">
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-400 mt-1">{desc}</p>
    </div>
    <div className="mt-4 flex items-center justify-between">
      <span className="text-green-400 font-semibold">${price}</span>
      <button className="px-4 py-1.5 bg-white/10 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/20">
        Buy
      </button>
    </div>
  </div>
);

/* -------------------------
   Main Home page
   ------------------------- */
const Home: React.FC = () => {
  const [equity] = useState(105000);
  const [profit] = useState(5000);
  const data = useMockData();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="px-5 py-4 flex items-center justify-between border-b border-white/10">
        <h1 className="text-lg font-bold">PropFirm</h1>
        <button className="text-gray-300">
          <span className="material-icons">notifications</span>
        </button>
      </header>

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto px-5 py-6 space-y-8">
        {/* Performance overview */}
        <section className="rounded-2xl p-5 bg-gradient-to-tr from-white/5 to-white/2 border border-white/10 shadow-lg">
          <h2 className="font-semibold mb-2">Performance Overview</h2>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-bold">${equity.toLocaleString()}</p>
            <span className="text-green-400 font-medium">+${profit}</span>
          </div>

          {/* Chart */}
          <div className="mt-4 h-40">
            <ResponsiveContainer>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="equity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fill: "#9CA3AF" }} />
                <YAxis
                  tickFormatter={(v) => `$${v / 1000}k`}
                  tick={{ fill: "#9CA3AF" }}
                />
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  formatter={(v: any) => `$${v.toLocaleString()}`}
                />
                <Area
                  type="monotone"
                  dataKey="equity"
                  stroke="#22c55e"
                  fillOpacity={1}
                  fill="url(#equity)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Progress bars */}
          <div className="mt-5 space-y-3">
            <ProgressBar
              label="Profit Target"
              used={5000}
              total={8000}
              color="#22c55e"
            />
            <ProgressBar
              label="Max Daily Drawdown"
              used={1000}
              total={5000}
              color="#facc15"
            />
            <ProgressBar
              label="Max Total Drawdown"
              used={3000}
              total={10000}
              color="#ef4444"
            />
          </div>
        </section>

        {/* Challenges */}
        <section>
          <h2 className="font-semibold mb-3">Trading Challenges</h2>
          <div className="flex gap-4 overflow-x-auto snap-x pb-2">
            <div className="snap-center w-72 shrink-0">
              <ChallengeCard
                title="Standard Challenge"
                desc="Prove your trading skills and get funded up to $200k."
                price={159}
              />
            </div>
            <div className="snap-center w-72 shrink-0">
              <ChallengeCard
                title="Advanced Challenge"
                desc="For seasoned professionals aiming for higher capital."
                price={299}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Bottom nav */}
      <footer className="border-t border-white/10">
        <BottomNav />
      </footer>
    </div>
  );
};

export default Home;