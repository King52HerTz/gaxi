"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HERO_CONTENT } from "@/data/drama-data";
import clsx from "clsx";

interface HeroSectionProps {
  mode: "reality" | "script";
  onToggle: () => void;
}

export default function HeroSection({ mode, onToggle }: HeroSectionProps) {
  const isReality = mode === "reality";
  const content = isReality ? HERO_CONTENT.reality : HERO_CONTENT.script;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      
      {/* Dynamic Background Effect - Snowfall for Script Mode */}
      {mode === "script" && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="snow-particle"
              style={{
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animationDuration: `${Math.random() * 5 + 5}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl w-full">
        
        {/* Title */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <h1 className={clsx(
              "text-5xl md:text-8xl font-bold mb-6 tracking-tight",
              isReality 
                ? "font-serif text-reality-text" // Reality: Standard Serif
                : "font-handwriting text-script-text text-shadow-neon tracking-widest" // Script: Handwriting/Calligraphy
            )}>
              {content.title}
            </h1>
            
            <p className={clsx(
              "text-lg md:text-2xl mb-12 tracking-widest uppercase",
              isReality 
                ? "font-sans text-reality-text/70" 
                : "font-serif text-script-text/80 font-italic"
            )}>
              {content.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* The Switch */}
        <div className="flex justify-center mb-16">
          <button
            onClick={onToggle}
            className={clsx(
              "relative w-20 h-32 rounded-full border-2 transition-all duration-500 flex flex-col items-center justify-between p-2 shadow-xl",
              isReality 
                ? "bg-[#f0f0f0] border-[#d4d4d4] shadow-[inset_0_2px_5px_rgba(0,0,0,0.1)]" 
                : "bg-[#002b33] border-[#005c6e] shadow-[0_0_15px_rgba(255,191,0,0.5)]" // Updated Colors
            )}
          >
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={clsx(
                "w-full aspect-square rounded-full shadow-md",
                isReality ? "mt-0 bg-reality-accent" : "mt-auto bg-script-neon"
              )}
            />
            <span className={clsx(
              "text-[10px] font-bold tracking-widest absolute -bottom-8 w-32 text-center transition-colors",
              isReality ? "text-reality-text/50" : "text-script-text/50"
            )}>
              {isReality ? "SWITCH TO SCRIPT" : "RETURN TO REALITY"}
            </span>
          </button>
        </div>

        {/* Quote */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`quote-${mode}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="max-w-2xl mx-auto"
          >
            <p className={clsx(
              "text-xl md:text-3xl leading-relaxed",
              isReality 
                ? "font-serif text-reality-text/80 italic" 
                : "font-handwriting text-script-text not-italic"
            )}>
              {content.quote}
            </p>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
