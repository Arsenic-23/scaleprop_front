import { motion } from "framer-motion";

export default function BottomNavContainer({ children }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center pointer-events-none">
      <motion.nav
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="pointer-events-auto relative flex justify-between items-center px-6 py-2.5
          w-[78vw] max-w-sm mx-auto rounded-[2rem]
          bg-white/10 border border-white/20
          backdrop-blur-[50px] backdrop-saturate-[260%]
          shadow-[0_8px_32px_rgba(0,0,0,0.4)]
          ring-1 ring-black/10 ring-inset overflow-hidden"
        style={{
          WebkitBackdropFilter: "blur(50px) saturate(260%)",
          backdropFilter: "blur(50px) saturate(260%)",
        }}
      >
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/20 via-white/10 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/70 opacity-90" />
        <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_4px_12px_rgba(255,255,255,0.25),inset_0_-6px_14px_rgba(0,0,0,0.35)] pointer-events-none" />
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-transparent via-white/22 to-white/75 opacity-20 pointer-events-none" />
        {children}
      </motion.nav>
    </div>
  );
}
