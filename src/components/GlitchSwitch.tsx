"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HERO_CONTENT } from "@/data/drama-data";
import clsx from "clsx";

interface GlitchSwitchProps {
  mode: "reality" | "script";
  onToggle: (mode: "reality" | "script") => void;
}

export default function GlitchSwitch({ mode, onToggle }: GlitchSwitchProps) {
  const isReality = mode === "reality";

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Split Background */}
      <div className="absolute inset-0 flex">
        <motion.div 
          className="w-1/2 h-full bg-reality-blue relative border-r border-reality-cyan/30"
          animate={{ width: isReality ? "100%" : "0%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-blueprint opacity-50" />
        </motion.div>
        <motion.div 
          className="w-1/2 h-full bg-script-red relative border-l border-script-yellow/30"
          animate={{ width: isReality ? "0%" : "100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-script opacity-50" />
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 text-center flex flex-col items-center gap-8">
        
        {/* Main Title with Glitch Effect */}
        <div className="relative">
          <h1 
            className={clsx(
              "text-6xl md:text-9xl font-black tracking-tighter glitch-text",
              isReality ? "font-sans text-reality-white" : "font-script text-script-yellow"
            )}
            data-text={HERO_CONTENT.title}
          >
            {HERO_CONTENT.title}
          </h1>
          <p className="mt-4 text-xl tracking-[0.5em] font-blueprint text-white/70">
            {HERO_CONTENT.subtitle}
          </p>
        </div>

        {/* The Switch */}
        <div 
          className="relative w-64 h-24 bg-black/50 backdrop-blur-sm rounded-full border-2 border-white/20 p-2 cursor-pointer"
          onClick={() => onToggle(isReality ? "script" : "reality")}
        >
          <motion.div
            className={clsx(
              "w-1/2 h-full rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)]",
              isReality ? "bg-reality-cyan text-reality-blue" : "bg-script-neon text-white"
            )}
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            style={{
              x: isReality ? 0 : "100%"
            }}
          >
            <span className="font-bold text-xs tracking-widest uppercase">
              {isReality ? "Reality" : "Script"}
            </span>
          </motion.div>
        </div>

        {/* Dynamic Quote */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-20 flex flex-col items-center justify-center"
          >
            <p className={clsx(
              "text-xl md:text-2xl",
              isReality ? "font-blueprint text-reality-cyan" : "font-script text-script-yellow"
            )}>
              {isReality ? HERO_CONTENT.questions.reality : HERO_CONTENT.questions.script}
            </p>
            <span className="text-xs mt-2 opacity-50 tracking-widest uppercase">
              {isReality ? HERO_CONTENT.quotes.end : HERO_CONTENT.quotes.start}
            </span>
          </motion.div>
        </AnimatePresence>

      </div>
      
      {/* Decorative Lines */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-10 left-10 w-32 h-[1px] bg-white/20" />
         <div className="absolute top-10 left-10 w-[1px] h-32 bg-white/20" />
         <div className="absolute bottom-10 right-10 w-32 h-[1px] bg-white/20" />
         <div className="absolute bottom-10 right-10 w-[1px] h-32 bg-white/20" />
      </div>
    </section>
  );
}
