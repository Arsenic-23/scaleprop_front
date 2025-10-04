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
      span.className = "coin-burst absolute";
      span.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="goldGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#fffbe6"/>
              <stop offset="35%" stop-color="#ffdf70"/>
              <stop offset="75%" stop-color="#ffb700"/>
              <stop offset="100%" stop-color="#6a4e00"/>
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3.5" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#goldGradient)" filter="url(#glow)" stroke="#e6c200" stroke-width="4"/>
        </svg>
      `;
      container.appendChild(span);
      particles.push(span);

      span.style.left = `${centerX}px`;
      span.style.top = `${centerY}px`;
      span.style.zIndex = 9999;

      const angle = (2 * Math.PI * i) / count + Math.random() * 0.3;
      const distance = 110 + Math.random() * 90;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      const delay = Math.random() * 0.15;

      gsap.fromTo(
        span,
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: gsap.utils.random(0.4, 0.8),
          rotate: gsap.utils.random(-20, 20),
        },
        {
          x,
          y,
          opacity: 0,
          scale: gsap.utils.random(1.2, 1.6),
          rotate: gsap.utils.random(-160, 160),
          duration: gsap.utils.random(1.8, 2.4),
          delay,
          ease: "power3.out",
          onComplete: () => span.remove(),
        }
      );
    }

    // Add a soft glow pulse at trigger
    gsap.fromTo(
      container,
      { opacity: 0.4 },
      { opacity: 1, duration: 0.4, yoyo: true, repeat: 1, ease: "power2.inOut" }
    );
  }, [trigger, count]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-50 overflow-hidden"
    >
      <style jsx>{`
        .coin-burst {
          transform: translate(-50%, -50%);
          filter: drop-shadow(0 0 12px rgba(255, 204, 0, 0.8))
            drop-shadow(0 0 30px rgba(255, 215, 0, 0.2));
          user-select: none;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        @keyframes shimmer {
          0% {
            filter: drop-shadow(0 0 8px rgba(255, 255, 180, 0.4));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(255, 215, 100, 0.9));
          }
          100% {
            filter: drop-shadow(0 0 8px rgba(255, 255, 180, 0.4));
          }
        }

        .coin-burst svg {
          animation: shimmer 1.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}