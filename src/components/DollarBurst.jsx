import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CurrencyBurst({ trigger = false, count = 24 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!trigger || !containerRef.current) return;

    const container = containerRef.current;
    const particles = [];

    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    for (let i = 0; i < count; i++) {
      const span = document.createElement("span");
      span.className = "particle-burst absolute";
      container.appendChild(span);
      particles.push(span);

      // Golden sparkle symbols
      span.innerText = ["•", "◆", "◇", "✦"][Math.floor(Math.random() * 4)];

      // Center position
      span.style.left = `${centerX}px`;
      span.style.top = `${centerY}px`;

      // Angle + radius
      const angle = (2 * Math.PI * i) / count;
      const distance = 100 + Math.random() * 80; // softer radius
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      gsap.fromTo(
        span,
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 0.8,
          rotate: 0,
        },
        {
          x,
          y,
          opacity: 0,
          scale: 1.3,
          rotate: gsap.utils.random(-45, 45),
          duration: gsap.utils.random(1.4, 1.9),
          ease: "power2.out",
          onComplete: () => span.remove(),
        }
      );
    }
  }, [trigger, count]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-50 overflow-hidden"
    >
      <style jsx>{`
        .particle-burst {
          font-size: clamp(1rem, 1.5vw, 1.6rem);
          font-weight: 600;
          background: radial-gradient(circle, #ffffff, #ffe680, #ffcc00);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 6px rgba(255, 215, 0, 0.8);
          transform: translate(-50%, -50%);
          user-select: none;
        }
      `}</style>
    </div>
  );
}