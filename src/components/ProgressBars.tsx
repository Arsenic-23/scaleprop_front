import React from "react";

type ColorKey = "emerald" | "amber" | "rose";

interface LinearCapsuleBarProps {
  label: string;
  value: number;
  max: number;
  usedLabel?: string;
  totalLabel?: string;
  color: ColorKey;
  segments?: number;
}

const colorClassFor = (c: ColorKey) => {
  switch (c) {
    case "emerald":
      return "bg-emerald-500";
    case "amber":
      return "bg-amber-500";
    case "rose":
      return "bg-rose-500";
    default:
      return "bg-rose-500";
  }
};

const formatPct = (v: number) => {
  const s = v.toFixed(1);
  return s.endsWith(".0") ? s.replace(".0", "") : s;
};

/**
 * Rectangular thin capsule progress bar
 */
const LinearCapsuleBar: React.FC<LinearCapsuleBarProps> = ({
  label,
  value,
  max,
  usedLabel,
  totalLabel,
  color,
  segments = 30,
}) => {
  const pct = Math.min(100, (value / max) * 100);
  const activeCount = Math.round((pct / 100) * segments);
  const activeColor = colorClassFor(color);

  return (
    <div className="w-full">
      {/* top: label and total */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-400">{label}</span>
        <span className="text-base font-semibold text-gray-300">{totalLabel}</span>
      </div>

      {/* outer rectangular frame */}
      <div className="w-full h-[14px] bg-gray-700/30 flex gap-[2px] overflow-hidden rounded-md">
        {Array.from({ length: segments }).map((_, i) => {
          const isActive = i < activeCount;
          return (
            <div
              key={i}
              className={`flex-1 h-full ${isActive ? activeColor : "bg-gray-600/40"}`}
            />
          );
        })}
      </div>

      {/* bottom: used + percentage */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-gray-400">{usedLabel}</span>
        <span className="text-sm font-medium text-gray-300">{formatPct(pct)}%</span>
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
    <div className="rounded-lg p-4 bg-[#2A2A2A] border border-gray-600/50 space-y-5">
      <h3 className="text-sm font-semibold text-gray-300 mb-2">
        Progress Overview
      </h3>

      <LinearCapsuleBar
        label="Profit Target"
        value={target}
        max={targetMax}
        usedLabel={`$${target.toLocaleString()}`}
        totalLabel={`$${targetMax.toLocaleString()}`}
        color="emerald"
        segments={32}
      />

      <LinearCapsuleBar
        label="Max Daily Drawdown"
        value={dailyDd}
        max={dailyDdMax}
        usedLabel={`$${dailyDd.toLocaleString()} Used`}
        totalLabel={`$${dailyDdMax.toLocaleString()}`}
        color="amber"
        segments={32}
      />

      <LinearCapsuleBar
        label="Max Total Drawdown"
        value={totalDd}
        max={totalDdMax}
        usedLabel={`$${totalDd.toLocaleString()} Used`}
        totalLabel={`$${totalDdMax.toLocaleString()}`}
        color="rose"
        segments={32}
      />
    </div>
  );
};

export default ProgressBarsGroup;