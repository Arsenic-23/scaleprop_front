import React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

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

  // Resistance with better sensitivity
  const x = useTransform(rawX, (latest) => {
    if (latest > 0) return latest * 0.3; // right swipe feels heavy
    if (latest < -60) {
      const beyond = latest + 60; // how far past -60
      return -60 + beyond * 0.65; // smoother resistance, more sensitive
    }
    return latest;
  });

  const scale = useTransform(x, [-120, 0], [1.02, 1]);
  const shadow = useTransform(
    x,
    [-120, 0],
    [
      "0px 8px 20px rgba(0,0,0,0.25)",
      "0px 4px 10px rgba(0,0,0,0.15)",
    ]
  );

  const handleRemove = () => {
    if (navigator.vibrate) {
      navigator.vibrate(60);
    }
    onRemove(id);
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.25}
      style={{ x: rawX, scale, boxShadow: shadow, borderRadius: "1rem" }}
      whileDrag={{ cursor: "grabbing" }}
      onDragEnd={(event, info) => {
        const threshold = -120;

        if (x.get() < threshold) {
          handleRemove();
        } else {
          animate(rawX, 0, {
            type: "spring",
            stiffness: 300,
            damping: 30,
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
      className="cursor-pointer select-none bg-[#1a1a1a] text-white"
    >
      {children}
    </motion.div>
  );
};

export default SwipeableNotification;