"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileSignature } from "lucide-react";

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  const [textComplete, setTextComplete] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const sentence = "你以为你在演戏，其实你已入局。";
  const characters = sentence.split("");

  const handleEnter = () => {
    setIsExiting(true);
    // Simulate sound delay or just wait for animation
    setTimeout(() => {
      onEnter();
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(10px)",
      transition: { duration: 0.8 },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50 px-4 md:px-0 overflow-hidden"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
          onAnimationComplete={() => setTextComplete(true)}
        >
          <div className="w-full text-center">
            <h1 className="text-[1.3rem] sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[0.15em] text-off-white mb-12 h-20 md:h-24 whitespace-nowrap overflow-visible font-serif-sc">
              {characters.map((char, index) => (
                <motion.span
                  key={index}
                  variants={charVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-[2px] md:w-1 h-5 md:h-10 bg-neon-red ml-2 md:ml-4 align-middle translate-y-[-2px] md:translate-y-[-4px]"
              />
            </h1>

            {textComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <button
                  onClick={handleEnter}
                  className="group relative inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-transparent border border-off-white/30 text-off-white hover:border-spotlight-yellow hover:text-spotlight-yellow transition-all duration-300 uppercase tracking-widest text-xs md:text-base overflow-hidden font-courier"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <FileSignature className="w-4 h-4 md:w-5 md:h-5" />
                    签署演出合同
                  </span>
                  <div className="absolute inset-0 bg-spotlight-yellow/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </button>
                
                <p className="mt-6 text-[10px] md:text-xs text-white/30 font-light tracking-[0.2em] uppercase font-courier">
                  Double Booking - Protocol Initialized
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
