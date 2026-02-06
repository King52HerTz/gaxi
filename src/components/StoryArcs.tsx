"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { STORY_ARCS } from "@/data/drama-data";
import { ChevronRight } from "lucide-react";
import clsx from "clsx";

interface StoryArcsProps {
  mode: "reality" | "script";
}

export default function StoryArcs({ mode }: StoryArcsProps) {
  const [activeArc, setActiveArc] = useState(STORY_ARCS[0].id);
  const isReality = mode === "reality";

  const highlightText = (text: string) => {
    // 基于正则的简单高亮器 (可以改进)
    const keywords = ["胡羞", "肖稚宇", "秦宵一", "容城", "Dynamism"];
    const regex = new RegExp(`(${keywords.join("|")})`, "g");
    
    return text.split(regex).map((part, i) => {
      if (keywords.includes(part)) {
        return (
          <span 
            key={i} 
            className={clsx(
              "font-bold px-1 rounded transition-colors",
              isReality 
                ? "text-reality-accent bg-reality-accent/10" 
                : "text-script-neon bg-script-neon/10"
            )}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <section className="py-24 px-6 min-h-[80vh] flex flex-col md:flex-row max-w-7xl mx-auto gap-8 md:gap-16">
      
      {/* 侧边栏 / 选项卡 */}
      <div className="w-full md:w-1/3 flex flex-col gap-4">
        <h2 className={clsx(
          "text-3xl font-bold mb-8 transition-colors",
          isReality ? "text-reality-text font-serif" : "text-script-text font-handwriting"
        )}>
          STORY ARCHIVES
        </h2>
        
        {STORY_ARCS.map((arc) => (
          <motion.button
            key={arc.id}
            onClick={() => setActiveArc(arc.id)}
            className={clsx(
              "text-left p-6 border-l-4 transition-all duration-300 group relative overflow-hidden",
              activeArc === arc.id
                ? (isReality 
                    ? "border-reality-accent bg-white shadow-lg" 
                    : "border-script-neon bg-white/5 shadow-[0_0_20px_rgba(255,0,76,0.2)]")
                : (isReality 
                    ? "border-transparent hover:bg-white/50" 
                    : "border-transparent hover:bg-white/5")
            )}
          >
            <span className={clsx(
              "text-xs font-bold tracking-widest block mb-2",
              activeArc === arc.id
                ? (isReality ? "text-reality-accent" : "text-script-neon")
                : "text-gray-500"
            )}>
              {arc.episodes}
            </span>
            <h3 className={clsx(
              "text-xl font-bold",
              isReality ? "text-reality-text" : "text-script-text"
            )}>
              {isReality ? arc.reality.title : arc.script.title}
            </h3>
            
            {activeArc === arc.id && (
              <motion.div 
                layoutId="activeIndicator"
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <ChevronRight size={20} className={isReality ? "text-reality-accent" : "text-script-neon"} />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {/* 内容区域 */}
      <div className="w-full md:w-2/3 relative min-h-[500px]">
        <AnimatePresence mode="wait">
          {STORY_ARCS.map((arc) => {
            if (arc.id !== activeArc) return null;
            const currentContent = isReality ? arc.reality : arc.script;
            
            return (
              <motion.div
                key={arc.id + mode} // 添加 mode 到 key 以在切换时强制重新渲染
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className={clsx(
                  "h-full p-8 md:p-12 border transition-colors duration-500",
                  isReality 
                    ? "bg-white border-gray-200 shadow-xl" 
                    : "bg-black/40 border-white/10 backdrop-blur-md shadow-2xl"
                )}
              >
                {/* 引用注入 */}
                <div className={clsx(
                  "mb-8 pb-8 border-b italic text-2xl font-serif leading-relaxed",
                  isReality 
                    ? "text-reality-text/80 border-gray-200" 
                    : "text-script-text border-white/10"
                )}>
                  {currentContent.quote}
                </div>

                {/* 叙述文本 */}
                <div className={clsx(
                  "space-y-6 text-lg leading-loose",
                  isReality 
                    ? "text-gray-600 font-sans" 
                    : "text-gray-300 font-serif"
                )}>
                  {currentContent.content.map((paragraph, idx) => (
                    <p key={idx}>{highlightText(paragraph)}</p>
                  ))}
                </div>

                {/* 装饰元素 */}
                <div className={clsx(
                  "absolute -bottom-4 -right-4 text-9xl font-bold opacity-5 pointer-events-none select-none",
                  isReality ? "text-black" : "text-white"
                )}>
                  {arc.id.replace("act", "")}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
