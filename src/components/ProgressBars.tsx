import React from "react";

type ColorKey = "emerald" | "amber" | "rose";

interface LinearChoppedBarProps {
  label: string;
  value: number;
  max: number;
  usedLabel?: string;
  totalLabel?: string;
  color: ColorKey;
  segments?: number;
}

const gradientClassFor = (c: ColorKey) => {
  switch (c) {
    case "emerald":
      return "from-emerald-400 to-emerald-600";
    case "amber":
      return "from-amber-400 to-amber-600";
    case "rose":
      return "from-rose-500 to-rose-700";
    default:
      return "from-emerald-400 to-emerald-600";
  }
};

const formatPct = (v: number) => {
  const s = v.toFixed(1);
  return s.endsWith(".0") ? s.replace(".0", "") : s;
};

/**
 * Alternating thick-thin chopped progress bar
 */
const LinearChoppedBar: React.FC<LinearChoppedBarProps> = ({
  label,
  value,
  max,
  usedLabel,
  totalLabel,
  color,
  segments = 40,
}) => {
  const pct = Math.min(100, (value / max) * 100);
  const activeCount = Math.round((pct / 100) * segments);
  const gradient = gradientClassFor(color);

  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))",
        border: "1px solid rgba(255,255,255,0.05)",
        WebkitBackdropFilter: "blur(6px)",
        backdropFilter: "blur(6px)",
      }}
    >
      {/* top: label and total */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-300">{label}</span>
        <span className="text-base font-semibold text-gray-200">
          {totalLabel}
        </span>
      </div>

      {/* chopped bar */}
      <div className="mt-3 flex gap-[1px]">
        {Array.from({ length: segments }).map((_, i) => {
          const isActive = i < activeCount;
          const isThick = i % 2 === 0; // alternate thick/thin
          return (
            <div
              key={i}
              className={`h-3 rounded-sm flex-shrink-0 ${
                isActive
                  ? `bg-gradient-to-b ${gradient}`
                  : "bg-slate-700/60"
              }`}
              style={{
                width: isThick ? "8px" : "5px", // thick vs thin
                border: isActive
                  ? "1px solid rgba(255,255,255,0.06)"
                  : "1px solid rgba(0,0,0,0.2)",
              }}
            />
          );
        })}
      </div>

      {/* bottom: used + percentage */}
      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-gray-400">{usedLabel}</span>
        <span className="text-sm font-medium text-gray-300">
          {formatPct(pct)}%
        </span>
      </div>
    </div>
  );
};

interface ProgressBarsGroupProps {
  target: number;
  targetMax: number;
  dailyDd: number;
  dailyDdMax: number;
  totalDd: number;
  totalDdMax: number;
}

export const ProgressBarsGroup: React.FC<ProgressBarsGroupProps> = ({
  target,
  targetMax,
  dailyDd,
  dailyDdMax,
  totalDd,
  totalDdMax,
}) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-200 mb-3">
        Progress Overview
      </h3>

      <div className="space-y-5">
        <LinearChoppedBar
          label="Profit Target"
          value={target}
          max={targetMax}
          usedLabel={`$${target.toLocaleString()}`}
          totalLabel={`$${targetMax.toLocaleString()}`}
          color="emerald"
          segments={32}
        />

        <LinearChoppedBar
          label="Max Daily Drawdown"
          value={dailyDd}
          max={dailyDdMax}
          usedLabel={`$${dailyDd.toLocaleString()} Used`}
          totalLabel={`$${dailyDdMax.toLocaleString()}`}
          color="amber"
          segments={32}
        />

        <LinearChoppedBar
          label="Max Total Drawdown"
          value={totalDd}
          max={totalDdMax}
          usedLabel={`$${totalDd.toLocaleString()} Used`}
          totalLabel={`$${totalDdMax.toLocaleString()}`}
          color="rose"
          segments={32}
        />
      </div>
    </div>
  );
};

export default ProgressBarsGroup;