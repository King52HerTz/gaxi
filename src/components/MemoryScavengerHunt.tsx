"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Glasses, ScrollText, Flower2, Flame, CheckCircle2, X } from "lucide-react";
import { SCAVENGER_ITEMS, FINAL_REWARD } from "@/data/drama-data";
import clsx from "clsx";

interface MemoryScavengerHuntProps {
  mode: "reality" | "script";
}

// 基于 drama-data.ts 定义寻宝物品的结构
interface ScavengerItem {
  id: string;
  name: string;
  desc: string;
  icon: string;
}

export default function MemoryScavengerHunt({ mode }: MemoryScavengerHuntProps) {
  const [collectedItems, setCollectedItems] = useState<string[]>([]);
  const [showReward, setShowReward] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [lastCollected, setLastCollected] = useState<ScavengerItem | null>(null);
  const isReality = mode === "reality";

  // 当模式切换时重置收集状态
  useEffect(() => {
    setCollectedItems([]);
    setShowReward(false);
    setIsLetterOpen(false);
    setLastCollected(null);
  }, [mode]);

  const handleCollect = (item: ScavengerItem) => {
    if (!collectedItems.includes(item.id)) {
      const newCollected = [...collectedItems, item.id];
      setCollectedItems(newCollected);
      setLastCollected(item);
      
      // 自动隐藏通知
      setTimeout(() => setLastCollected(null), 3000);

      // 检查是否收集完所有物品
      if (newCollected.length === SCAVENGER_ITEMS.length) {
        setTimeout(() => setShowReward(true), 1500);
      }
    }
  };

  const handleCloseReward = () => {
    setShowReward(false);
    // 延迟重置信件状态，以便下次打开时是关闭状态
    setTimeout(() => setIsLetterOpen(false), 500);
  };

  // 渲染图标的辅助函数
  const renderIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case "headset": return <Glasses className={className} />;
      case "scroll": return <ScrollText className={className} />;
      case "flower": return <Flower2 className={className} />;
      case "flame": return <Flame className={className} />;
      default: return null;
    }
  };

  return (
    <>
      {/* 1. 寻宝物品（目前隐藏在固定位置，理想情况下应散布在布局中） */}
      {/* 物品 1: VR 眼镜（英雄区域 - 左上角） */}
      {!collectedItems.includes("vr-headset") && (
        <motion.button
          className={clsx(
            "absolute top-24 left-10 md:left-24 z-20 text-gray-400/30 transition-colors",
            mode === "reality" ? "hover:text-reality-accent" : "hover:text-script-neon"
          )}
          whileHover={{ scale: 1.2, rotate: 10 }}
          onClick={() => handleCollect(SCAVENGER_ITEMS[0])}
        >
          {renderIcon(SCAVENGER_ITEMS[0].icon, "w-8 h-8")}
        </motion.button>
      )}

      {/* 物品 2: 旧图纸（时间线区域 - 中右侧） */}
      {!collectedItems.includes("blueprint") && (
        <motion.button
          className={clsx(
            "absolute top-[40%] right-10 z-20 text-gray-400/30 transition-colors",
            mode === "reality" ? "hover:text-reality-accent" : "hover:text-script-neon"
          )}
          whileHover={{ scale: 1.2, rotate: -10 }}
          onClick={() => handleCollect(SCAVENGER_ITEMS[1])}
        >
          {renderIcon(SCAVENGER_ITEMS[1].icon, "w-8 h-8")}
        </motion.button>
      )}

      {/* 物品 3: 樱花瓣（角色区域 - 左下角） */}
      {!collectedItems.includes("petal") && (
        <motion.button
          className={clsx(
            "absolute top-[70%] left-10 z-20 text-gray-400/30 transition-colors",
            mode === "reality" ? "hover:text-reality-accent" : "hover:text-script-neon"
          )}
          whileHover={{ scale: 1.2, rotate: 45 }}
          onClick={() => handleCollect(SCAVENGER_ITEMS[2])}
        >
          {renderIcon(SCAVENGER_ITEMS[2].icon, "w-8 h-8")}
        </motion.button>
      )}

      {/* 物品 4: 打火机（页脚 - 中间） */}
      {!collectedItems.includes("lighter") && (
        <motion.button
          className={clsx(
            "absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-gray-400/30 transition-colors",
            mode === "reality" ? "hover:text-orange-500" : "hover:text-script-neon"
          )}
          whileHover={{ scale: 1.2 }}
          onClick={() => handleCollect(SCAVENGER_ITEMS[3])}
        >
          {renderIcon(SCAVENGER_ITEMS[3].icon, "w-6 h-6")}
        </motion.button>
      )}

      {/* 2. 收集通知 */}
      <AnimatePresence>
        {lastCollected && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            className={clsx(
              "fixed bottom-24 left-1/2 z-50 px-6 py-3 rounded-full flex items-center gap-3 backdrop-blur-md border",
              isReality
                ? "bg-black/80 text-white border-white/10"
                : "bg-[#050a1a]/80 text-blue-100 border-white/10"
            )}
          >
            <CheckCircle2 className={clsx("w-5 h-5", isReality ? "text-green-400" : "text-blue-200")} />
            <div>
              <p className="text-sm font-bold">发现回忆: {lastCollected.name}</p>
              <p className={clsx("text-xs", isReality ? "text-gray-400" : "text-blue-200/70")}>{lastCollected.desc}</p>
            </div>
            <span className="ml-2 text-xs font-mono bg-white/20 px-2 py-1 rounded">
              {collectedItems.length}/{SCAVENGER_ITEMS.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. 最终奖励弹窗 */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={clsx(
              "fixed inset-0 z-[60] flex items-center justify-center p-4 backdrop-blur-sm",
              isReality ? "bg-black/60" : "bg-[#050a1a]/70"
            )}
            onClick={handleCloseReward}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, rotateX: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                rotateX: isLetterOpen ? 0 : 0 // 如果需要，稍后可以添加翻转效果
              }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={clsx(
                "relative transition-all duration-700 ease-in-out",
                isLetterOpen ? "max-w-2xl w-full" : "max-w-md w-full"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 信封/信件容器 */}
              <div className={clsx(
                "rounded-sm shadow-2xl overflow-hidden relative transition-all duration-700",
                isLetterOpen ? "p-8 md:p-12 min-h-[70vh]" : "p-8 min-h-[300px] flex flex-col items-center justify-center cursor-pointer hover:shadow-[0_20px_50px_rgba(212,175,55,0.2)]",
                isReality ? "bg-[#fdfbf7]" : "bg-[#050a1a] border border-blue-500/30"
              )}
              onClick={() => !isLetterOpen && setIsLetterOpen(true)}
              >
                {/* 纸张纹理覆盖 */}
                {isReality && (
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-60 pointer-events-none" />
                )}
                {!isReality && (
                   <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.15)_0%,transparent_70%)]" />
                )}
                
                {/* 关闭按钮 */}
                <button 
                  onClick={handleCloseReward}
                  className={clsx(
                    "absolute top-4 right-4 transition-colors z-20",
                    isReality ? "text-gray-400 hover:text-black" : "text-blue-400/50 hover:text-blue-300"
                  )}
                >
                  <X size={24} />
                </button>

                {!isLetterOpen ? (
                  /* 关闭状态：信封提示 */
                  <motion.div  
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center relative z-10"
                  >
                    <div className={clsx(
                      "w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center",
                      isReality ? "bg-reality-accent/10 text-reality-accent" : "bg-blue-900/20 text-blue-300 border border-blue-500/30"
                    )}>
                       <ScrollText size={40} />
                    </div>
                    <h3 className={clsx(
                      "text-xl md:text-2xl font-bold mb-3",
                      isReality ? "font-serif text-reality-text" : "font-sans text-blue-100 tracking-widest"
                    )}>
                      {FINAL_REWARD.title}
                    </h3>
                    <p className={clsx(
                      "text-2xl italic",
                      isReality ? "font-handwriting text-gray-500" : "font-serif text-blue-300/60"
                    )}>
                      {FINAL_REWARD.preview}
                    </p>
                    <motion.div 
                      className={clsx(
                        "mt-8 text-xs tracking-widest uppercase",
                        isReality ? "text-gray-400" : "text-blue-400/60"
                      )}
                      animate={{ y: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      点击拆开信件
                    </motion.div>
                  </motion.div>
                ) : (
                  /* 打开状态：信件内容 */
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="relative z-10"
                  >
                    <div className="text-center mb-8">
                      <h3 className={clsx(
                        "text-3xl font-bold mb-4",
                        isReality ? "font-serif text-reality-text" : "font-sans text-blue-50 tracking-[0.2em] text-shadow-neon"
                      )}>
                        {FINAL_REWARD.title}
                      </h3>
                      <div className={clsx(
                        "w-24 h-[1px] mx-auto",
                        isReality ? "bg-reality-accent" : "bg-blue-500 shadow-[0_0_10px_#3b82f6]"
                      )} />
                    </div>
                    
                    <div className={clsx(
                      "text-xl md:text-2xl leading-loose mb-8 max-h-[70vh] overflow-y-auto pr-4 text-justify custom-scrollbar",
                      isReality 
                        ? "font-handwriting text-gray-800" 
                        : "font-handwriting text-blue-50"
                    )}
                    data-mode={mode}
                    >
                      {Array.isArray(FINAL_REWARD.content) ? (
                        FINAL_REWARD.content.map((paragraph, index) => (
                          <motion.p
                            key={index}
                            className="mb-6 indent-10"
                            initial={{ opacity: 0, x: -10 }} // 手写效果：稍微带点横向位移
                            whileInView={{ opacity: 1, x: 0 }} // 改为 whileInView 以支持滚动阅读时触发动画
                            viewport={{ once: true, margin: "-10%" }} // 设置触发视口
                            transition={{
                              duration: 2.5, // 更慢的持续时间，模拟写字
                              ease: "easeOut"
                            }}
                          >
                            {paragraph}
                          </motion.p>
                        ))
                      ) : (
                        <p>{FINAL_REWARD.content}</p>
                      )}
                    </div>

                    <div className="text-right mt-8">
                      <p className={clsx(
                        "font-handwriting text-xl",
                        isReality ? "text-gray-600" : "text-blue-200/80"
                      )}>
                        — Eliauk
                      </p>
                      <p className={clsx(
                        "text-xs tracking-widest uppercase mt-1",
                        isReality ? "font-sans text-gray-400" : "font-mono text-blue-400/50"
                      )}>
                        2026.02.07
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style jsx global>{`
        /* 自定义滚动条样式 - 观影随笔 */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 3px;
        }
        
        /* 现实模式滚动条 (金色) */
        .custom-scrollbar[data-mode='reality']::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.3); /* 香槟金半透明 */
          border-radius: 3px;
          transition: background 0.3s;
        }
        .custom-scrollbar[data-mode='reality']::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.6);
        }

        /* 剧本模式滚动条 (深蓝色) */
        .custom-scrollbar[data-mode='script']::-webkit-scrollbar-thumb {
          background: rgba(30, 64, 175, 0.5); /* 深蓝色 (blue-800) 半透明 */
          border-radius: 3px;
          transition: background 0.3s;
        }
        .custom-scrollbar[data-mode='script']::-webkit-scrollbar-thumb:hover {
          background: rgba(30, 64, 175, 0.8);
        }
      `}</style>
    </>
  );
}