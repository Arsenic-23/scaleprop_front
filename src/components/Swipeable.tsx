import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

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
  const x = useMotionValue(0);

  const rotate = useTransform(x, [-150, 150], [-6, 6]);

  const scale = useTransform(x, [-150, 0, 150], [1.05, 1, 1.05]);

  const shadow = useTransform(
    x,
    [-150, 0, 150],
    [
      "0px 12px 24px rgba(0,0,0,0.35)",
      "0px 4px 10px rgba(0,0,0,0.15)",
      "0px 12px 24px rgba(0,0,0,0.35)",
    ]
  );

  const handleRemove = () => {
    if (navigator.vibrate) {
      navigator.vibrate(30); // subtle vibration feedback
    }
    onRemove(id);
  };

  return (
    <motion.div
      drag="x"
      style={{ x, rotate, scale, boxShadow: shadow, borderRadius: "1rem" }}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.35} // smoother, more "free" swipe
      whileDrag={{ cursor: "grabbing" }}
      onDragEnd={(event, info) => {
        if (info.offset.x < -90 || info.offset.x > 90) {
          handleRemove();
        }
      }}
      initial={{ opacity: 1, x: 0, scale: 1 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -150, scale: 0.9 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 0.8,
      }}
      className="cursor-pointer select-none bg-[#1a1a1a] text-white"
    >
      {children}
    </motion.div>
  );
};

export default SwipeableNotification;