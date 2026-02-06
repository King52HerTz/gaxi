"use client";

import { useState } from "react";
import Entrance from "@/components/Entrance";
import RelationshipBoard from "@/components/RelationshipBoard";
import CharacterFiles from "@/components/CharacterFiles";
import MemoryBox from "@/components/MemoryBox";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  return (
    <main className="min-h-screen bg-deep-black text-warm-light selection:bg-fate-red selection:text-white">
      <AnimatePresence mode="wait">
        {!showContent ? (
          <motion.div 
            key="entrance"
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            <Entrance onEnter={() => setShowContent(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col"
          >
            <RelationshipBoard />
            <CharacterFiles />
            <MemoryBox />
            
            <footer className="py-12 text-center font-courier text-xs text-warm-light/20">
              <p>THE SCRIPT IS FICTION, THE LOVE IS REAL.</p>
              <p className="mt-2">Double Booking Fan Page</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
