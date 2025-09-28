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
    if (latest > 0) return latest * 0.5; // softer right swipe
    if (latest < -80) {
      const beyond = latest + 80;
      return -80 + beyond * 0.8; // less resistance
    }
    return latest * 1.6; // amplify sensitivity
  });

  const scale = useTransform(x, [-150, 0], [1.02, 1]);
  const shadow = useTransform(
    x,
    [-150, 0],
    [
      "0px 8px 20px rgba(0,0,0,0.25)",
      "0px 3px 8px rgba(0,0,0,0.15)",
    ]
  );

  const bgColor = useTransform(
    x,
    [-150, -40],
    ["rgba(90,0,0,0.9)", "rgba(180,0,0,0.6)"], // darker → brighter
    { clamp: true }
  );

  const binScale = useTransform(x, [-150, -40], [1.2, 0.5], { clamp: true });
  const binOpacity = useTransform(x, [-150, -40], [1, 0], { clamp: true });

  const handleRemove = () => {
    if (navigator.vibrate) navigator.vibrate(60);
    onRemove(id);
  };

  return (
    <div className="relative w-full">
      {/* Background layer */}
      <motion.div
        className="absolute inset-0 flex items-center justify-end pr-6 rounded-2xl"
        style={{
          backgroundColor: bgColor as any,
        }}
      >
        <motion.div
          style={{ scale: binScale, opacity: binOpacity }}
          className="text-red-500/90"
        >
          <Trash2 size={28} />
        </motion.div>
      </motion.div>

      {/* Foreground card */}
      <motion.div
        ref={ref}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.25}
        style={{ x: rawX, scale, boxShadow: shadow, borderRadius: "1rem" }}
        whileDrag={{ cursor: "grabbing" }}
        onDragEnd={(_, info) => {
          const width = ref.current?.offsetWidth || 300;
          const threshold = -width * 0.25; // 25% width
          const velocity = info.velocity.x; // swipe speed

          if (x.get() <= threshold || velocity < -600) {
            animate(rawX, -width, {
              type: "tween",
              duration: 0.25,
              ease: "easeOut",
              onComplete: handleRemove,
            });
          } else {
            animate(rawX, 0, {
              type: "spring",
              stiffness: 250,
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
          stiffness: 320,
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