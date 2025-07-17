import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function DollarBurst({ trigger = false, count = 24, emoji = "$" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!trigger || !containerRef.current) return;

    const container = containerRef.current;
    const emojis = [];

    for (let i = 0; i < count; i++) {
      const span = document.createElement("span");
      span.innerText = emoji;
      span.className = "emoji-burst text-2xl md:text-3xl absolute";
      container.appendChild(span);
      emojis.push(span);

      // Random angle and distance
      const angle = (Math.PI * 2 * i) / count;
      const distance = Math.random() * 150 + 80;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      // Animate using GSAP
      gsap.fromTo(
        span,
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 0.5,
        },
        {
          x,
          y,
          opacity: 0,
          scale: 1.5,
          duration: 1.6,
          ease: "power2.out",
          onComplete: () => {
            span.remove();
          },
        }
      );
    }
  }, [trigger]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-50 overflow-hidden"
    >
      <style jsx>{`
        .emoji-burst {
          font-weight: 700;
          background: radial-gradient(circle at center, #00ffe0, #1de5a0, #00b894);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: hueRotate 3s infinite linear;
          filter: blur(0.5px) brightness(1.1);
        }

        @keyframes hueRotate {
          0% {
            filter: hue-rotate(0deg);
          }
          50% {
            filter: hue-rotate(180deg);
          }
          100% {
            filter: hue-rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}