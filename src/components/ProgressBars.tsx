import React from "react";

interface ProgressBarProps {
  label: string;
  value: number;
  max: number;
  color?: string;
  prefix?: string;
}

/**
 * Reusable ProgressBar component
 */
const ProgressBar: React.FC<ProgressBarProps> = ({ label, value, max, color = "bg-green-500", prefix = "$" }) => {
  const percentage = Math.min(100, (value / max) * 100);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs text-gray-300">
        <span>{label}</span>
        <span className="font-semibold">
          {prefix}
          {value.toLocaleString()} / {prefix}
          {max.toLocaleString()}
        </span>
      </div>
      <div className="w-full h-3 bg-white/10 rounded-lg overflow-hidden">
        <div
          className={`h-3 rounded-lg transition-all duration-500 ${color}`}
          style={{ width: `${percentage}%` }}
        />
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

/**
 * Group of progress bars for the dashboard
 */
export const ProgressBarsGroup: React.FC<ProgressBarsGroupProps> = ({
  target,
  targetMax,
  dailyDd,
  dailyDdMax,
  totalDd,
  totalDdMax,
}) => {
  return (
    <div className="rounded-2xl p-5 bg-gradient-to-tr from-white/3 to-white/2 border border-white/6 backdrop-blur-md shadow-xl space-y-4">
      <h3 className="text-sm font-semibold text-gray-200 mb-2">Progress Overview</h3>
      <ProgressBar label="Profit Target" value={target} max={targetMax} color="bg-emerald-500" />
      <ProgressBar label="Max Daily Drawdown" value={dailyDd} max={dailyDdMax} color="bg-orange-500" />
      <ProgressBar label="Max Total Drawdown" value={totalDd} max={totalDdMax} color="bg-red-500" />
    </div>
  );
};