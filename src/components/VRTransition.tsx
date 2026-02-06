"use client";

import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useEffect } from "react";

interface VRTransitionProps {
  isActive: boolean;
  nextMode: "reality" | "script";
  onComplete?: () => void;
}

export default function VRTransition({ isActive, nextMode, onComplete }: VRTransitionProps) {
  
  // Auto-close logic:
  // After the loading bar finishes (approx 1.5s - 2s), we trigger the completion.
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 2500); // 0.4s enter + 1.2s bar + padding
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className={clsx(
            "fixed inset-0 z-[9999] flex items-center justify-center transition-colors duration-500",
            nextMode === "reality" ? "bg-[#f4f1ea]" : "bg-[#050505]" // Warm White for Reality, Deep Black for Script
          )}
          initial={{ clipPath: "inset(50% 0 50% 0)" }} 
          animate={{ 
            clipPath: ["inset(50% 0 50% 0)", "inset(0% 0 0% 0)"], 
            transition: { duration: 0.4, ease: "circOut" }
          }}
          exit={{ 
            clipPath: ["inset(0% 0 0% 0)", "inset(50% 0 50% 0)"], 
            transition: { duration: 0.4, ease: "circIn" }
          }}
        >
          {/* Background Texture Overlay */}
          <div className={clsx(
            "absolute inset-0 opacity-20 pointer-events-none z-0",
            nextMode === "reality" 
              ? "bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" 
              : "bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"
          )} />

          {/* CRT Scanline Effect Overlay (Script Mode Only) */}
          {nextMode === "script" && (
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,3px_100%] pointer-events-none opacity-50" />
          )}
          
          {/* Text Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="relative z-20 text-center px-4"
          >
            {nextMode === "script" ? (
              // Welcome to Rongcheng (Script Mode)
              <div className="flex flex-col items-center">
                <motion.h2 
                  className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff004c] via-[#ff00ff] to-[#ff004c] font-serif-sc tracking-[0.2em] mb-4 text-shadow-neon"
                  animate={{ 
                    textShadow: [
                      "0 0 10px #ff004c",
                      "0 0 20px #ff004c",
                      "0 0 10px #ff004c"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  欢迎来到容城
                </motion.h2>
                <motion.div 
                  className="h-[2px] bg-[#ff004c]/30 max-w-xs mx-auto mt-4 overflow-hidden rounded-full"
                >
                   <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.2, ease: "linear", delay: 0.2 }}
                      className="h-full bg-[#ff004c] shadow-[0_0_10px_#ff004c]"
                   />
                </motion.div>
                <p className="mt-4 text-[#ff004c]/70 font-mono text-sm tracking-widest uppercase animate-pulse">
                  System Initialization...
                </p>
              </div>
            ) : (
              // Welcome back to Shanghai (Reality Mode)
              <div className="flex flex-col items-center">
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-reality-text tracking-widest mb-4">
                  欢迎回到上海
                </h2>
                <motion.div 
                  className="h-[2px] bg-reality-accent/30 max-w-xs mx-auto mt-4 overflow-hidden rounded-full"
                >
                   <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.2, ease: "linear", delay: 0.2 }}
                      className="h-full bg-reality-accent shadow-[0_0_10px_#c5a028]"
                   />
                </motion.div>
                <p className="mt-4 text-reality-text/60 font-serif italic text-sm tracking-widest uppercase animate-pulse">
                  Restoring Reality...
                </p>
              </div>
            )}
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}