"use client";

import { useState } from "react";
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
            className="fixed bottom-24 left-1/2 z-50 bg-black/80 text-white px-6 py-3 rounded-full flex items-center gap-3 backdrop-blur-md border border-white/10"
          >
            <CheckCircle2 className="text-green-400 w-5 h-5" />
            <div>
              <p className="text-sm font-bold">发现回忆: {lastCollected.name}</p>
              <p className="text-xs text-gray-400">{lastCollected.desc}</p>
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
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
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
                "bg-[#fdfbf7] rounded-sm shadow-2xl overflow-hidden relative transition-all duration-700",
                isLetterOpen ? "p-8 md:p-12 min-h-[70vh]" : "p-8 min-h-[300px] flex flex-col items-center justify-center cursor-pointer hover:shadow-[0_20px_50px_rgba(212,175,55,0.2)]"
              )}
              onClick={() => !isLetterOpen && setIsLetterOpen(true)}
              >
                {/* 纸张纹理覆盖 */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-60 pointer-events-none" />
                
                {/* 关闭按钮 */}
                <button 
                  onClick={handleCloseReward}
                  className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors z-20"
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
                    <div className="w-20 h-20 mx-auto mb-6 bg-reality-accent/10 rounded-full flex items-center justify-center text-reality-accent">
                       <ScrollText size={40} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-reality-text mb-3">
                      {FINAL_REWARD.title}
                    </h3>
                    <p className="font-handwriting text-2xl text-gray-500 italic">
                      {FINAL_REWARD.preview}
                    </p>
                    <motion.div 
                      className="mt-8 text-xs tracking-widest uppercase text-gray-400"
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
                      <h3 className="text-3xl font-serif font-bold text-reality-text mb-4">
                        {FINAL_REWARD.title}
                      </h3>
                      <div className="w-24 h-[1px] bg-reality-accent mx-auto" />
                    </div>
                    
                    <div className="font-handwriting text-xl md:text-2xl leading-loose text-gray-800 mb-8 max-h-[50vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent text-justify">
                      {Array.isArray(FINAL_REWARD.content) ? (
                        FINAL_REWARD.content.map((paragraph, index) => (
                          <motion.p
                            key={index}
                            className="mb-6 indent-10"
                            initial={{ opacity: 0, filter: "blur(4px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            transition={{
                              duration: 1.2,
                              delay: 0.8 + index * 0.5,
                              ease: "easeInOut"
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
                      <p className="font-handwriting text-xl text-gray-600">
                        — 观影人
                      </p>
                      <p className="text-xs font-sans text-gray-400 tracking-widest uppercase mt-1">
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
    </>
  );
}
