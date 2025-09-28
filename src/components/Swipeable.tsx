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
  const rawX = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);

  // Sensitivity: amplify small drags, add resistance after limit
  const x = useTransform(rawX, (latest) => {
    if (latest > 0) return latest * 0.4; // right swipe heavy
    if (latest < -80) {
      const beyond = latest + 80;
      return -80 + beyond * 0.5; // resistance past 80px
    }
    return latest * 1.2; // amplify sensitivity for small drags
  });

  // Card visual feedback
  const scale = useTransform(x, [-150, 0], [1.03, 1]);
  const shadow = useTransform(
    x,
    [-150, 0],
    [
      "0px 10px 24px rgba(0,0,0,0.25)",
      "0px 4px 10px rgba(0,0,0,0.15)",
    ]
  );

  // Background color intensity (dark red when near threshold)
  const bgOpacity = useTransform(x, [-150, -50], [1, 0], { clamp: true });

  // Bin icon scale (grows as swipe progresses)
  const binScale = useTransform(x, [-150, -50], [1.2, 0.5], { clamp: true });
  const binOpacity = useTransform(x, [-150, -50], [1, 0], { clamp: true });

  const handleRemove = () => {
    if (navigator.vibrate) navigator.vibrate(60);
    onRemove(id);
  };

  return (
    <div className="relative w-full">
      {/* Background layer */}
      <motion.div
        className="absolute inset-0 flex items-center justify-start pl-6 rounded-2xl"
        style={{
          backgroundColor: "rgba(139,0,0,0.45)", // dark red, subtle
          opacity: bgOpacity,
        }}
      >
        <motion.div
          style={{ scale: binScale, opacity: binOpacity }}
          className="text-red-500/80"
        >
          <Trash2 size={28} />
        </motion.div>
      </motion.div>

      {/* Foreground card */}
      <motion.div
        ref={ref}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.3}
        style={{ x: rawX, scale, boxShadow: shadow, borderRadius: "1rem" }}
        whileDrag={{ cursor: "grabbing" }}
        onDragEnd={() => {
          const width = ref.current?.offsetWidth || 300;
          const threshold = -width * 0.3; // 30% of width

          if (x.get() <= threshold) {
            handleRemove();
          } else {
            animate(rawX, 0, {
              type: "spring",
              stiffness: 300,
              damping: 28,
            });
          }
        }}
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{
          opacity: 0,
          x: -200,
          scale: 0.95,
          transition: { duration: 0.25, ease: "easeOut" },
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 30,
        }}
        className="relative z-10 cursor-pointer select-none bg-[#1a1a1a] text-white"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SwipeableNotification;