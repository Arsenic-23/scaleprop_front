import React from "react";

interface ProgressBarProps {
  label: string;
  value: number;
  max: number;
  color?: string;
  prefix?: string;
  percentage?: number;
}

/**
 * Reusable ProgressBar component
 */
const ProgressBar: React.FC<ProgressBarProps> = ({ label, value, max, color = "bg-green-500", prefix = "$", percentage }) => {
  const calcPercentage = percentage !== undefined ? percentage : Math.min(100, (value / max) * 100);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm font-medium text-white">
        <span>{label}</span>
        <span className="text-gray-300">
          {prefix}
          {value.toLocaleString()} / {prefix}
          {max.toLocaleString()} <span className="text-white ml-2">{calcPercentage}%</span>
        </span>
      </div>
      <div className="w-full h-6 bg-gray-700 rounded-lg overflow-hidden border border-gray-600">
        <div
          className={`h-full rounded-lg ${color}`}
          style={{ width: `${calcPercentage}%` }}
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
    <div className="rounded-2xl p-5 bg-gray-900 border border-gray-800 space-y-6">
      <h3 className="text-sm font-semibold text-gray-400 mb-4">Progress Overview</h3>
      <ProgressBar label="Profit Target" value={target} max={targetMax} color="bg-green-500" percentage={62.5} />
      <ProgressBar label="Max Daily Drawdown" value={dailyDd} max={dailyDdMax} color="bg-yellow-500" percentage={20} />
      <ProgressBar label="Max Total Drawdown" value={totalDd} max={totalDdMax} color="bg-red-500" percentage={30} />
    </div>
  );
};