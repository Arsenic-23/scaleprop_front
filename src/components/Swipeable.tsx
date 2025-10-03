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

  // Perfectly synced drag (1:1 with slight right resistance)
  const x = useTransform(rawX, (latest) => {
    if (latest > 0) return latest * 0.25; // resistance right
    return latest; // synced left swipe
  });

  // Foreground scale + shadow
  const scale = useTransform(x, [-160, 0], [1.02, 1]);
  const shadow = useTransform(
    x,
    [-160, 0],
    [
      "0px 14px 28px rgba(0,0,0,0.32)",
      "0px 6px 12px rgba(0,0,0,0.18)",
    ]
  );

  // Smooth classy background transition
  const bgColor = useTransform(
    x,
    [-160, 0],
    ["rgba(100,0,0,0.95)", "rgba(200,0,0,0.55)"],
    { clamp: true }
  );

  // Bin animations tied directly to rawX
  const binScale = useTransform(rawX, [-160, -60, 0], [1.2, 1, 0.7], {
    clamp: true,
  });
  const binOpacity = useTransform(rawX, [-160, -60, 0], [1, 0.9, 0], {
    clamp: true,
  });
  const binRotate = useTransform(rawX, [-160, -60, 0], [-10, 0, 0], {
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
          style={{
            scale: binScale,
            opacity: binOpacity,
            rotate: binRotate,
          }}
          className="text-red-500"
        >
          <Trash2 size={28} />
        </motion.div>
      </motion.div>

      {/* Foreground Notification */}
      <motion.div
        ref={ref}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.25}
        style={{ x, scale, boxShadow: shadow, borderRadius: "1rem" }}
        whileDrag={{ cursor: "grabbing" }}
        onDragEnd={(_, info) => {
          const width = ref.current?.offsetWidth || 320;
          const threshold = -width * 0.15;
          const velocity = info.velocity.x;

          if (x.get() <= threshold || velocity < -400) {
            // swipe out
            animate(rawX, -width, {
              type: "tween",
              duration: 0.25,
              ease: "easeOut",
              onComplete: handleRemove,
            });
          } else {
            // reset
            animate(rawX, 0, {
              type: "spring",
              stiffness: 200,
              damping: 28,
            });
          }
        }}
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{
          opacity: 0,
          x: -240,
          scale: 0.96,
          transition: { duration: 0.22, ease: "easeOut" },
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 26,
        }}
        className="relative z-10 cursor-pointer select-none bg-[#1a1a1a] text-white"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SwipeableNotification;