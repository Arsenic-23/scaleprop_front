import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CurrencyBurst({ trigger = false, count = 20 }) {
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
      span.className = "coin-burst absolute";
      span.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill="url(#goldGradient)" stroke="#d4af37" stroke-width="5"/>
          <defs>
            <radialGradient id="goldGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#fff8dc"/>
              <stop offset="40%" stop-color="#ffd700"/>
              <stop offset="100%" stop-color="#b8860b"/>
            </radialGradient>
          </defs>
        </svg>
      `;
      container.appendChild(span);
      particles.push(span);

      span.style.left = `${centerX}px`;
      span.style.top = `${centerY}px`;

      const angle = (2 * Math.PI * i) / count;
      const distance = 100 + Math.random() * 80;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      gsap.fromTo(
        span,
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: gsap.utils.random(0.6, 0.9),
          rotate: 0,
        },
        {
          x,
          y,
          opacity: 0,
          scale: gsap.utils.random(1.1, 1.4),
          rotate: gsap.utils.random(-30, 30), 
          duration: gsap.utils.random(1.6, 2.2),
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
        .coin-burst {
          transform: translate(-50%, -50%);
          filter: drop-shadow(0 0 6px rgba(255, 215, 0, 0.9));
          user-select: none;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}