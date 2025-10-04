import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full w-full p-8">
      <div className="relative flex items-center justify-center">
        {/* Outer soft glow ring */}
        <motion.div
          className="absolute w-14 h-14 rounded-full bg-gradient-to-tr from-blue-500 via-cyan-400 to-indigo-500 opacity-40 blur-xl"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
        />

        {/* Spinning gradient ring */}
        <motion.div
          className="w-12 h-12 rounded-full border-[3px] border-transparent border-t-blue-500 border-l-cyan-400"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          style={{
            boxShadow:
              "0 0 15px rgba(59,130,246,0.6), 0 0 30px rgba(59,130,246,0.25)",
          }}
        />

        {/* Inner subtle pulse dot */}
        <motion.div
          className="absolute w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.7)]"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [1, 0.6, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
};

export default Loading;