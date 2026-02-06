"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Glasses, ScrollText, Flower2, Flame, CheckCircle2, X } from "lucide-react";
import { SCAVENGER_ITEMS, FINAL_REWARD } from "@/data/drama-data";
import clsx from "clsx";

interface MemoryScavengerHuntProps {
  mode: "reality" | "script";
}

export default function MemoryScavengerHunt({ mode }: MemoryScavengerHuntProps) {
  const [collectedItems, setCollectedItems] = useState<string[]>([]);
  const [showReward, setShowReward] = useState(false);
  const [lastCollected, setLastCollected] = useState<any>(null);

  const isReality = mode === "reality";

  const handleCollect = (item: any) => {
    if (!collectedItems.includes(item.id)) {
      const newCollected = [...collectedItems, item.id];
      setCollectedItems(newCollected);
      setLastCollected(item);
      
      // Auto hide notification
      setTimeout(() => setLastCollected(null), 3000);

      // Check if all items collected
      if (newCollected.length === SCAVENGER_ITEMS.length) {
        setTimeout(() => setShowReward(true), 1500);
      }
    }
  };

  // Helper to render icon
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
      {/* 1. Scavenger Items (Hidden in fixed positions for now, ideally scattered in layout) */}
      {/* Item 1: VR Headset (Hero Section - Top Left) */}
      {!collectedItems.includes("vr-headset") && (
        <motion.button
          className="absolute top-24 left-10 md:left-24 z-20 text-gray-400/30 hover:text-reality-accent transition-colors"
          whileHover={{ scale: 1.2, rotate: 10 }}
          onClick={() => handleCollect(SCAVENGER_ITEMS[0])}
        >
          {renderIcon(SCAVENGER_ITEMS[0].icon, "w-8 h-8")}
        </motion.button>
      )}

      {/* Item 2: Old Blueprint (Timeline Section - Middle Right) */}
      {!collectedItems.includes("blueprint") && (
        <motion.button
          className="absolute top-[40%] right-10 z-20 text-gray-400/30 hover:text-reality-accent transition-colors"
          whileHover={{ scale: 1.2, rotate: -10 }}
          onClick={() => handleCollect(SCAVENGER_ITEMS[1])}
        >
          {renderIcon(SCAVENGER_ITEMS[1].icon, "w-8 h-8")}
        </motion.button>
      )}

      {/* Item 3: Sakura Petal (Character Section - Bottom Left) */}
      {!collectedItems.includes("petal") && (
        <motion.button
          className="absolute top-[70%] left-10 z-20 text-gray-400/30 hover:text-script-neon transition-colors"
          whileHover={{ scale: 1.2, rotate: 45 }}
          onClick={() => handleCollect(SCAVENGER_ITEMS[2])}
        >
          {renderIcon(SCAVENGER_ITEMS[2].icon, "w-8 h-8")}
        </motion.button>
      )}

      {/* Item 4: Lighter (Footer - Center) */}
      {!collectedItems.includes("lighter") && (
        <motion.button
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-gray-400/30 hover:text-orange-500 transition-colors"
          whileHover={{ scale: 1.2 }}
          onClick={() => handleCollect(SCAVENGER_ITEMS[3])}
        >
          {renderIcon(SCAVENGER_ITEMS[3].icon, "w-6 h-6")}
        </motion.button>
      )}

      {/* 2. Collection Notification */}
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
              <p className="text-sm font-bold">Memory Found: {lastCollected.name}</p>
              <p className="text-xs text-gray-400">{lastCollected.desc}</p>
            </div>
            <span className="ml-2 text-xs font-mono bg-white/20 px-2 py-1 rounded">
              {collectedItems.length}/{SCAVENGER_ITEMS.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Final Reward Modal */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowReward(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#fdfbf7] max-w-lg w-full p-8 md:p-12 rounded-sm shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Paper Texture Overlay */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 pointer-events-none" />
              
              <button 
                onClick={() => setShowReward(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors z-10"
              >
                <X size={24} />
              </button>

              <div className="relative z-10 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-reality-accent/10 rounded-full flex items-center justify-center text-reality-accent">
                   <ScrollText size={32} />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-reality-text mb-2">
                  {FINAL_REWARD.title}
                </h3>
                <div className="w-20 h-[1px] bg-reality-accent mx-auto mb-8" />
                
                <p className="font-handwriting text-2xl md:text-3xl leading-relaxed text-gray-700 mb-8">
                  {FINAL_REWARD.content}
                </p>

                <p className="text-xs font-sans text-gray-400 tracking-widest uppercase">
                  — Hu Xiu, 2026
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
