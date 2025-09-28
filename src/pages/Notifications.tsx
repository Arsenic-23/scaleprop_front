import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Trash2 } from "lucide-react";

interface SwipeableNotificationProps {
  id: number;
  children: React.ReactNode;
  onRemove: (id: number) => void;
}

const SwipeableNotification: React.FC<SwipeableNotificationProps> = ({
  id,
  children,
  onRemove,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const rawX = useMotionValue(0);

  // Smooth, dynamic sensitivity:
  // small drags are amplified; amplification decays as drag grows.
  const x = useTransform(rawX, (latest) => {
    const w = ref.current?.offsetWidth ?? 320;
    const maxRange = Math.max(140, w * 0.6); // range where gain falls to min
    const abs = Math.abs(latest);
    const t = Math.min(abs / maxRange, 1); // 0..1
    const maxGain = 1.9; // for near-zero drags
    const minGain = 0.5; // for very large drags
    const gain = maxGain + (minGain - maxGain) * t; // interpolate
    if (latest >= 0) return latest * 0.25; // keep right-swipe heavy
    const transformed = -Math.min(abs * gain, maxRange + 80); // cap magnitude
    return transformed;
  });

  // visuals (scale, shadow) driven by transformed x
  const scale = useTransform(x, [-300, 0], [1.03, 1]);
  const shadow = useTransform(
    x,
    [-300, 0],
    [
      "0px 18px 40px rgba(0,0,0,0.35)",
      "0px 6px 14px rgba(0,0,0,0.12)",
    ]
  );

  // dynamic threshold (visual) based on current width
  const visualThreshold = () => {
    const w = ref.current?.offsetWidth ?? 320;
    return -w * 0.32;
  };

  // background opacity (blackish red) that fades in as you approach threshold
  const bgOpacity = useTransform(x, (latest) => {
    const threshold = visualThreshold();
    const start = threshold * 0.45; // begin showing near half the threshold
    if (latest >= start) return 0;
    if (latest <= threshold) return 1;
    // linear map from start..threshold -> 0..1
    return (start - latest) / (start - threshold);
  });

  // bin icon scale + opacity depending on progress toward threshold
  const binScale = useTransform(x, (latest) => {
    const threshold = visualThreshold();
    const progress = Math.min(Math.max((threshold - latest) / Math.abs(threshold), 0), 1);
    // subtle baseline, grows up to a small pop
    return 0.85 + progress * 0.65; // 0.85 -> 1.5
  });
  const binOpacity = useTransform(x, (latest) => {
    const threshold = visualThreshold();
    const progress = Math.min(Math.max((threshold - latest) / Math.abs(threshold), 0), 1);
    return 0.25 + progress * 0.85; // 0.25 -> 1.1 (clamped by CSS)
  });

  const handleRemove = () => {
    if (navigator.vibrate) navigator.vibrate(50);
    onRemove(id);
  };

  return (
    <div className="relative w-full">
      {/* background layer */}
      <motion.div
        className="absolute inset-0 flex items-center justify-start pl-5 rounded-xl pointer-events-none"
        style={{
          backgroundColor: "rgba(40,10,10,0.6)", // blackish dark-red
          opacity: bgOpacity,
          willChange: "opacity, transform",
        }}
        aria-hidden
      >
        <motion.div
          style={{ scale: binScale, opacity: binOpacity }}
          className="flex items-center justify-center text-red-300"
        >
          <Trash2 size={20} />
        </motion.div>
      </motion.div>

      {/* foreground card */}
      <motion.div
        ref={ref}
        className="relative z-10 cursor-grab select-none bg-[#111111] text-white rounded-xl overflow-hidden"
        drag="x"
        dragElastic={0.15}
        dragConstraints={{ left: 0, right: 0 }}
        style={{
          x,
          scale,
          boxShadow: shadow,
          borderRadius: 12,
          willChange: "transform, box-shadow",
        }}
        whileDrag={{ cursor: "grabbing" }}
        onDragEnd={() => {
          const w = ref.current?.offsetWidth ?? 320;
          const vThreshold = -w * 0.32; // visual threshold (px)
          // compare transformed x (visual) to visual threshold
          if (x.get() <= vThreshold) {
            // slide out visually then remove
            animate(rawX, -w * 1.08, {
              type: "spring",
              stiffness: 320,
              damping: 28,
              onComplete: handleRemove,
            });
          } else {
            // spring back
            animate(rawX, 0, {
              type: "spring",
              stiffness: 380,
              damping: 32,
            });
          }
        }}
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{
          opacity: 0,
          x: -200,
          scale: 0.96,
          transition: { duration: 0.22, ease: "easeOut" },
        }}
        transition={{ type: "spring", stiffness: 360, damping: 30 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SwipeableNotification;