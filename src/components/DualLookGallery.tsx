"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DUAL_GALLERY_IMAGES } from "@/data/drama-data";
import { GripVertical, Coins, HeartCrack } from "lucide-react";
import clsx from "clsx";

interface DualLookGalleryProps {
  mode: "reality" | "script";
}

export default function DualLookGallery({ mode }: DualLookGalleryProps) {
  const isReality = mode === "reality";
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="py-24 px-0 md:px-6 w-full overflow-hidden bg-black relative">
      {/* Film Strip Borders */}
      <div className="absolute top-0 left-0 w-full h-8 film-strip-border z-10 opacity-50" />
      <div className="absolute bottom-0 left-0 w-full h-8 film-strip-border z-10 opacity-50" />

      <div className="max-w-7xl mx-auto mb-12 px-6 relative z-20">
        <h2 className={clsx(
          "text-4xl md:text-6xl font-bold mb-4",
          isReality ? "text-white font-serif" : "text-script-text font-handwriting"
        )}>
          DUAL PERSONA
        </h2>
        <p className={clsx(
          "text-sm tracking-[0.3em] uppercase opacity-60",
          isReality ? "text-white" : "text-script-text"
        )}>
          Slide to reveal the truth beneath the mask
        </p>
      </div>

      {/* Fullscreen-ish Gallery */}
      <div className="relative w-full h-[80vh] md:h-[700px] flex items-center justify-center bg-black/5 z-20">
        <AnimatePresence mode="wait">
          <GalleryItem key={activeIdx} item={DUAL_GALLERY_IMAGES[activeIdx]} mode={mode} />
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-30">
          {DUAL_GALLERY_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={clsx(
                "w-3 h-3 rounded-full transition-all duration-300",
                activeIdx === idx 
                  ? (isReality ? "bg-reality-accent scale-125" : "bg-script-neon scale-125")
                  : "bg-white/30 hover:bg-white/50"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryItem({ item, mode }: { item: any, mode: "reality" | "script" }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      className="relative w-full h-full max-w-6xl mx-auto shadow-2xl overflow-hidden group"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* Container for Grayscale Hover Effect */}
      <div className="absolute inset-0 transition-all duration-700 grayscale-[80%] group-hover:grayscale-0 group-hover:scale-105 origin-center">
        
        {/* Right Image (Script - Underlying) */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${item.scriptSrc})` }}
        >
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
             <span className="font-handwriting text-script-text text-6xl md:text-9xl opacity-20 select-none">
               SCRIPT
             </span>
          </div>
        </div>

        {/* Left Image (Reality - Overlay) */}
        <div 
          className="absolute inset-0 bg-cover bg-center border-r-4 border-white overflow-hidden"
          style={{ 
            width: `${sliderPosition}%`,
            backgroundImage: `url(${item.realitySrc})`,
            borderRightColor: mode === "reality" ? "var(--reality-accent)" : "var(--script-neon)"
          }}
        >
          <div className="absolute inset-0 bg-white/10 flex items-center justify-center w-screen max-w-6xl">
             <span className="font-serif text-white text-6xl md:text-9xl opacity-20 select-none">
               REALITY
             </span>
          </div>
        </div>

      </div>

      {/* Special Effects Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {item.id === "gonghuaicong" && (
          <div className="absolute inset-0 flex items-center justify-center">
             {/* Falling Coins Animation could be here */}
             <motion.div 
               animate={{ y: [0, 100], opacity: [0, 1, 0] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="text-yellow-400"
             >
               <Coins size={64} />
             </motion.div>
          </div>
        )}
        {item.id === "wangguangming" && (
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="bg-black/50 absolute inset-0 backdrop-blur-[2px]" />
             <motion.div 
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               className="text-gray-400 relative z-10"
             >
               <HeartCrack size={80} />
             </motion.div>
          </div>
        )}
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 cursor-ew-resize z-20 flex items-center justify-center pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className={clsx(
          "w-12 h-12 rounded-full flex items-center justify-center shadow-xl backdrop-blur-sm transition-colors",
          mode === "reality" ? "bg-reality-accent text-white" : "bg-script-neon text-white"
        )}>
          <GripVertical size={20} />
        </div>
      </div>

      {/* Name Label */}
      <div className="absolute bottom-12 left-12 z-20 text-white drop-shadow-lg pointer-events-none">
        <h3 className="text-5xl font-bold mb-2">{item.name}</h3>
        <p className="text-sm tracking-widest opacity-80 uppercase">Drag to reveal identity</p>
      </div>
    </motion.div>
  );
}
