import { motion, useAnimationFrame } from "framer-motion";
import { useRef } from "react";

export default function BottomNavContainer({ children }) {
  const lightRef = useRef(null);

  useAnimationFrame((t) => {
    const x = Math.sin(t / 2800) * 35;
    const y = Math.cos(t / 3600) * 30;
    if (lightRef.current) {
      lightRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  });

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-full flex justify-center pointer-events-none">
      {/* dock reflection */}
      <div
        className="absolute bottom-[-32px] w-[78vw] max-w-sm h-16 rounded-[2rem]
        bg-gradient-to-b from-white/18 to-transparent opacity-35 blur-[28px]
        scale-y-[-1] pointer-events-none"
      ></div>

      <motion.nav
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="pointer-events-auto relative flex justify-between items-center px-6 py-2.5
          w-[78vw] max-w-sm mx-auto rounded-[2rem]
          bg-black/40 border border-white/20
          backdrop-blur-[70px] backdrop-saturate-[300%]
          shadow-[0_12px_36px_rgba(0,0,0,0.55)]
          ring-1 ring-black/40 ring-inset overflow-hidden"
        style={{
          WebkitBackdropFilter: "blur(70px) saturate(300%)",
          backdropFilter: "blur(70px) saturate(300%)",
        }}
      >
        {/* layered glass */}
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/15 via-transparent to-black/30 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/70 opacity-90" />
        <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_3px_8px_rgba(255,255,255,0.22),inset_0_-6px_18px_rgba(0,0,0,0.45)] pointer-events-none" />

        {/* ambient light shader */}
        <div
          ref={lightRef}
          className="absolute w-[200%] h-[200%]
            bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.22),transparent_60%)]
            opacity-25 mix-blend-screen blur-[40px] pointer-events-none"
        />

        {children}

        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-transparent to-white/30 opacity-12 pointer-events-none" />
      </motion.nav>
    </div>
  );
}
