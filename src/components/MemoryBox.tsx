"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Archive, Ticket, Watch, MessageSquareQuote } from "lucide-react";

interface MemoryItem {
  id: string;
  icon: React.ReactNode;
  name: string;
  quote: string;
  color: string;
}

const MEMORIES: MemoryItem[] = [
  {
    id: "coins",
    icon: <Archive size={32} />,
    name: "沉甸甸的硬币",
    quote: "以为失去你的那一刻，我才发现，你比真相更重要。",
    color: "#feca57"
  },
  {
    id: "ticket",
    icon: <Ticket size={32} />,
    name: "演出门票",
    quote: "这张门票，是你哄我开心的证明，也是我心动的入场券。",
    color: "#ff6b6b"
  },
  {
    id: "contract",
    icon: <MessageSquareQuote size={32} />,
    name: "合租合同",
    quote: "白纸黑字签下的，不仅是房租，还有我们往后余生的羁绊。",
    color: "#48dbfb"
  }
];

export default function MemoryBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMemory, setActiveMemory] = useState<MemoryItem | null>(null);

  return (
    <section className="py-24 px-4 bg-deep-black flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative w-full max-w-md">
        
        {/* The Tin Box Container */}
        <motion.div 
          className="relative bg-[#2d3436] rounded-sm p-8 border-t border-white/10 shadow-2xl mx-auto cursor-pointer group"
          onClick={() => !isOpen && setIsOpen(true)}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          whileHover={{ y: isOpen ? 0 : -5 }}
        >
          {!isOpen ? (
            <div className="text-center py-12">
               <Archive className="w-16 h-16 text-warm-light/20 mx-auto mb-4 group-hover:text-fate-red/50 transition-colors" />
               <h3 className="font-courier text-warm-light/60 tracking-widest uppercase text-sm">The Memory Box</h3>
               <p className="text-xs text-warm-light/30 mt-2">Click to Open</p>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 gap-4"
            >
              {MEMORIES.map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-black/40 p-6 rounded flex flex-col items-center justify-center gap-4 hover:bg-black/60 transition-colors border border-white/5 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMemory(item);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-warm-light/80">{item.icon}</div>
                  <span className="text-xs font-courier text-warm-light/50">{item.name}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Close Button */}
          {isOpen && (
            <button 
              className="absolute -top-12 right-0 text-warm-light/30 hover:text-white text-xs font-courier"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
                setActiveMemory(null);
              }}
            >
              [CLOSE BOX]
            </button>
          )}
        </motion.div>

        {/* Memory Reveal Overlay */}
        <AnimatePresence>
          {activeMemory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 right-0 mt-8 text-center"
            >
              <div className="inline-block relative">
                 <MessageSquareQuote className="w-8 h-8 text-fate-red/20 absolute -top-4 -left-6" />
                 <p className="font-serif-sc text-xl text-warm-light italic leading-relaxed max-w-sm mx-auto">
                   "{activeMemory.quote}"
                 </p>
                 <div className="w-12 h-[1px] bg-fate-red/50 mx-auto mt-4" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
