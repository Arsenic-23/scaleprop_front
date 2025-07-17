import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DollarBurst({ trigger = false, count = 22 }) {
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
            const radius = Math.random() * 80 + 90;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            const duration = Math.random() * 0.6 + 1.2;

            return (
              <motion.span
                key={`${burstKey}-${i}`}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0.5,
                  opacity: 0.9,
                  rotate: 0,
                }}
                animate={{
                  x,
                  y,
                  scale: 1.3,
                  opacity: 0,
                  rotate: 90 + Math.random() * 180,
                }}
                transition={{ duration, ease: "easeOut" }}
                exit={{ opacity: 0 }}
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
          filter: blur(0.5px);
          background: radial-gradient(circle, #00ff88, #00ffaa, #1fff77);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          opacity: 0.9;
          animation: hueRotate 4s infinite linear;
        }

        @keyframes hueRotate {
          0% {
            filter: hue-rotate(0deg);
          }
          50% {
            filter: hue-rotate(90deg);
          }
          100% {
            filter: hue-rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
}