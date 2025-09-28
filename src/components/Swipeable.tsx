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

  // More sensitive + smooth mapping
  const x = useTransform(rawX, (latest) => {
    if (latest > 0) return latest * 0.7; // softer right swipe
    if (latest < -80) {
      const beyond = latest + 80;
      return -80 + beyond * 0.9; // smooth resistance
    }
    return latest * 1.8; // amplify sensitivity
  });

  const scale = useTransform(x, [-150, 0], [1.03, 1]);
  const shadow = useTransform(
    x,
    [-150, 0],
    [
      "0px 10px 24px rgba(0,0,0,0.28)",
      "0px 4px 10px rgba(0,0,0,0.18)",
    ]
  );

  const bgColor = useTransform(
    x,
    [-150, -40],
    ["rgba(90,0,0,0.95)", "rgba(200,0,0,0.65)"],
    { clamp: true }
  );

  const binScale = useTransform(x, [-150, -40], [1.25, 0.6], { clamp: true });
  const binOpacity = useTransform(x, [-150, -40], [1, 0], { clamp: true });

  const handleRemove = () => {
    if (navigator.vibrate) navigator.vibrate(50);
    onRemove(id);
  };

  return (
    <div className="relative w-full">
      {/* Background */}
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

      {/* Foreground */}
      <motion.div
        ref={ref}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.3}
        style={{ x: rawX, scale, boxShadow: shadow, borderRadius: "1rem" }}
        whileDrag={{ cursor: "grabbing" }}
        onDragEnd={(_, info) => {
          const width = ref.current?.offsetWidth || 300;
          const threshold = -width * 0.22; // ~22% swipe
          const velocity = info.velocity.x;

          if (x.get() <= threshold || velocity < -550) {
            animate(rawX, -width, {
              type: "tween",
              duration: 0.28,
              ease: "easeOut",
              onComplete: handleRemove,
            });
          } else {
            animate(rawX, 0, {
              type: "spring",
              stiffness: 280,
              damping: 28,
            });
          }
        }}
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{
          opacity: 0,
          x: -220,
          scale: 0.95,
          transition: { duration: 0.28, ease: "easeOut" },
        }}
        transition={{
          type: "spring",
          stiffness: 340,
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