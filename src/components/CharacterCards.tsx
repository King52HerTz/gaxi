"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CHARACTERS, type Character } from "@/data/drama-data";
import clsx from "clsx";
import { X } from "lucide-react";
import Image from "next/image";

interface CharacterCardsProps {
  mode: "reality" | "script";
}

export default function CharacterCards({ mode }: CharacterCardsProps) {
  const [selectedCharId, setSelectedCharId] = useState<string | null>(null);

  const handleCharClick = (id: string) => {
    setSelectedCharId(id);
  };

  return (
    <section className="py-24 px-6 min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <AnimatePresence mode="wait">
        <RelationshipMap key="map" mode={mode} onSelect={handleCharClick} />
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCharId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#050a1a]/80 p-4 backdrop-blur-sm"
            onClick={() => setSelectedCharId(null)}
          >
            <div className="relative max-w-md w-full" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setSelectedCharId(null)}
                className="absolute -top-12 right-0 text-blue-100 hover:text-blue-200 transition-colors"
              >
                <X size={32} />
              </button>
              {CHARACTERS.filter(c => c.id === selectedCharId).map(char => (
                 <CharacterCard key={char.id} char={char} mode={mode} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function RelationshipMap({ mode, onSelect }: { mode: "reality" | "script"; onSelect: (id: string) => void }) {
  const isReality = mode === "reality";
  
  // Custom positions for a more spread out layout (preventing overlap)
  const positions: Record<string, { x: number; y: number }> = {
    huxiu: { x: 50, y: 60 },       // Center (Hub)
    xiaozhiyu: { x: 50, y: 15 },   // Top Center - Moved down from 10 to 15 to reduce line length
    peizhen: { x: 80, y: 35 },     // Top Right - Moved in from 85 to 80
    gonghuaicong: { x: 20, y: 35 },// Top Left - Moved in from 15 to 20
    zhaoxiaorou: { x: 20, y: 80 }, // Bottom Left - Moved in from 15 to 20, up from 85 to 80
    wangguangming: { x: 80, y: 80 }// Bottom Right - Moved in from 85 to 80, up from 85 to 80
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative w-full max-w-4xl h-[600px] md:h-[800px] border border-white/10 rounded-3xl bg-[#050a1a]/30 backdrop-blur-sm p-8"
    >
      <h2 className={clsx(
        "text-center text-2xl md:text-4xl font-bold mb-8",
        isReality ? "text-reality-text font-serif" : "text-script-neon font-handwriting"
      )}>
        {isReality ? "人物关系网" : "角色羁绊图"}
      </h2>

      <div className="relative w-full h-full">
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {CHARACTERS.map(char => 
            char.relationships?.map((rel, idx) => {
               const start = positions[char.id];
               const end = positions[rel.targetId];
               if (!start || !end) return null;

               return (
                 <g key={`${char.id}-${rel.targetId}-${idx}`}>
                   <motion.line
                     x1={`${start.x}%`}
                     y1={`${start.y}%`}
                     x2={`${end.x}%`}
                     y2={`${end.y}%`}
                     stroke={isReality ? "#d4af37" : "#7dc4ff"}
                     strokeWidth="1"
                     strokeOpacity="0.4"
                     initial={{ pathLength: 0 }}
                     animate={{ pathLength: 1 }}
                     transition={{ duration: 1.5, delay: 0.5 }}
                   />
                 </g>
               );
            })
          )}
        </svg>

        {/* Relationship Labels */}
         {CHARACTERS.map(char => 
           char.relationships?.map((rel, idx) => {
              const start = positions[char.id];
              const end = positions[rel.targetId];
              if (!start || !end) return null;

               // Render single unified label
               const midX = (start.x + end.x) / 2;
               const midY = (start.y + end.y) / 2;

               return (
                 <motion.div
                    key={`label-${char.id}-${rel.targetId}-${idx}`}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
                    style={{ left: `${midX}%`, top: `${midY}%` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                 >
                   <div className={clsx(
                     "text-[10px] md:text-xs text-center px-2 py-0.5 rounded-full whitespace-nowrap backdrop-blur-sm",
                     isReality 
                      ? "bg-[#fdfbf7]/90 text-gray-600 shadow-sm border border-gray-100" 
                      : "bg-[#050a1a]/80 text-blue-100 border border-blue-200/20 shadow-[0_0_8px_rgba(125,196,255,0.25)]"
                   )}>
                     {rel.desc}
                   </div>
                 </motion.div>
               );
           })
         )}

        {/* Nodes */}
        {CHARACTERS.map((char) => {
           const pos = positions[char.id] || { x: 50, y: 50 };

           return (
             <motion.div
               key={char.id}
               className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
               style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
               onClick={() => onSelect(char.id)}
               whileHover={{ scale: 1.1, zIndex: 30 }}
             >
               <div className={clsx(
                 "w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border-2 transition-all duration-300 relative",
                 isReality 
                  ? "border-reality-accent shadow-lg bg-white" 
                  : "border-script-neon shadow-[0_0_12px_rgba(125,196,255,0.35)] bg-[#050a1a]",
                 isReality 
                  ? "group-hover:shadow-2xl group-hover:ring-4 group-hover:ring-reality-accent" 
                  : "group-hover:shadow-[0_0_30px_rgba(125,196,255,0.6)] group-hover:ring-4 group-hover:ring-script-neon"
               )}>
                 <Image 
                   src={char.avatar || "https://placehold.co/100x100"} 
                   alt={char.name} 
                   width={100} 
                   height={100} 
                   className="w-full h-full object-cover"
                 />
               </div>
               <div className={clsx(
                 "mt-3 text-center text-sm font-bold px-3 py-1 rounded-full transition-all duration-300 absolute left-1/2 -translate-x-1/2 whitespace-nowrap",
                isReality ? "bg-white text-black shadow-md" : "bg-[#050a1a] text-script-neon border border-script-neon/50",
                 "group-hover:scale-110 group-hover:font-extrabold group-hover:z-40"
               )}>
                 {char.name}
               </div>
             </motion.div>
           );
        })}
      </div>
    </motion.div>
  );
}

function CharacterCard({ char, mode }: { char: Character, mode: "reality" | "script" }) {
  const isReality = mode === "reality";
  const content = isReality ? char.reality : char.script;

  return (
    <motion.div
      className={clsx(
        "relative group transition-all duration-700 overflow-hidden",
        isReality 
          ? "bg-white p-6 shadow-xl rotate-1 hover:rotate-0 hover:scale-105 rounded-sm" // Polaroid Style
          : "bg-[#050a1a] border border-white/10 p-8 hover:border-script-neon/50 hover:shadow-[0_0_30px_rgba(125,196,255,0.25)] rounded-xl"
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Reality: Tape Effect */}
      {isReality && <div className="tape-effect tape-top-left z-20" />}

      {/* Card Content */}
      <div className="h-full flex flex-col relative z-10">
        
        {/* Photo Area */}
        <div className={clsx(
          "w-full aspect-[3/4] mb-6 overflow-hidden relative", // Changed from 4/3 to 3/4 for portrait photos
          isReality ? "bg-gray-100 p-2 shadow-inner" : "rounded-lg border border-white/5"
        )}>
           <Image 
             src={content.photo || char.avatar} 
             alt={char.name}
             fill
             className={clsx(
               "transition-transform duration-700 group-hover:scale-110 object-cover object-top", // Added object-top
               isReality ? "" : "opacity-80 group-hover:opacity-100"
             )}
           />
           {/* Script Mode Overlay */}
          {!isReality && (
            <div className="absolute inset-0 bg-gradient-to-t from-[#050a1a]/80 via-transparent to-transparent" />
          )}
        </div>

        {/* Header / Name */}
        <div className="flex justify-between items-end mb-4">
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

        {/* Quote */}
        {content.quote && (
          <div className="mb-4 relative">
             <p className={clsx(
               "text-sm font-bold italic",
               isReality ? "text-reality-accent" : "text-script-neon"
             )}>
               {content.quote}
             </p>
          </div>
        )}

        {/* Dynamic Content / Description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            {isReality ? (
               <p className="text-reality-text/80 font-serif text-sm leading-relaxed mb-4">
                 {content.desc}
               </p>
            ) : (
               <p className="text-script-text/90 font-serif text-sm leading-loose mb-4">
                 {content.desc}
               </p>
            )}
            
            {/* Tags */}
            {content.tags && (
              <div className="flex flex-wrap gap-2 mt-auto">
                {content.tags.map((tag, i) => (
                  <span key={i} className={clsx(
                    "text-[10px] px-2 py-0.5 rounded-full border",
                    isReality 
                      ? "bg-gray-50 text-gray-500 border-gray-200" 
                      : "bg-script-neon/10 text-script-neon border-script-neon/30"
                  )}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer Decoration (Script Only) */}
        {!isReality && (
          <div className="w-full h-1 mt-4 bg-gradient-to-r from-transparent via-script-neon to-transparent order-3" />
        )}
      </div>

      {/* Background Texture (Script Only) */}
      {!isReality && (
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
      )}
    </motion.div>
  );
}
