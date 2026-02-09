"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CHARACTERS, HERO_CONTENT } from "@/data/drama-data";
import clsx from "clsx";
import { User, QrCode, Sparkles, Flame } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

interface HeroSectionProps {
  mode: "reality" | "script";
  onToggle: () => void;
  isTransitioning?: boolean;
}

export default function HeroSection({ mode, onToggle, isTransitioning }: HeroSectionProps) {
  const isReality = mode === "reality";
  const content = isReality ? HERO_CONTENT.reality : HERO_CONTENT.script;
  const badgePhotoSrc =
    CHARACTERS.find((c) => c.id === "huxiu")?.reality?.photo ?? "/photo/hu02.png";

  const [snowParticles, setSnowParticles] = useState<{ left: string; width: string; height: string; duration: string; delay: string }[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSnowParticles(
        Array.from({ length: 50 }).map(() => ({
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 4 + 2}px`,
          height: `${Math.random() * 4 + 2}px`,
          duration: `${Math.random() * 5 + 5}s`,
          delay: `${Math.random() * 5}s`
        }))
      );
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      
      {/* 动态背景效果 - 剧本模式下的雪花 */}
      {mode === "script" && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {snowParticles.map((particle, i) => (
            <div
              key={i}
              className="snow-particle"
              style={{
                left: particle.left,
                width: particle.width,
                height: particle.height,
                animationDuration: particle.duration,
                animationDelay: particle.delay
              }}
            />
          ))}
        </div>
      )}

      {/* 主要内容 */}
      <div className="relative z-10 max-w-4xl w-full">
        
        {/* 标题 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <h1 className={clsx(
              "text-5xl md:text-8xl font-bold mb-6 tracking-tight",
              isReality 
                ? "font-serif text-reality-text" // 现实：标准衬线体
                : "font-handwriting text-script-text text-shadow-neon tracking-widest" // 剧本：手写体/书法体
            )}>
              {content.title}
            </h1>
            
            <p className={clsx(
              "text-lg md:text-2xl mb-12 tracking-widest uppercase",
              isReality 
                ? "font-sans text-reality-text/70" 
                : "font-serif text-script-text/80 font-italic"
            )}>
              {content.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* 切换开关：车票 (现实 -> 进入容城) vs 工牌 (剧本 -> 返回上海) */}
        <div className={clsx(
          "flex justify-center mb-16 relative h-48 md:h-64 perspective-1000",
          isTransitioning && "pointer-events-none opacity-50"
        )}>
          <AnimatePresence mode="wait">
             {isReality ? (
               <motion.button
                 key="ticket"
                 onClick={onToggle}
                 initial={{ opacity: 0, rotateX: -90 }}
                 animate={{ opacity: 1, rotateX: 0 }}
                 exit={{ opacity: 0, y: 50 }}
                 whileHover={{ scale: 1.05, rotate: -2 }}
                 whileTap={{ scale: 0.95 }}
                 className="relative w-64 h-32 bg-[#f4e4bc] rounded-sm shadow-[0_0_30px_rgba(255,0,0,0.3)] flex overflow-hidden border-2 border-dashed border-[#8b4513] group"
               >
                 {/* 车票纹理 */}
                 <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.15%22/%3E%3C/svg%3E')] opacity-50" />
                 
                 {/* 副券部分 */}
                 <div className="w-16 border-r-2 border-dashed border-[#8b4513] flex flex-col items-center justify-center p-2 relative z-10">
                    <span className="writing-vertical text-xs font-bold text-[#8b4513] opacity-60">NO. 026</span>
                 </div>
                 
                 {/* 主券部分 */}
                 <div className="flex-1 p-4 flex flex-col justify-between relative z-10">
                    <div className="flex justify-between items-start">
                       <div>
                         <h3 className="font-serif-sc font-bold text-2xl text-[#5c2e0e] leading-none mb-1">午夜</h3>
                         <h3 className="font-serif-sc font-bold text-xl text-[#5c2e0e] leading-none">快车</h3>
                       </div>
                       <div className="w-8 h-8 rounded-full border border-[#8b4513] flex items-center justify-center transform rotate-12">
                          <span className="text-[8px] font-bold text-[#8b4513]">ME</span>
                       </div>
                    </div>
                    
                    <div className="flex justify-between items-end">
                       <p className="text-[10px] font-mono text-[#8b4513]/70">目的地：容城</p>
                       <span className="text-xs font-bold text-[#8b4513] flex items-center gap-1 group-hover:text-red-600 transition-colors">
                          点击入局 <Flame size={12} />
                       </span>
                    </div>
                 </div>
               </motion.button>
             ) : (
               <motion.button
                 key="badge"
                 onClick={onToggle}
                 initial={{ opacity: 0, rotateY: 90 }}
                 animate={{ opacity: 1, rotateY: 0 }}
                 exit={{ opacity: 0, scale: 1.2, filter: "brightness(2) blur(4px)" }}
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="relative w-48 h-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl flex flex-col items-center overflow-hidden group"
               >
                 {/* 工牌设计 */}
                 <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
                 
                 {/* 挂绳孔 */}
                 <div className="w-12 h-2 bg-gray-300 rounded-full mt-4 mb-2 opacity-50" />
                 
                 {/* 内容区域 */}
                 <div className="w-full px-4 py-2 flex flex-col items-center z-10">
                    <div className="w-full flex justify-between items-center mb-4 opacity-70">
                       <span className="text-[8px] tracking-widest uppercase font-bold">Dynamism</span>
                       <QrCode size={16} />
                    </div>
                    
                    {/* 证件照区域 */}
                    <div className="w-20 h-24 bg-gray-200 mb-3 overflow-hidden rounded-sm relative ring-1 ring-black/10 shadow-[0_6px_18px_rgba(0,0,0,0.25)]">
                        <User className="absolute inset-0 m-auto text-gray-400 w-10 h-10" />
                        <Image
                          src={badgePhotoSrc}
                          alt="胡羞"
                          fill
                          sizes="80px"
                          className="object-cover"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-white/10" />
                    </div>
                    
                    <h3 className="font-serif font-bold text-reality-text mb-1">胡羞</h3>
                    <p className="text-[10px] text-gray-500 tracking-wider mb-4">建筑师助理</p>
                    
                    {/* 返回交互提示 */}
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-red-900/40 to-transparent flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className="text-xs font-bold text-red-200 flex items-center gap-1">
                         <Sparkles size={12} /> 返回上海
                       </span>
                    </div>
                 </div>
               </motion.button>
             )}
          </AnimatePresence>
        </div>

        {/* 引用文案 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`quote-${mode}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="max-w-2xl mx-auto"
          >
            <p className={clsx(
              "text-xl md:text-3xl leading-relaxed",
              isReality 
                ? "font-serif text-reality-text/80 italic" 
                : "font-handwriting text-script-text not-italic"
            )}>
              {content.quote}
            </p>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
