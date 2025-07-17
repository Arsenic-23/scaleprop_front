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
            const radius = 100; // Constant radius for perfect circle
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            const duration = 1.4 + Math.random() * 0.2; // Slight variation

            return (
              <motion.span
                key={`${burstKey}-${i}`}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0.3,
                  opacity: 0.7,
                  rotate: 0,
                }}
                animate={{
                  x,
                  y,
                  scale: 1.6,
                  opacity: 0,
                  rotate: 360,
                }}
                transition={{
                  duration,
                  ease: [0.25, 1, 0.5, 1],
                }}
                exit={{ opacity: 0 }}
                className="absolute dollar-burst text-2xl md:text-3xl"
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
          font-weight: 700;
          background: radial-gradient(circle, #00ffcc, #00ffaa, #00ee88);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 4px #00ffbb88) blur(0.5px) brightness(1.15);
          animation: smoothPulse 6s infinite ease-in-out, hueRotate 6s infinite linear;
          pointer-events: none;
        }

        @keyframes smoothPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.03);
          }
        }

        @keyframes hueRotate {
          0% {
            filter: hue-rotate(0deg) drop-shadow(0 0 4px #00ffbb88);
          }
          50% {
            filter: hue-rotate(180deg) drop-shadow(0 0 6px #00ffaaaa);
          }
          100% {
            filter: hue-rotate(360deg) drop-shadow(0 0 4px #00ffbb88);
          }
        }
      `}</style>
    </div>
  );
}