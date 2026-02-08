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

  // 音频源（使用占位符 URL 用于演示）
  // 在实际项目中，这些将是本地资源或托管文件
  const audioSrc = isReality 
    ? "/music/reality-theme.mp3" // 现实模式音乐文件
    : "/music/script-theme.mp3"; // 剧本模式音乐文件

  useEffect(() => {
    if (audioRef.current) {
      // 仅当 src 不同时更新，以防止重新开始/中断
      // 我们检查当前的绝对 src 是否以所需路径结尾
      if (!audioRef.current.src.endsWith(audioSrc)) {
        audioRef.current.src = audioSrc;
      }

      if (isPlaying) {
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

      {/* 可视化器 / 曲目信息 */}
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
          {/* 动画波形 */}
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
            {isReality ? "正在播放: 午后办公室" : "正在播放: 午夜爵士"}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
