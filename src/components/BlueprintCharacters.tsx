"use client";

import { motion } from "framer-motion";
import { CHARACTERS } from "@/data/drama-data";
import clsx from "clsx";

interface BlueprintCharactersProps {
  mode: "reality" | "script";
}

export default function BlueprintCharacters({ mode }: BlueprintCharactersProps) {
  const isReality = mode === "reality";

  return (
    <section className="py-24 px-4 min-h-screen relative overflow-hidden">
      {/* Dynamic Background */}
      <div className={clsx(
        "absolute inset-0 transition-colors duration-700",
        isReality ? "bg-[#15202b]" : "bg-[#1a0505]"
      )} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2 
          className={clsx(
            "text-5xl md:text-8xl font-bold mb-16 text-center tracking-tighter",
            isReality ? "text-white/10" : "text-script-red/20"
          )}
        >
          {isReality ? "PERSONNEL FILE" : "CASTING CALL"}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {CHARACTERS.map((char) => (
            <CharacterCard key={char.id} char={char} mode={mode} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CharacterCard({ char, mode }: { char: any, mode: "reality" | "script" }) {
  const isReality = mode === "reality";

  return (
    <div className="relative h-[450px] group perspective-1000">
      <motion.div
        className="relative w-full h-full transition-all duration-700 preserve-3d"
        animate={{ rotateY: isReality ? 0 : 180 }}
      >
        {/* FRONT: REALITY LAYER */}
        <div className="absolute inset-0 backface-hidden bg-reality-blue border border-reality-cyan/30 p-8 flex flex-col justify-between overflow-hidden">
          {/* Grid Background */}
          <div className="absolute inset-0 bg-blueprint opacity-30 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-4xl font-bold text-white font-sans">{char.name}</h3>
              <span className="text-xs font-blueprint text-reality-cyan border border-reality-cyan px-2 py-1">
                ID: {char.id.toUpperCase()}
              </span>
            </div>
            <p className="text-reality-cyan/60 font-blueprint text-sm mb-6 tracking-widest">
              {char.role}
            </p>
            
            <div className="mb-6">
              <h4 className="text-lg font-bold text-white mb-2">{char.layerA.title}</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                {char.layerA.desc}
              </p>
            </div>

            {/* Stats Visualization */}
            <div className="space-y-3">
              {Object.entries(char.layerA.stats).map(([key, value]: [string, any]) => (
                <div key={key} className="flex items-center gap-4">
                  <span className="text-[10px] uppercase w-16 text-right opacity-60 font-blueprint">{key}</span>
                  <div className="flex-1 h-1 bg-white/10">
                    <motion.div 
                      className="h-full bg-reality-cyan"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${value}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <span className="text-[10px] font-blueprint w-6 text-right text-reality-cyan">{value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="absolute bottom-4 right-4 text-[10px] text-white/20 font-blueprint">
            DYNAMISM ARCHITECTS
          </div>
        </div>

        {/* BACK: SCRIPT LAYER */}
        <div 
          className="absolute inset-0 backface-hidden bg-script-red p-8 flex flex-col justify-center items-center text-center rotate-y-180 shadow-2xl border border-script-yellow/20"
          style={{ transform: "rotateY(180deg)" }}
        >
          {/* Film Grain & Texture */}
          <div className="absolute inset-0 bg-script opacity-40 pointer-events-none" />
          <div className="absolute inset-0 border-4 border-double border-script-yellow/30 m-2" />

          <div className="relative z-10">
             <h3 className="text-5xl font-script text-script-yellow mb-2">{char.name}</h3>
             <p className="text-script-neon text-sm font-sans tracking-[0.3em] uppercase mb-8">
               {char.layerB.title}
             </p>

             <p className="text-script-yellow/80 font-serif leading-loose italic mb-8">
               {char.layerB.desc}
             </p>

             <div className="relative inline-block py-4 px-8">
               <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-script-neon" />
               <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-script-neon" />
               <p className="text-xl md:text-2xl font-script text-white text-shadow-neon">
                 {char.layerB.quote}
               </p>
             </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
