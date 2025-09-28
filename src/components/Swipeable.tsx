import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Trash2 } from "lucide-react";

interface SwipeableNotificationProps {
  id: number;
  children: React.ReactNode;
  onRemove: (id: number) => void;
}

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));

const SwipeableNotification: React.FC<SwipeableNotificationProps> = ({
  id,
  children,
  onRemove,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const rawX = useMotionValue(0);

  // Amplified sensitivity mapping.
  // Very small drags are amplified strongly. Amplification decays as drag grows.
  const x = useTransform(rawX, (latest) => {
    const w = ref.current?.offsetWidth ?? 360;
    const abs = Math.abs(latest);
    const maxRange = Math.max(140, w * 0.6);

    // gain: high at zero drag, low at large drag
    const maxGain = 2.6; // stronger amplification for tiny swipes
    const minGain = 0.55;
    const t = clamp(abs / maxRange);
    const gain = maxGain + (minGain - maxGain) * t;

    if (latest >= 0) {
      // keep right swipe heavy and low sensitivity
      return latest * 0.22;
    }

    // apply gain then cap to avoid runaway values
    const transformed = -Math.min(abs * gain, maxRange + 140);
    return transformed;
  });

  // visuals
  const scale = useTransform(x, (v) => {
    const s = clamp((Math.abs(v) / 380), 0, 1);
    return 1 + s * 0.04;
  });

  const shadow = useTransform(x, [-500, 0], [
    "0px 26px 60px rgba(0,0,0,0.45)",
    "0px 6px 14px rgba(0,0,0,0.12)",
  ]);

  // width-based threshold
  const visualThreshold = () => {
    const w = ref.current?.offsetWidth ?? 360;
    return -w * 0.32; // 32% of width
  };

  // background opacity (blackish red) that fades in approaching threshold
  const bgOpacity = useTransform(x, (latest) => {
    const threshold = visualThreshold();
    const start = threshold * 0.5; // begin fade at half the threshold
    if (latest >= start) return 0;
    if (latest <= threshold) return 1;
    return clamp((start - latest) / (start - threshold));
  });

  // bin icon base scale/opacity (driven by progress toward threshold)
  const binBaseScale = useTransform(x, (latest) => {
    const threshold = visualThreshold();
    const start = threshold * 0.5;
    const progress = clamp((start - latest) / (start - threshold));
    return 0.9 + progress * 0.8; // 0.9 -> 1.7
  });

  const binBaseOpacity = useTransform(x, (latest) => {
    const threshold = visualThreshold();
    const start = threshold * 0.5;
    const progress = clamp((start - latest) / (start - threshold));
    return 0.22 + progress * 0.9; // 0.22 -> ~1.12 (CSS clamps)
  });

  // extra transient 'pop' when threshold is crossed
  const pop = useMotionValue(1);
  const combinedBinScale = useTransform([binBaseScale, pop], ([b, p]) => b * p);

  useEffect(() => {
    let triggered = false;
    const unsub = x.onChange((v) => {
      const threshold = visualThreshold();
      if (v <= threshold && !triggered) {
        triggered = true;
        // quick pop
        animate(pop, 1.35, { duration: 0.09 }).then(() =>
          animate(pop, 1, { duration: 0.18 })
        );
      } else if (v > threshold && triggered) {
        triggered = false;
      }
    });
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [x]);

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
          backgroundColor: "rgba(30,8,8,0.64)", // blackish dark-red
          opacity: bgOpacity,
          willChange: "opacity, transform",
        }}
        aria-hidden
      >
        <motion.div
          style={{ scale: combinedBinScale, opacity: binBaseOpacity }}
          className="flex items-center justify-center text-red-300"
        >
          <Trash2 size={22} />
        </motion.div>
      </motion.div>

      {/* foreground card */}
      <motion.div
        ref={ref}
        className="relative z-10 cursor-grab select-none bg-[#0f0f10] text-white rounded-xl overflow-hidden"
        drag="x"
        dragElastic={0.12}
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
          const w = ref.current?.offsetWidth ?? 360;
          const vThreshold = -w * 0.32;
          // use transformed x (visual) for decision
          if (x.get() <= vThreshold) {
            // slide out visually then remove
            animate(rawX, -w * 1.08, {
              type: "spring",
              stiffness: 320,
              damping: 28,
              velocity: -20,
              onComplete: handleRemove,
            });
          } else {
            // spring back
            animate(rawX, 0, {
              type: "spring",
              stiffness: 420,
              damping: 36,
            });
          }
        }}
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{
          opacity: 0,
          x: -220,
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