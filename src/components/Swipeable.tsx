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

  // 🔥 More sensitive interaction
  const x = useTransform(rawX, (latest) => {
    if (latest > 0) return latest * 0.8; // softer right swipe
    if (latest < -100) {
      const beyond = latest + 100;
      return -100 + beyond * 0.9; // smoother resistance
    }
    return latest * 1.8; // amplify sensitivity for left swipe
  });

  // subtle lift & shadow
  const scale = useTransform(x, [-160, 0], [1.03, 1]);
  const shadow = useTransform(
    x,
    [-160, 0],
    [
      "0px 14px 28px rgba(0,0,0,0.28)",
      "0px 6px 12px rgba(0,0,0,0.18)",
    ]
  );

  const bgColor = useTransform(
    x,
    [-160, -30],
    ["rgba(190,0,0,0.95)", "rgba(220,0,0,0.55)"],
    { clamp: true }
  );

  const binScale = useTransform(x, [-160, -40, 0], [1.3, 0.9, 0.6], {
    clamp: true,
  });
  const binOpacity = useTransform(x, [-160, -40, 0], [1, 0.85, 0], {
    clamp: true,
  });

  const handleRemove = () => {
    if (navigator.vibrate) navigator.vibrate(50);
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
        dragElastic={0.3} // 🔥 more bouncy feel
        style={{ x: rawX, scale, boxShadow: shadow, borderRadius: "1rem" }}
        whileDrag={{ cursor: "grabbing" }}
        onDragEnd={(_, info) => {
          const width = ref.current?.offsetWidth || 300;
          const threshold = -width * 0.18; // 🔥 easier to trigger delete
          const velocity = info.velocity.x;

          if (x.get() <= threshold || velocity < -500) {
            // commit remove
            animate(rawX, -width * 1.2, {
              type: "tween",
              duration: 0.25,
              ease: "easeOut",
              onComplete: handleRemove,
            });
          } else {
            // reset to original
            animate(rawX, 0, {
              type: "spring",
              stiffness: 280,
              damping: 26,
            });
          }
        }}
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{
          opacity: 0,
          x: -220,
          scale: 0.95,
          transition: { duration: 0.25, ease: "easeOut" },
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 28,
        }}
        className="relative z-10 cursor-pointer select-none bg-[#1a1a1a] text-white"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SwipeableNotification;