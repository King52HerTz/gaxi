"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { PARALLEL_PHONE_MESSAGES } from "@/data/drama-data";
import clsx from "clsx";

interface ParallelPhoneProps {
  mode: "reality" | "script";
}

export default function ParallelPhone({ mode }: ParallelPhoneProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isReality = mode === "reality";
  const messages = isReality ? PARALLEL_PHONE_MESSAGES.reality : PARALLEL_PHONE_MESSAGES.script;
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when opened
  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [isOpen, mode]);

  return (
    <div className="fixed bottom-8 right-24 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={clsx(
              "absolute bottom-16 right-0 w-80 h-[450px] rounded-3xl shadow-2xl overflow-hidden flex flex-col border transition-colors duration-500 origin-bottom-right",
              isReality 
                ? "bg-[#f5f5f5] border-gray-200" 
                : "bg-[#1a1a1a] border-[#333]"
            )}
          >
            {/* Header */}
            <div className={clsx(
              "p-4 flex items-center justify-between shrink-0",
              isReality ? "bg-[#ededed] border-b border-gray-300" : "bg-[#2a2a2a] border-b border-[#444]"
            )}>
              <span className={clsx("font-bold", isReality ? "text-black" : "text-[#d4af37] font-serif")}>
                {isReality ? "Xiao Zhiyu" : "Commander Qin"}
              </span>
              <button onClick={() => setIsOpen(false)}>
                <X size={18} className={isReality ? "text-gray-500" : "text-[#d4af37]"} />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className={clsx(
                "flex-1 p-4 overflow-y-auto space-y-4",
                isReality ? "bg-[#f5f5f5]" : "bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] bg-[#111]"
              )}
            >
              {messages.map((msg, idx) => {
                const isMe = msg.sender === "me";
                return (
                  <motion.div
                    key={`${mode}-${idx}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={clsx(
                      "flex flex-col max-w-[80%]",
                      isMe ? "ml-auto items-end" : "mr-auto items-start"
                    )}
                  >
                    <div className={clsx(
                      "px-3 py-2 rounded-lg text-sm relative",
                      isReality 
                        ? (isMe ? "bg-[#95ec69] text-black" : "bg-white text-black border border-gray-200")
                        : (isMe ? "bg-[#3a3a3a] text-[#d4af37] font-serif border border-[#d4af37]/30" : "bg-[#2a2a2a] text-[#a0a0a0] font-serif border border-[#444]")
                    )}>
                      {msg.text}
                      {/* Triangle for Script Mode */}
                      {!isReality && (
                        <div className={clsx(
                          "absolute top-0 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent",
                          isMe 
                            ? "-right-2 border-l-[8px] border-l-[#3a3a3a]" 
                            : "-left-2 border-r-[8px] border-r-[#2a2a2a]"
                        )} />
                      )}
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1">{msg.time}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Input Area (Visual Only) */}
            <div className={clsx(
              "p-3 border-t flex items-center gap-2",
              isReality ? "bg-[#f5f5f5] border-gray-300" : "bg-[#1a1a1a] border-[#333]"
            )}>
              <div className={clsx(
                "flex-1 h-9 rounded px-3 text-sm flex items-center",
                isReality ? "bg-white" : "bg-[#2a2a2a] text-gray-400 font-serif italic"
              )}>
                {isReality ? "" : "Type a message..."}
              </div>
              <Send size={18} className={isReality ? "text-gray-400" : "text-[#d4af37]"} />
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-500",
          isReality 
            ? "bg-[#95ec69] text-white hover:bg-[#85d65c]" 
            : "bg-[#2a2a2a] border border-[#d4af37] text-[#d4af37] hover:bg-[#333]"
        )}
      >
        <MessageCircle size={24} />
      </motion.button>
    </div>
  );
}
