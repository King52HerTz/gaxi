"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import clsx from "clsx";

interface Clue {
  id: number;
  src: string;
  caption: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

const CLUES: Clue[] = [
  {
    id: 1,
    src: "https://placehold.co/600x400/1c1c1c/FFF?text=ME+Club",
    caption: "Midnight Express 邀请函",
    x: 10,
    y: 10,
    rotation: -5,
    scale: 1,
  },
  {
    id: 2,
    src: "https://placehold.co/400x600/2a0a0a/FFF?text=Newspaper+2004",
    caption: "2004年事故旧报纸",
    x: 60,
    y: 15,
    rotation: 8,
    scale: 1.1,
  },
  {
    id: 3,
    src: "https://placehold.co/500x500/0a2a0a/FFF?text=Blueprints+Q",
    caption: "署名'Q'的设计图",
    x: 25,
    y: 45,
    rotation: -12,
    scale: 0.9,
  },
  {
    id: 4,
    src: "https://placehold.co/600x400/2a2a0a/FFF?text=Evidence",
    caption: "关键证据储存卡",
    x: 70,
    y: 55,
    rotation: 6,
    scale: 1.05,
  },
  {
    id: 5,
    src: "https://placehold.co/400x500/0a0a2a/FFF?text=Old+Photo",
    caption: "父亲们的旧合影",
    x: 40,
    y: 25,
    rotation: 3,
    scale: 1,
  },
];

export default function ClueWall() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedClue, setSelectedClue] = useState<Clue | null>(null);

  // SVG Lines connecting clues
  const lines = [
    { from: 1, to: 2 },
    { from: 2, to: 5 },
    { from: 5, to: 3 },
    { from: 3, to: 4 },
  ];

  return (
    <section className="relative min-h-screen py-24 overflow-hidden bg-[#050505]">
       <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 relative z-20"
        >
          <h2 className="text-3xl md:text-5xl font-serif-sc font-bold text-off-white mb-4">
            线索拼图
          </h2>
          <div className="h-1 w-24 bg-neon-red mx-auto mb-6" />
          <p className="font-courier text-white/50 tracking-widest uppercase text-sm">
            Connecting the dots • Drag to investigate
          </p>
        </motion.div>

      <div ref={containerRef} className="relative w-full h-[80vh] md:h-[100vh] bg-[url('https://www.transparenttextures.com/patterns/cork-board.png')] bg-opacity-10 border-t border-b border-white/10 overflow-hidden cursor-grab active:cursor-grabbing">
        
        {/* Connection Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60">
           {lines.map((line, i) => {
             const from = CLUES.find(c => c.id === line.from);
             const to = CLUES.find(c => c.id === line.to);
             if (!from || !to) return null;
             
             // Simple percentage based coordinates to absolute for SVG
             // Note: In a real responsive scenario, we'd need to calculate these dynamically based on container size
             // For this demo, we'll use percentage coordinates directly in SVG which works reasonably well
             return (
               <motion.line
                 key={i}
                 x1={`${from.x}%`}
                 y1={`${from.y}%`}
                 x2={`${to.x}%`}
                 y2={`${to.y}%`}
                 stroke="#ff2a2a"
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
        {CLUES.map((clue) => (
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
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-12 cursor-default"
              onClick={() => setSelectedClue(null)}
            >
              <motion.div
                layoutId={`clue-${selectedClue.id}`}
                className="relative max-w-5xl max-h-full bg-white p-2 rounded-sm shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedClue(null)}
                  className="absolute -top-12 right-0 text-white hover:text-neon-red transition-colors"
                >
                  <X size={32} />
                </button>
                <img 
                  src={selectedClue.src} 
                  alt={selectedClue.caption}
                  className="w-full h-full object-contain max-h-[80vh]"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-4 backdrop-blur-sm">
                  <p className="font-serif-sc text-xl tracking-widest text-center">{selectedClue.caption}</p>
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
        x: -50, // Initial offset for entrance
      }}
      whileInView={{ 
        opacity: 1, 
        scale: clue.scale,
        x: 0, // Reset to natural position (handled by left/top styles)
        rotate: clue.rotation,
        transition: { type: "spring", duration: 0.8 }
      }}
      viewport={{ once: true }}
      className="absolute p-2 bg-white shadow-xl cursor-grab group"
      style={{
        left: `${clue.x}%`,
        top: `${clue.y}%`,
        width: 'clamp(150px, 20vw, 300px)', // Responsive width
      }}
      onClick={onSelect}
    >
      {/* Tape Effect */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 backdrop-blur-[1px] rotate-2 shadow-sm z-10" />
      
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
         <img 
           src={clue.src} 
           alt={clue.caption} 
           className="w-full h-full object-cover sepia-[0.3] contrast-125 group-hover:sepia-0 transition-all duration-500 pointer-events-none" 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <ZoomIn className="text-white w-8 h-8 opacity-80" />
         </div>
      </div>
      
      <div className="pt-2 pb-1 text-center">
        <p className="font-handwriting font-bold text-black/80 text-xs md:text-sm uppercase tracking-widest font-courier transform rotate-[-1deg]">
          {clue.caption}
        </p>
      </div>
    </motion.div>
  );
}
