import React, { useRef } from "react";
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
  const ref = useRef<HTMLDivElement>(null);

  const x = useTransform(rawX, (latest) => {
    if (latest > 0) return latest * 0.4;
    if (latest < -80) {
      const beyond = latest + 80;
      return -80 + beyond * 0.5;
    }
    return latest * 1.2;
  });

  const scale = useTransform(x, [-150, 0], [1.03, 1]);
  const shadow = useTransform(
    x,
    [-150, 0],
    [
      "0px 10px 24px rgba(0,0,0,0.25)",
      "0px 4px 10px rgba(0,0,0,0.15)",
    ]
  );

  const handleRemove = () => {
    if (navigator.vibrate) navigator.vibrate(60);
    onRemove(id);
  };

  return (
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
      className="cursor-pointer select-none bg-[#1a1a1a] text-white"
    >
      {children}
    </motion.div>
  );
};

export default SwipeableNotification;