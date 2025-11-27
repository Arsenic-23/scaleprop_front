import React from "react";
import { motion } from "framer-motion";

type HtmlColorKey = "green" | "amber" | "red";

interface LinearCapsuleBarProps {
  label: string;
  value: number;
  max: number;
  usedLabel?: string;
  totalLabel?: string;
  color: HtmlColorKey;
  segments?: number;
}

const colorMap: Record<HtmlColorKey, string> = {
  green: "from-green-400 to-green-600",
  amber: "from-amber-400 to-amber-600",
  red: "from-red-400 to-red-600",
};

const htmlColorClassFor = (c: HtmlColorKey) => {
  switch (c) {
    case "green":
      return "bg-green-500";
    case "amber":
      return "bg-amber-500";
    case "red":
      return "bg-red-500";
    default:
      return "bg-slate-500";
  }
};

const formatPct = (value: number, max: number) => {
  const pct = (value / max) * 100;
  return pct % 1 === 0 ? pct.toFixed(0) : pct.toFixed(1);
};

const LinearCapsuleBar: React.FC<LinearCapsuleBarProps> = ({
  label,
  value,
  max,
  usedLabel,
  totalLabel,
  color,
  segments = 40,
}) => {
  const currentFillPercentage = Math.min(100, (value / max) * 100);
  const filledSegments = Math.round((currentFillPercentage / 100) * segments);
  const fillColorClass = htmlColorClassFor(color);
  const gradientColors = colorMap[color];

  return (
    <div className="w-full">
      {/* Top labels */}
      <div className="flex justify-between text-[0.85rem] font-medium text-gray-300 tracking-wide">
        <span className="capitalize">{label}</span>
        <span className="text-gray-400">{totalLabel}</span>
      </div>

      {/* Capsule bar */}
      <div className="mt-2 flex gap-[4px] h-[16px] sm:h-[18px]">
        {Array.from({ length: segments }).map((_, i) => {
          const isFilled = i < filledSegments;
          return (
            <motion.div
              key={i}
              initial={{ scaleY: 0.5, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{
                delay: i * 0.01,
                type: "spring",
                stiffness: 120,
                damping: 14,
              }}
              whileHover={{
                scaleY: 1.2,
                transition: { duration: 0.15 },
              }}
              className={`flex-1 rounded-full transition-all duration-700 ${
                isFilled
                  ? `bg-gradient-to-b ${gradientColors} shadow-[0_0_6px_rgba(0,0,0,0.5)]`
                  : "bg-slate-800"
              }`}
            />
          );
        })}
      </div>

      {/* Bottom labels */}
      <div className="mt-2 flex justify-between text-[0.75rem] text-gray-500 tracking-wide">
        <span>{usedLabel}</span>
        <span className="text-gray-300">{formatPct(value, max)}%</span>
      </div>
    </div>
  );
};

interface ProgressBarsGroupProps {
  profitTargetValue: number;
  profitTargetMax: number;
  dailyDrawdownValue: number;
  dailyDrawdownMax: number;
  totalDrawdownValue: number;
  totalDrawdownMax: number;
}

export const ProgressBarsGroup: React.FC<ProgressBarsGroupProps> = ({
  profitTargetValue,
  profitTargetMax,
  dailyDrawdownValue,
  dailyDrawdownMax,
  totalDrawdownValue,
  totalDrawdownMax,
}) => {
  return (
    <div className="space-y-8 w-full">
      <LinearCapsuleBar
        label="profit target"
        value={profitTargetValue}
        max={profitTargetMax}
        usedLabel={`$${profitTargetValue.toLocaleString()}`}
        totalLabel={`$${profitTargetMax.toLocaleString()}`}
        color="green"
      />

      <LinearCapsuleBar
        label="max daily drawdown"
        value={dailyDrawdownValue}
        max={dailyDrawdownMax}
        usedLabel={`$${dailyDrawdownValue.toLocaleString()} used`}
        totalLabel={`$${dailyDrawdownMax.toLocaleString()}`}
        color="amber"
      />

      <LinearCapsuleBar
        label="max total drawdown"
        value={totalDrawdownValue}
        max={totalDrawdownMax}
        usedLabel={`$${totalDrawdownValue.toLocaleString()} used`}
        totalLabel={`$${totalDrawdownMax.toLocaleString()}`}
        color="red"
      />
    </div>
  );
};

export const ResponsiveProgressView = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0f1116]">
      <div className="w-full max-w-lg px-5 sm:px-6 md:px-10 scale-[0.98] md:scale-100">
        <ProgressBarsGroup
          profitTargetValue={8000}
          profitTargetMax={10000}
          dailyDrawdownValue={3000}
          dailyDrawdownMax={5000}
          totalDrawdownValue={6000}
          totalDrawdownMax={10000}
        />
      </div>
    </div>
  );
};
