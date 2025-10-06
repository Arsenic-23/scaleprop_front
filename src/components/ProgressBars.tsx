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

  return (
    <div className="w-full">
      {/* Top labels */}
      <div className="flex justify-between text-sm font-medium text-gray-500">
        <span className="capitalize">{label}</span>
        <span>{totalLabel}</span>
      </div>

      {/* Capsule bar (rigid + responsive) */}
      <div
        className="mt-2 flex flex-wrap justify-between h-[14px]"
        style={{ gap: "3px" }}
      >
        {Array.from({ length: segments }).map((_, i) => {
          const isFilled = i < filledSegments;
          return (
            <motion.div
              key={i}
              initial={{ scaleY: 0.6, opacity: 0.3 }}
              animate={{
                scaleY: 1,
                opacity: 1,
              }}
              transition={{
                delay: i * 0.012,
                type: "spring",
                stiffness: 120,
                damping: 18,
              }}
              className={`rounded-full transition-colors duration-700 ${
                isFilled ? fillColorClass : "bg-slate-700"
              }`}
              style={{
                width: `${100 / segments - 0.5}%`, // even spacing
                minWidth: "6px",
                maxWidth: "16px",
                flex: "0 0 auto", // prevent flex resizing
              }}
            />
          );
        })}
      </div>

      {/* Bottom labels */}
      <div className="mt-2 flex justify-between text-xs text-gray-500">
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
    <div
      className="
        mx-auto space-y-6 
        w-[320px] sm:w-[480px] md:w-[640px]
      "
    >
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