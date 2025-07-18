import { useEffect, useRef } from "react";
import gsap from "gsap";

const signs = ["₹", "¥", "$", "€"];

const getRandomSymbol = (() => {
  let index = 0;
  return () => {
    const symbol = signs[index];
    index = (index + 1) % signs.length;
    return symbol;
  };
})();

export default function DollarBurst({ trigger, count = 12 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!trigger || !containerRef.current) return;

    const container = containerRef.current;
    const particles = [];

    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.textContent = getRandomSymbol();
      el.style.position = "absolute";
      el.style.fontSize = "1rem";
      el.style.opacity = "0.9";
      el.style.color = "white";
      el.style.backgroundImage = "linear-gradient(45deg, #00f0ff, #00ff99)";
      el.style.webkitBackgroundClip = "text";
      el.style.webkitTextFillColor = "transparent";
      container.appendChild(el);
      particles.push(el);

      const angle = (Math.PI * 2 * i) / count;
      const radius = 80 + Math.random() * 40;

      gsap.fromTo(
        el,
        {
          x: 0,
          y: 0,
          scale: 0.4,
          opacity: 1,
        },
        {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          scale: 1.4,
          opacity: 0,
          duration: 1.4,
          ease: "power2.out",
          onComplete: () => el.remove(),
        }
      );
    }
  }, [trigger]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}