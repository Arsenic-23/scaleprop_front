import React from "react";

interface SegmentedBarProps {
  label: string;
  value: number;
  max: number;
  usedLabel?: string; // e.g. "$5,000" or "$1,000 Used"
  totalLabel?: string; // e.g. "$8,000" or "$5,000"
  color: string; // active color
  inactiveColor?: string; // default inactive
  segments?: number; // number of blocks
  showPercentage?: boolean;
}

const SegmentedBar: React.FC<SegmentedBarProps> = ({
  label,
  value,
  max,
  usedLabel,
  totalLabel,
  color,
  inactiveColor = "bg-gray-700",
  segments = 32,
  showPercentage = true,
}) => {
  const percentage = Math.min(100, (value / max) * 100);
  const activeBlocks = Math.round((percentage / 100) * segments);

  return (
    <div className="space-y-1">
      {/* Top row: label and total */}
      <div className="flex items-center justify-between text-sm text-gray-200">
        <span>{label}</span>
        <span className="font-semibold">{totalLabel}</span>
      </div>

      {/* Bar */}
      <div className="flex gap-1">
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={`h-3 flex-1 rounded-sm ${
              i < activeBlocks ? color : inactiveColor
            }`}
          />
        ))}
      </div>

      {/* Bottom row: used + percentage */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>{usedLabel}</span>
        {showPercentage && (
          <span>{percentage.toFixed(1).replace(".0", "")}%</span>
        )}
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
    <div className="rounded-2xl p-5 bg-gradient-to-tr from-white/5 to-white/10 border border-white/10 backdrop-blur-md shadow-xl space-y-5">
      <SegmentedBar
        label="Profit Target"
        value={target}
        max={targetMax}
        usedLabel={`$${target.toLocaleString()}`}
        totalLabel={`$${targetMax.toLocaleString()}`}
        color="bg-green-500"
      />
      <SegmentedBar
        label="Max Daily Drawdown"
        value={dailyDd}
        max={dailyDdMax}
        usedLabel={`$${dailyDd.toLocaleString()} Used`}
        totalLabel={`$${dailyDdMax.toLocaleString()}`}
        color="bg-yellow-500"
      />
      <SegmentedBar
        label="Max Total Drawdown"
        value={totalDd}
        max={totalDdMax}
        usedLabel={`$${totalDd.toLocaleString()} Used`}
        totalLabel={`$${totalDdMax.toLocaleString()}`}
        color="bg-red-500"
      />
    </div>
  );
};