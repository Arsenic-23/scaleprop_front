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

  // Ultra-smooth iOS-like sensitivity
  const x = useTransform(rawX, (latest) => {
    if (latest > 0) return latest * 0.35; // very soft right swipe
    if (latest < -120) {
      const beyond = latest + 120;
      return -120 + beyond * 0.75; // strong resistance feel
    }
    return latest * 2; // amplify small drags
  });

  // Gentle scaling + shadow
  const scale = useTransform(x, [-140, 0], [1.025, 1]);
  const shadow = useTransform(
    x,
    [-140, 0],
    [
      "0px 16px 32px rgba(0,0,0,0.32)",
      "0px 6px 12px rgba(0,0,0,0.18)",
    ]
  );

  // Background bin styling
  const bgColor = useTransform(
    x,
    [-140, -25],
    ["rgba(200,0,0,0.95)", "rgba(220,0,0,0.5)"],
    { clamp: true }
  );

  const binScale = useTransform(x, [-140, -25, 0], [1.35, 1, 0.6], {
    clamp: true,
  });
  const binOpacity = useTransform(x, [-140, -25, 0], [1, 0.85, 0], {
    clamp: true,
  });

  const handleRemove = () => {
    if (navigator.vibrate) navigator.vibrate(40);
    onRemove(id);
  };

  return (
    <div className="relative w-full">
      {/* Background Bin */}
      <motion.div
        className="absolute inset-0 flex items-center justify-end pr-6 rounded-2xl"
        style={{ backgroundColor: bgColor as any }}
      >
        <motion.div
          style={{ scale: binScale, opacity: binOpacity }}
          className="text-red-500/90"
        >
          <Trash2 size={28} />
        </motion.div>
      </motion.div>

      {/* Foreground Notification */}
      <motion.div
        ref={ref}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.35}
        style={{ x: rawX, scale, boxShadow: shadow, borderRadius: "1rem" }}
        whileDrag={{ cursor: "grabbing" }}
        onDragEnd={(_, info) => {
          const width = ref.current?.offsetWidth || 320;
          const threshold = -width * 0.15; // easier to trigger dismiss
          const velocity = info.velocity.x;

          if (x.get() <= threshold || velocity < -400) {
            // swipe to remove
            animate(rawX, -width, {
              type: "tween",
              duration: 0.23,
              ease: "easeOut",
              onComplete: handleRemove,
            });
          } else {
            // reset back
            animate(rawX, 0, {
              type: "spring",
              stiffness: 180, // softer spring
              damping: 24,    // smoother stop
            });
          }
        }}
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{
          opacity: 0,
          x: -240,
          scale: 0.95,
          transition: { duration: 0.23, ease: "easeOut" },
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 25,
        }}
        className="relative z-10 cursor-pointer select-none bg-[#1a1a1a] text-white"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SwipeableNotification;