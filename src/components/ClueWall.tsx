"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { INVESTIGATION_CLUES } from "@/data/drama-data";

interface Clue {
  id: string;
  src: string;
  title: string;
  desc: string;
  x: number;
  y: number;
  rotation: number;
  type: string;
}

export default function ClueWall() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedClue, setSelectedClue] = useState<Clue | null>(null);

  // SVG Lines connecting clues - Logic based on the new clues
  const lines = [
    { from: "clue-1", to: "clue-4" }, // Newspaper -> Photo (Victim perspective)
    { from: "clue-4", to: "clue-2" }, // Photo -> Blueprint (Father's legacy)
    { from: "clue-1", to: "clue-5" }, // Newspaper -> Fake Letter (The lie)
    { from: "clue-6", to: "clue-3" }, // Contract -> SD Card (The proof)
    { from: "clue-5", to: "clue-3" }, // Fake Letter -> SD Card (Revealing truth)
  ];

  return (
    <section className="relative min-h-screen py-24 overflow-hidden bg-[#0f0505]">
       <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 relative z-20"
        >
          <h2 className="text-3xl md:text-5xl font-serif-sc font-bold text-off-white mb-4 text-shadow-neon">
            真相调查墙
          </h2>
          <div className="h-1 w-24 bg-neon-red mx-auto mb-6 shadow-[0_0_10px_#ff004c]" />
          <p className="font-courier text-red-500/50 tracking-widest uppercase text-sm">
            CASE FILE: 2004 COLLAPSE • JUSTICE FOR QIN
          </p>
        </motion.div>

      <div ref={containerRef} className="relative w-full h-[80vh] md:h-[100vh] bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] bg-opacity-20 border-t border-b border-red-900/30 overflow-hidden cursor-grab active:cursor-grabbing">
        
        {/* Connection Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60">
           {lines.map((line, i) => {
             const from = INVESTIGATION_CLUES.find(c => c.id === line.from);
             const to = INVESTIGATION_CLUES.find(c => c.id === line.to);
             if (!from || !to) return null;
             
             return (
               <motion.line
                 key={i}
                 x1={`${from.x}%`}
                 y1={`${from.y}%`}
                 x2={`${to.x}%`}
                 y2={`${to.y}%`}
                 stroke="#ff004c"
                 strokeWidth="2"
                 strokeDasharray="5,5"
                 initial={{ pathLength: 0, opacity: 0 }}
                 whileInView={{ pathLength: 1, opacity: 0.6 }}
                 transition={{ duration: 1.5, delay: 0.5 + i * 0.2 }}
               />
             );
           })}
        </svg>

        {/* Draggable Photos */}
        {INVESTIGATION_CLUES.map((clue) => (
          <DraggablePhoto 
            key={clue.id} 
            clue={clue} 
            containerRef={containerRef}
            onSelect={() => setSelectedClue(clue)}
          />
        ))}

        {/* Lightbox Overlay */}
        <AnimatePresence>
          {selectedClue && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-12 cursor-default backdrop-blur-md"
              onClick={() => setSelectedClue(null)}
            >
              <motion.div
                layoutId={`clue-${selectedClue.id}`}
                className="relative max-w-4xl w-full bg-[#1a1a1a] p-1 rounded-sm shadow-2xl border border-red-900/50 flex flex-col md:flex-row overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedClue(null)}
                  className="absolute top-4 right-4 z-20 text-white/50 hover:text-red-500 transition-colors"
                >
                  <X size={32} />
                </button>
                
                <div className="w-full md:w-2/3 bg-black relative min-h-[300px]">
                    <Image 
                      src={selectedClue.src} 
                      alt={selectedClue.title}
                      fill
                      className="object-contain"
                    />
                </div>
                
                <div className="w-full md:w-1/3 p-8 flex flex-col justify-center bg-[#1a1a1a] border-l border-red-900/20">
                    <span className="text-red-500 font-mono text-xs uppercase tracking-widest mb-2 border border-red-900/30 px-2 py-1 self-start">
                        {selectedClue.type}
                    </span>
                    <h3 className="text-2xl font-serif-sc font-bold text-white mb-4">{selectedClue.title}</h3>
                    <p className="text-gray-400 font-sans leading-relaxed">{selectedClue.desc}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

interface DraggablePhotoProps {
  clue: Clue;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onSelect: () => void;
}

function DraggablePhoto({ clue, containerRef, onSelect }: DraggablePhotoProps) {
  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      dragElastic={0.2}
      whileDrag={{ scale: 1.1, zIndex: 100, cursor: "grabbing" }}
      whileHover={{ scale: 1.05, zIndex: 50 }}
      layoutId={`clue-${clue.id}`}
      initial={{ 
        opacity: 0, 
        scale: 0.5,
        x: -50, 
      }}
      whileInView={{ 
        opacity: 1, 
        scale: 1,
        x: 0,
        rotate: clue.rotation,
        transition: { type: "spring", duration: 0.8 }
      }}
      viewport={{ once: true }}
      className="absolute p-2 bg-white shadow-xl cursor-grab group max-w-[200px] md:max-w-[250px]"
      style={{
        left: `${clue.x}%`,
        top: `${clue.y}%`,
      }}
      onClick={onSelect}
    >
      {/* Tape Effect */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-red-500/20 backdrop-blur-[1px] rotate-2 shadow-sm z-10" />
      
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-900 border border-gray-200">
         <Image 
           src={clue.src} 
           alt={clue.title} 
           fill
           sizes="(max-width: 768px) 150px, 250px"
           className="object-cover transition-all duration-500 pointer-events-none group-hover:scale-110" 
         />
         <div className="absolute inset-0 bg-red-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <ZoomIn className="text-white w-8 h-8 drop-shadow-lg" />
         </div>
      </div>
      
      <div className="pt-2 pb-1 text-center bg-white">
        <p className="font-serif-sc font-bold text-black text-xs uppercase tracking-widest truncate px-1">
          {clue.title}
        </p>
      </div>
    </motion.div>
  );
}
