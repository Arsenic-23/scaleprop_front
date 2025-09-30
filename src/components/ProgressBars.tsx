import React from "react";
import { motion, useAnimation, useEffect } from "framer-motion";

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
      return "bg-yellow-500";
    case "red":
      return "bg-red-500";
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
  const controls = useAnimation();
  const fillColorClass = htmlColorClassFor(color);

  const currentFillPercentage = Math.min(100, (value / max) * 100);

  useEffect(() => {
    controls.start({ width: `${currentFillPercentage}%` });
  }, [currentFillPercentage, controls]);

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm font-medium text-text-secondary-dark">
        <span>{label}</span>
        <span>{totalLabel}</span>
      </div>

      {/* Capsule bar */}
      <div className="mt-2 relative flex gap-[2px] h-[12px] bg-slate-700 rounded-[2px] overflow-hidden">
        {/* Filled portion */}
        <motion.div
          initial={{ width: 0 }}
          animate={controls}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={`absolute top-0 left-0 h-full ${fillColorClass}`}
        />
        {/* Capsules overlay */}
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className="flex-1 h-full rounded-[1px] pointer-events-none"
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