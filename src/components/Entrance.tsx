"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

interface EntranceProps {
  onEnter: () => void;
}

export default function Entrance({ onEnter }: EntranceProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-deep-black overflow-hidden cursor-pointer" onClick={onEnter}>
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial-gradient from-warm-light/5 to-transparent opacity-50" />
      
      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* The Script Book */}
        <motion.div 
          className="relative w-64 h-80 md:w-80 md:h-96 perspective-1000 group"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back Cover / Pages */}
          <div className="absolute inset-0 bg-[#e0d8c8] rounded-r-md shadow-2xl transform translate-x-2 translate-y-2 border-r-4 border-b-4 border-[#c0b8a8]"></div>
          <div className="absolute inset-0 bg-white rounded-r-md shadow-lg transform translate-x-1 translate-y-1 border-r-2 border-b-2 border-gray-200"></div>
          
          {/* Front Cover */}
          <motion.div 
            className="absolute inset-0 bg-[#1a1a1a] rounded-r-md shadow-2xl origin-left flex flex-col items-center justify-center border-l-4 border-gray-800"
            animate={{ rotateY: isHovered ? -25 : 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="border-2 border-warm-light/30 p-8 w-[85%] h-[85%] flex flex-col items-center justify-between">
              <span className="font-courier text-warm-light/50 text-xs tracking-[0.3em]">CONFIDENTIAL SCRIPT</span>
              
              <div className="text-center">
                <h1 className="font-serif-sc text-4xl md:text-5xl text-warm-light font-bold mb-2">轧戏</h1>
                <p className="font-courier text-fate-red text-sm tracking-widest">Double Booking</p>
              </div>

              <div className="w-full border-t border-warm-light/20 pt-4 flex justify-between text-[10px] font-courier text-warm-light/40">
                <span>SCENE: FINAL</span>
                <span>TAKE: 1</span>
              </div>
            </div>
          </motion.div>

          {/* Polaroid Photo (Placed next to book) */}
          <motion.div 
            className="absolute -bottom-12 -right-24 w-40 h-48 bg-white p-2 pb-8 shadow-xl rotate-12 z-20"
            initial={{ opacity: 0, scale: 0.8, rotate: 20 }}
            animate={{ opacity: 1, scale: 1, rotate: 12 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
             <div className="w-full h-full bg-gray-200 overflow-hidden relative">
               <img 
                 src="https://placehold.co/400x500/333/eee?text=H+&+X" 
                 alt="Couple" 
                 className="w-full h-full object-cover grayscale contrast-125 opacity-80"
               />
             </div>
             <p className="absolute bottom-2 left-0 w-full text-center font-handwriting text-black/60 text-xs font-courier transform -rotate-2">
               The Beginning
             </p>
          </motion.div>
        </motion.div>

        {/* Core Text Reveal */}
        <motion.div 
          className="text-center max-w-lg px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0.4, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-serif-sc text-warm-light text-lg md:text-xl leading-relaxed italic">
            “胡羞 & 肖稚宇：<br/>在无数个平行剧本里，我依然会爱上你。”
          </p>
          <motion.div 
            className="mt-8 flex items-center justify-center gap-2 text-fate-red text-sm font-courier tracking-widest uppercase"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <BookOpen size={16} />
            Click to Open Script
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
