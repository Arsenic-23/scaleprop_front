import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DollarBurst({ trigger = false, count = 14 }) {
  const [burstKey, setBurstKey] = useState(0);

  useEffect(() => {
    if (trigger) {
      setBurstKey((prev) => prev + 1); // restart animation
    }
  }, [trigger]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <AnimatePresence>
        {trigger &&
          Array.from({ length: count }).map((_, i) => {
            const angle = Math.random() * 2 * Math.PI;
            const radius = 150 + Math.random() * 100;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            const delay = i * 0.05;
            const scale = Math.random() * 1.3 + 0.8;
            const rotate = Math.random() * 360;
            const duration = 1.6 + Math.random() * 0.6;

            return (
              <motion.span
                key={`${burstKey}-${i}`}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 1,
                  rotate: 0,
                }}
                animate={{
                  x,
                  y,
                  scale,
                  opacity: 0,
                  rotate,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  delay,
                  duration,
                  ease: "easeOut",
                }}
                className="absolute text-green-400 text-2xl md:text-3xl font-bold blur-[1px] select-none"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                $
              </motion.span>
            );
          })}
      </AnimatePresence>
    </div>
  );
}