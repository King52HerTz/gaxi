"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { HEARTBEAT_QUOTES } from "@/data/drama-data";
import clsx from "clsx";

interface HeartbeatButtonProps {
  mode: "reality" | "script";
}

export default function HeartbeatButton({ mode }: HeartbeatButtonProps) {
  const [quote, setQuote] = useState<string | null>(null);
  const isReality = mode === "reality";

  const handleHeartbeat = () => {
    const randomQuote = HEARTBEAT_QUOTES[Math.floor(Math.random() * HEARTBEAT_QUOTES.length)];
    setQuote(randomQuote);
    
    // Auto hide after 3 seconds
    setTimeout(() => setQuote(null), 3000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end pointer-events-none">
      
      {/* Quote Bubble */}
      <AnimatePresence>
        {quote && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className={clsx(
              "mb-4 p-4 rounded-2xl max-w-xs shadow-xl text-sm leading-relaxed pointer-events-auto",
              isReality 
                ? "bg-white text-reality-text border border-[#eee]" 
                : "bg-[#050a1a]/90 text-script-text border border-script-neon/30 text-shadow-neon"
            )}
          >
            {quote}
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Button */}
      <motion.button
        onClick={handleHeartbeat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={clsx(
          "w-14 h-14 rounded-full flex items-center justify-center shadow-2xl pointer-events-auto transition-colors duration-500",
          isReality 
            ? "bg-reality-accent text-white hover:bg-[#c5a028]" 
            : "bg-script-neon text-white hover:bg-[#8fd3ff] animate-pulse"
        )}
      >
        <Heart className="w-6 h-6 fill-current" />
      </motion.button>
    </div>
  );
}
