import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const currencyList = ["₹", "¥", "$", "€"];

export default function CurrencyBurst({ trigger = false, count = 32 }) {
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
      container.appendChild(span);
      emojis.push(span);

      const angle = (2 * Math.PI * i) / count;
      const distance = 100 + Math.random() * 50;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      // Initial position in center
      span.style.left = `${centerX}px`;
      span.style.top = `${centerY}px`;

      gsap.fromTo(
        span,
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 0.5,
          rotate: 0,
        },
        {
          x,
          y,
          opacity: 0,
          scale: 1.5,
          rotate: 720,
          duration: 1.8,
          ease: "power3.out",
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
          animation: shimmer 3s infinite ease-in-out;
          filter: blur(0.3px) brightness(1.1);
          transform: translate(-50%, -50%);
          user-select: none;
          pointer-events: none;
        }

        @keyframes shimmer {
          0% {
            filter: hue-rotate(0deg) brightness(1.1);
          }
          50% {
            filter: hue-rotate(180deg) brightness(1.3);
          }
          100% {
            filter: hue-rotate(360deg) brightness(1.1);
          }
        }
      `}</style>
    </div>
  );
}