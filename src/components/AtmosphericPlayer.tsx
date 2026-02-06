"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import clsx from "clsx";

interface AtmosphericPlayerProps {
  mode: "reality" | "script";
}

export default function AtmosphericPlayer({ mode }: AtmosphericPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isReality = mode === "reality";

  // Audio sources (Using placeholder URLs for demo purposes)
  // In a real project, these would be local assets or hosted files
  const audioSrc = isReality 
    ? "/music/reality-theme.mp3" // 您的现实模式音乐文件
    : "/music/script-theme.mp3"; // 您的剧本模式音乐文件

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.src = audioSrc;
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [mode, isPlaying, audioSrc]);

  return (
    <div className="fixed bottom-8 left-8 z-50 flex items-center gap-4">
      <audio ref={audioRef} loop />
      
      <motion.button
        onClick={() => setIsPlaying(!isPlaying)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={clsx(
          "w-12 h-12 rounded-full flex items-center justify-center shadow-lg border transition-colors duration-500",
          isReality 
            ? "bg-white border-gray-200 text-reality-text hover:bg-gray-50" 
            : "bg-black border-script-neon/30 text-script-neon hover:bg-black/80"
        )}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </motion.button>

      {/* Visualizer / Track Info */}
      <motion.div 
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: isPlaying ? "auto" : 0, opacity: isPlaying ? 1 : 0 }}
        className="overflow-hidden whitespace-nowrap"
      >
        <div className={clsx(
          "px-4 py-2 rounded-full text-xs font-mono border backdrop-blur-md flex items-center gap-2",
          isReality 
            ? "bg-white/80 border-gray-200 text-gray-600" 
            : "bg-black/60 border-script-neon/20 text-script-neon"
        )}>
          {/* Animated Waveform */}
          <div className="flex items-end gap-[2px] h-3">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={clsx("w-[2px] rounded-full", isReality ? "bg-reality-accent" : "bg-script-neon")}
                animate={{ height: ["20%", "100%", "20%"] }}
                transition={{ 
                  duration: 0.8, 
                  repeat: Infinity, 
                  delay: i * 0.1,
                  ease: "easeInOut" 
                }}
              />
            ))}
          </div>
          <span>
            {isReality ? "Now Playing: Afternoon Office" : "Now Playing: Midnight Jazz"}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
