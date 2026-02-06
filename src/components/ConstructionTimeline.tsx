"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TIMELINE_PHASES } from "@/data/drama-data";
import clsx from "clsx";

interface ConstructionTimelineProps {
  mode: "reality" | "script";
}

export default function ConstructionTimeline({ mode }: ConstructionTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const isReality = mode === "reality";

  return (
    <section 
      ref={containerRef} 
      className={clsx(
        "py-32 min-h-[200vh] relative transition-colors duration-500",
        isReality ? "bg-reality-blue text-reality-white" : "bg-[#2a0a0a] text-script-yellow"
      )}
    >
      {/* Background Grid/Noise */}
      <div className={clsx("absolute inset-0 opacity-20", isReality ? "bg-blueprint" : "bg-script")} />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-24 text-center">
          <h2 className={clsx(
            "text-4xl md:text-6xl font-bold mb-4",
            isReality ? "font-sans tracking-tighter" : "font-serif tracking-widest"
          )}>
            {isReality ? "PROJECT TIMELINE" : "STORY ARC"}
          </h2>
          <div className={clsx(
            "h-1 mx-auto transition-all duration-500",
            isReality ? "w-32 bg-reality-cyan" : "w-16 bg-script-red"
          )} />
        </div>

        {/* The Timeline */}
        <div className="relative border-l-2 border-white/20 pl-8 md:pl-16 space-y-32">
          
          {/* Progress Bar */}
          <motion.div 
            className={clsx(
              "absolute left-[-2px] top-0 w-[2px] origin-top",
              isReality ? "bg-reality-cyan" : "bg-script-neon"
            )}
            style={{ scaleY: scrollYProgress }}
          />

          {TIMELINE_PHASES.map((phase, index) => (
            <TimelineItem key={index} phase={phase} index={index} mode={mode} />
          ))}

        </div>
      </div>
    </section>
  );
}

function TimelineItem({ phase, index, mode }: { phase: any, index: number, mode: "reality" | "script" }) {
  const isReality = mode === "reality";
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      {/* Node Marker */}
      <div className={clsx(
        "absolute -left-[41px] md:-left-[73px] top-0 w-6 h-6 rounded-full border-4 transition-colors duration-500",
        isReality ? "bg-reality-blue border-reality-cyan" : "bg-script-red border-script-neon"
      )} />

      {/* Phase Label */}
      <div className={clsx(
        "text-sm font-bold tracking-[0.2em] mb-2 transition-colors duration-500",
        isReality ? "text-reality-cyan font-blueprint" : "text-script-neon font-sans"
      )}>
        {isReality ? phase.phase : phase.episodes}
      </div>

      {/* Content Card */}
      <div className={clsx(
        "p-8 border backdrop-blur-md transition-all duration-500 group",
        isReality 
          ? "border-white/10 bg-white/5 hover:border-reality-cyan/50" 
          : "border-script-yellow/20 bg-black/40 hover:border-script-red/50"
      )}>
        <h3 className={clsx(
          "text-2xl md:text-3xl font-bold mb-4",
          isReality ? "font-sans" : "font-serif"
        )}>
          {phase.name}
        </h3>
        
        <p className={clsx(
          "text-lg leading-relaxed mb-6",
          isReality ? "text-white/80 font-sans" : "text-script-yellow/90 font-serif italic"
        )}>
          {phase.description}
        </p>

        {/* Quote or Status */}
        <div className={clsx(
          "pt-6 border-t",
          isReality ? "border-white/10" : "border-script-yellow/10"
        )}>
           {isReality ? (
             <div className="flex justify-between items-center font-blueprint text-xs text-reality-cyan/70">
               <span>STATUS: {phase.status}</span>
               <span>// APPROVED</span>
             </div>
           ) : (
             <p className="font-script text-xl text-script-neon text-right">
               {phase.quote}
             </p>
           )}
        </div>
      </div>
    </motion.div>
  );
}
