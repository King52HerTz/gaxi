"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SECRET_ROOM_CLUES } from "@/data/drama-data";
import { Lock, Unlock, ZoomIn } from "lucide-react";

export default function SecretRoom() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeClue, setActiveClue] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Update mouse position for flashlight effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-black relative flex flex-col items-center justify-center py-24 px-4 overflow-hidden"
    >
      
      {/* Ambient Lighting (Before Unlock) */}
      {!isUnlocked && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-900/20 blur-[100px] rounded-full pointer-events-none" />
      )}

      {!isUnlocked ? (
        <motion.div 
          className="text-center z-10 cursor-pointer group"
          onClick={() => setIsUnlocked(true)}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="relative mb-8 inline-block">
             <div className="absolute inset-0 bg-red-500/20 blur-xl group-hover:blur-2xl transition-all duration-500" />
             <Lock className="w-16 h-16 text-white/50 group-hover:text-red-500 transition-colors duration-300 relative z-10" />
          </div>
          <h2 className="text-3xl font-serif tracking-[0.5em] text-white/30 group-hover:text-white transition-colors duration-500">
            SECRET ROOM
          </h2>
          <p className="text-red-500/50 text-xs mt-4 tracking-widest font-mono group-hover:text-red-500">
            [ CLICK TO ENTER ]
          </p>
        </motion.div>
      ) : (
        <div className="w-full max-w-6xl relative h-[80vh] cursor-none">
          {/* Header */}
          <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-4 relative z-20 pointer-events-none">
             <div>
               <h2 className="text-4xl font-bold text-white mb-2 font-sans">调查白板</h2>
               <p className="text-gray-400 font-mono text-sm">CASE FILE: 2004 GYMNASIUM COLLAPSE</p>
             </div>
             <button 
               onClick={(e) => {
                 e.stopPropagation(); // Prevent flashlight click issues if overlapping
                 setIsUnlocked(false);
               }}
               className="text-xs text-red-500 hover:text-white transition-colors flex items-center gap-2 font-mono pointer-events-auto cursor-pointer"
             >
               <Unlock size={14} /> LEAVE ROOM
             </button>
          </div>

          {/* Clues Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {SECRET_ROOM_CLUES.map((clue, index) => (
              <motion.div
                key={clue.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }} // Initially hidden by mask
                className="group relative cursor-pointer"
                onClick={() => setActiveClue(clue)}
              >
                {/* Tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/10 rotate-[-2deg] backdrop-blur-sm z-20 shadow-sm" />
                
                <div className="bg-[#1a1a1a] border border-white/5 p-6 h-64 flex flex-col justify-between hover:bg-[#222] transition-colors relative overflow-hidden">
                   {/* Background decoration */}
                   <div className="absolute inset-0 opacity-10 pointer-events-none">
                      {clue.type === "NEWSPAPER" && (
                        <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/lined-paper.png')]" />
                      )}
                      {clue.type === "BLUEPRINT" && (
                         <div className="w-full h-full bg-blueprint opacity-50" />
                      )}
                   </div>

                   <div className="relative z-10">
                     <span className="text-[10px] text-red-500 font-mono border border-red-500/30 px-2 py-1 rounded inline-block mb-4">
                       EVIDENCE #{clue.id}
                     </span>
                     <h3 className="text-xl font-bold text-white mb-2">{clue.title}</h3>
                     <p className="text-sm text-gray-400 line-clamp-3">{clue.content}</p>
                   </div>
                   
                   <div className="mt-4 flex justify-end">
                     <ZoomIn className="text-white/20 group-hover:text-white transition-colors" />
                   </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Flashlight Mask Overlay */}
          <div 
            className="absolute inset-0 z-30 pointer-events-none"
            style={{
              background: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, rgba(0,0,0,0.95) 100%)`
            }}
          />

          {/* Detailed View Modal */}
          <AnimatePresence>
            {activeClue && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-8 cursor-auto"
                onClick={() => setActiveClue(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="bg-[#111] border border-white/10 max-w-2xl w-full p-12 relative shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-900 to-transparent" />
                  
                  <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 font-sans tracking-tight">
                    {activeClue.title}
                  </h3>
                  
                  <div className="w-20 h-1 bg-red-600 mb-8" />
                  
                  <p className="text-xl text-gray-300 leading-relaxed font-serif">
                    {activeClue.content}
                  </p>

                  <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center text-xs font-mono text-gray-500">
                    <span>TYPE: {activeClue.type}</span>
                    <span>CLASSIFIED INFORMATION</span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}
    </section>
  );
}
