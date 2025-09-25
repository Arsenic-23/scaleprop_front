import React from "react";

type ColorKey = "emerald" | "amber" | "rose";

interface SegmentedCapsuleBarProps {
  label: string;
  value: number; // current used value
  max: number; // total / cap
  color?: ColorKey;
  segments?: number;
  prefix?: string;
  showUsedSuffix?: boolean;
}

/**
 * Small utility: maps a color key to a subtle vertical gradient that reads well
 * at small capsule sizes.
 */
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
 * Segmented capsule bar component.
 *
 * Visual details matched:
 * - thin capsule blocks (rounded-full)
 * - very small gap between blocks (gap-0.5)
 * - subtle vertical gradient on active blocks
 * - darker bluish/gray inactive blocks
 * - top row: label (left) and total (right)
 * - bottom row: used (left) and percentage (right)
 */
export const SegmentedCapsuleBar: React.FC<SegmentedCapsuleBarProps> = ({
  label,
  value,
  max,
  color = "emerald",
  segments = 32,
  prefix = "$",
  showUsedSuffix = false,
}) => {
  const pctRaw = Math.min(100, (max <= 0 ? 0 : (value / max) * 100));
  const pct = pctRaw;
  const activeCount = Math.max(
    0,
    Math.min(segments, Math.round((pct / 100) * segments))
  );

  // visual sizes tuned to match screenshot: narrow height, short width -> capsule look
  // w-2.5 = 10px, h-2.5 = 10px, gap-0.5 small space
  const activeGradient = gradientClassFor(color);

  return (
    <div
      className="rounded-2xl p-4"
      style={{
        // subtle blending background like your screenshot
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))",
        border: "1px solid rgba(255,255,255,0.03)",
        WebkitBackdropFilter: "blur(6px)",
        backdropFilter: "blur(6px)",
      }}
    >
      {/* top: label left, total right */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-300">{label}</div>
        <div className="text-base font-semibold text-gray-200">
          {prefix}
          {max.toLocaleString()}
        </div>
      </div>

      {/* segmented capsules */}
      <div className="mt-3">
        <div className="w-full overflow-hidden">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: segments }).map((_, i) => {
              const isActive = i < activeCount;
              return (
                <div
                  key={i}
                  aria-hidden
                  className={`w-2.5 h-2.5 rounded-full flex-shrink-0
                    ${isActive ? `bg-gradient-to-b ${activeGradient}` : "bg-slate-700/60"}
                    ${isActive ? "shadow-[0_1px_0_rgba(0,0,0,0.25)]" : "opacity-90"}
                  `}
                  style={{
                    // subtle inner highlight for active capsules
                    boxShadow: isActive
                      ? "inset 0 -6px 6px rgba(255,255,255,0.02), 0 1px 0 rgba(0,0,0,0.25)"
                      : undefined,
                    border: isActive ? "1px solid rgba(255,255,255,0.02)" : "1px solid rgba(0,0,0,0.12)",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* bottom: used left, percent right */}
      <div className="flex items-center justify-between mt-3">
        <div className="text-xs text-gray-400">
          {prefix}
          {value.toLocaleString()}
          {showUsedSuffix ? " Used" : ""}
        </div>
        <div className="text-sm font-medium text-gray-300">
          {formatPct(pct)}%
        </div>
      </div>
    </div>
  );
};

/**
 * Group wrapper matching your dashboard layout.
 * Use values exactly like your screenshot:
 * - Profit Target: value=5000 max=8000 (62.5%)
 * - Max Daily Drawdown: value=1000 max=5000 (20%)
 * - Max Total Drawdown: value=3000 max=10000 (30%)
 */
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
      <h3 className="text-sm font-semibold text-gray-200 mb-3">Progress Overview</h3>

      <div className="space-y-4">
        <SegmentedCapsuleBar
          label="Profit Target"
          value={target}
          max={targetMax}
          color="emerald"
          segments={40}
        />

        <SegmentedCapsuleBar
          label="Max Daily Drawdown"
          value={dailyDd}
          max={dailyDdMax}
          color="amber"
          segments={40}
          showUsedSuffix
        />

        <SegmentedCapsuleBar
          label="Max Total Drawdown"
          value={totalDd}
          max={totalDdMax}
          color="rose"
          segments={40}
          showUsedSuffix
        />
      </div>
    </div>
  );
};

export default ProgressBarsGroup;