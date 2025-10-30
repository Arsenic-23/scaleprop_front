import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./Login";
import Register from "./Register";
import { LogoScroller } from "../components/LogoScroller";

export default function LandingPage(): JSX.Element {
  const location = useLocation();

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-between overflow-hidden px-4">
      {/* Header */}
      <div className="z-10 flex items-center space-x-3 mt-8 mb-10">
        <img
          src="/logo.png"
          alt="ScaleFund"
          className="w-12 h-12 object-contain"
        />
        <h1 className="text-2xl font-semibold tracking-tight">ScaleFund</h1>
      </div>

      {/* Auth Switch */}
      <div className="flex-grow flex items-center justify-center w-full z-10">
        <div className="max-w-lg w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <Routes location={location}>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="z-10 w-full flex flex-col items-center space-y-8 pb-10">
        <LogoScroller />
        <p className="text-center text-sm text-gray-400 opacity-80">
          Crafted for those who dare to scale beyond limits.
        </p>
      </div>
    </div>
  );
}