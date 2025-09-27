
import React from "react";
import { motion } from "framer-motion";

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
  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      whileDrag={{ scale: 1.02, boxShadow: "0px 8px 20px rgba(0,0,0,0.25)" }} // lifted feel
      onDragEnd={(event, info) => {
        if (info.offset.x < -100) {
          onRemove(id);
        }
      }}
      initial={{ opacity: 1, x: 0, scale: 1 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -120, scale: 0.95 }} // smooth shrink + slide + fade
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 40,
        mass: 1,
      }}
      className="cursor-pointer select-none"
      style={{ borderRadius: "1rem", overflow: "hidden" }}
    >
      {children}
    </motion.div>
  );
};

export default SwipeableNotification;