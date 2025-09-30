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

const htmlColorClassFor = (c: HtmlColorKey) => {
  switch (c) {
    case "green":
      return "bg-green-500"; // Tailwind default green
    case "amber":
      return "bg-yellow-500"; // Tailwind amber
    case "red":
      return "bg-red-500"; // Tailwind red
    default:
      return "bg-slate-700";
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

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm font-medium text-text-secondary-dark">
        <span>{label}</span>
        <span>{totalLabel}</span>
      </div>

      <div className="mt-2 flex gap-[2px] h-[12px]">
        {Array.from({ length: segments }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{
              opacity: 1,
              scaleY: i < filledSegments ? 1 : 0,
            }}
            transition={{
              delay: i * 0.02,
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            className={`flex-grow h-full rounded-[1px] origin-bottom ${
              i < filledSegments ? fillColorClass : "bg-slate-700"
            }`}
          />
        ))}
      </div>

      <div className="mt-2 flex justify-between text-xs text-text-secondary-dark">
        <span>{usedLabel}</span>
        <span>{formatPct(value, max)}%</span>
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
    <div className="space-y-6">
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