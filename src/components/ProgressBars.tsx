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
      return "bg-emerald-500";
  }
};

const formatPct = (v: number) => {
  const s = v.toFixed(1);
  return s.endsWith(".0") ? s.replace(".0", "") : s;
};

/**
 * Evenly sized chopped capsule progress bar
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

      {/* chopped capsules */}
      <div className="mt-3 flex gap-[2px]">
        {Array.from({ length: segments }).map((_, i) => {
          const isActive = i < activeCount;
          return (
            <div
              key={i}
              className={`h-3 w-3 rounded-sm flex-shrink-0 ${
                isActive ? activeColor : "bg-slate-700/60"
              }`}
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
    </div>
  );
};

export default ProgressBarsGroup;