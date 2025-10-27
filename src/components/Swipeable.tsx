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

  const x = useTransform(rawX, (latest) => {
    if (latest > 0) return Math.pow(latest, 0.8) * 0.25;
    return latest;
  });

  const scale = useTransform(x, [-160, 0], [1.03, 1]);
  const shadow = useTransform(
    x,
    [-160, 0],
    [
      "0px 14px 32px rgba(0,0,0,0.32)",
      "0px 8px 16px rgba(0,0,0,0.18)",
    ]
  );

  const bgColor = useTransform(
    x,
    [-180, 0],
    ["rgba(160,0,0,0.9)", "rgba(200,0,0,0.4)"],
    { clamp: true }
  );

  const binScale = useTransform(x, [-140, 0], [1.25, 1], { clamp: true });
  const binOpacity = useTransform(x, [-60, 0], [1, 0.5], { clamp: true });

  const handleRemove = () => {
    if (navigator.vibrate) navigator.vibrate(40);
    onRemove(id);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute inset-0 flex items-center justify-end pr-6 rounded-2xl"
        style={{ backgroundColor: bgColor as any }}
      >
        <motion.div
          style={{
            scale: binScale,
            opacity: binOpacity,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 24,
          }}
          className="text-red-500 drop-shadow-lg"
        >
          <Trash2 size={28} strokeWidth={2.2} />
        </motion.div>
      </motion.div>

      {/* Foreground */}
      <motion.div
        ref={ref}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.22}
        style={{
          x,
          scale,
          boxShadow: shadow,
          borderRadius: "1rem",
        }}
        whileDrag={{ cursor: "grabbing" }}
        onDragEnd={(_, info) => {
          const width = ref.current?.offsetWidth || 320;
          const threshold = -width * 0.18; 
          const velocity = info.velocity.x;

          if (x.get() <= threshold || velocity < -450) {
            animate(rawX, -width, {
              type: "tween",
              duration: 0.25,
              ease: [0.4, 0, 0.2, 1],
              onComplete: handleRemove,
            });
          } else {
            animate(rawX, 0, {
              type: "spring",
              stiffness: 260,
              damping: 30,
            });
          }
        }}
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{
          opacity: 0,
          x: -240,
          scale: 0.96,
          transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
        }}
        transition={{
          type: "spring",
          stiffness: 240,
          damping: 28,
        }}
        className="relative z-10 cursor-pointer select-none bg-[#1a1a1a] text-white rounded-2xl"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SwipeableNotification;
