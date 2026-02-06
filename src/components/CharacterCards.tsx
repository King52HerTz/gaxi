"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CHARACTERS } from "@/data/drama-data";
import clsx from "clsx";

interface CharacterCardsProps {
  mode: "reality" | "script";
}

export default function CharacterCards({ mode }: CharacterCardsProps) {
  const isReality = mode === "reality";

  return (
    <section className="py-24 px-6 min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
        {CHARACTERS.map((char) => (
          <CharacterCard key={char.id} char={char} mode={mode} />
        ))}
      </div>
    </section>
  );
}

function CharacterCard({ char, mode }: { char: any, mode: "reality" | "script" }) {
  const isReality = mode === "reality";
  const content = isReality ? char.reality : char.script;

  return (
    <motion.div
      className={clsx(
        "relative group transition-all duration-700",
        isReality 
          ? "bg-white p-4 pb-12 shadow-xl rotate-1 hover:rotate-0 hover:scale-105" // Polaroid Style
          : "bg-[#0f0f0f] border border-white/10 p-8 hover:border-script-neon/50 hover:shadow-[0_0_30px_rgba(255,191,0,0.2)]" // Cyberpunk Style
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Reality: Tape Effect */}
      {isReality && <div className="tape-effect tape-top-left" />}

      {/* Card Content */}
      <div className="h-full flex flex-col relative z-10">
        
        {/* Header / Name */}
        <div className={clsx("flex justify-between items-start mb-6", isReality ? "order-2 mt-4 px-2" : "order-1")}>
          <h3 className={clsx(
            "text-3xl font-bold transition-colors duration-500",
            isReality ? "text-reality-text font-handwriting text-4xl" : "text-script-text font-serif tracking-widest"
          )}>
            {char.name}
          </h3>
          <AnimatePresence mode="wait">
            <motion.span
              key={mode}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={clsx(
                "text-xs tracking-[0.2em] uppercase py-1 px-3 border",
                isReality 
                  ? "text-reality-text/60 border-reality-text/20 rounded-sm" 
                  : "text-script-neon border-script-neon/50"
              )}
            >
              {content.role}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Dynamic Content / Description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.6 }}
            className={clsx(
              "flex-1 flex items-center",
              isReality 
                ? "order-1 bg-gray-100 aspect-square mb-4 flex items-center justify-center p-6 text-center" // Placeholder for Photo area
                : "order-2"
            )}
          >
            {isReality ? (
               <p className="text-reality-text/80 font-serif italic text-lg leading-relaxed">
                 &quot;{content.desc}&quot;
               </p>
            ) : (
               <p className="text-script-text/90 font-serif italic text-lg leading-loose">
                 {content.desc}
               </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer Decoration (Script Only) */}
        {!isReality && (
          <div className="w-full h-1 mt-auto bg-gradient-to-r from-transparent via-script-neon to-transparent order-3" />
        )}
      </div>

      {/* Background Texture (Script Only) */}
      {!isReality && (
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
      )}
    </motion.div>
  );
}
