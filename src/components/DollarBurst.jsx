import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const currencyList = ["₹", "¥", "$", "€"];

export default function CurrencyBurst({ trigger = false, count = 28 }) {
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!trigger || !containerRef.current) return;

    const emoji = currencyList[index % currencyList.length];
    setIndex((prev) => (prev + 1) % currencyList.length);

    const container = containerRef.current;
    const emojis = [];

    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    for (let i = 0; i < count; i++) {
      const span = document.createElement("span");
      span.innerText = emoji;
      span.className = "emoji-burst absolute text-2xl md:text-3xl";
      span.style.left = `${centerX}px`;
      span.style.top = `${centerY}px`;

      container.appendChild(span);
      emojis.push(span);

      const angle = (Math.PI * 2 * i) / count;
      const distance = 140; // Fixed distance for perfect circle
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      gsap.fromTo(
        span,
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 0.4,
          rotate: 0,
        },
        {
          x,
          y,
          opacity: 0,
          scale: 1.4,
          rotate: 360,
          duration: 1.6,
          ease: "power2.out",
          onComplete: () => span.remove(),
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
          font-weight: 800;
          background: radial-gradient(
            circle,
            #ffffff,
            #00ffe0,
            #14e7b8,
            #00b894
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s infinite ease-in-out;
          filter: blur(0.4px) brightness(1.1);
        }

        @keyframes shimmer {
          0% {
            filter: hue-rotate(0deg) brightness(1.1);
          }
          50% {
            filter: hue-rotate(180deg) brightness(1.2);
          }
          100% {
            filter: hue-rotate(360deg) brightness(1.1);
          }
        }
      `}</style>
    </div>
  );
}