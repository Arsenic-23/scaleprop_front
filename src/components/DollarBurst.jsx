import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DollarBurst({ trigger = false, count = 30 }) {
  const [burstKey, setBurstKey] = useState(0);

  useEffect(() => {
    if (trigger) {
      setBurstKey((prev) => prev + 1);
    }
  }, [trigger]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <AnimatePresence>
        {trigger &&
          Array.from({ length: count }).map((_, i) => {
            const angle = (360 / count) * i;
            const radians = (angle * Math.PI) / 180;
            const distance = Math.random() * 100 + 100;

            const x = Math.cos(radians) * distance;
            const y = Math.sin(radians) * distance;

            return (
              <motion.span
                key={`${burstKey}-${i}`}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 1,
                  opacity: 1,
                  rotate: 0,
                }}
                animate={{
                  x,
                  y,
                  scale: 1.5,
                  opacity: 0,
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                }}
                className="absolute dollar-burst text-xl md:text-2xl"
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

      <style jsx>{`
        .dollar-burst {
          font-weight: 600;
          font-family: "Inter", sans-serif;
          background: linear-gradient(145deg, #00ff99, #00ffaa, #1fff88);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 2px #00ffaa88);
        }
      `}</style>
    </div>
  );
}