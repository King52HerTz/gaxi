"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Moment {
  id: number;
  type: "photo" | "gif" | "note";
  src: string;
  title: string;
  desc: string;
  date: string;
  x: number; // Percentage position for layout
  y: number;
  rotation: number;
}

const MOMENTS: Moment[] = [
  {
    id: 1,
    type: "photo",
    src: "https://placehold.co/600x400/2a2a2a/F4E7D3?text=First+Meet",
    title: "初遇 · 剧本杀店",
    desc: "“你是玩家，还是NPC？” 第一次见面，她以为他是冷漠的DM，他以为她是捣乱的玩家。命运的齿轮在这一刻卡了一下，然后开始疯狂转动。",
    date: "EPISODE 01",
    x: 5,
    y: 20,
    rotation: -3
  },
  {
    id: 2,
    type: "photo",
    src: "https://placehold.co/400x600/333/F4E7D3?text=Heartbeat",
    title: "动心 · 雨中对视",
    desc: "雨下得很大，戏里的台词念完了，戏外的心跳却刚刚开始。他下意识地为她挡雨，那一刻，不需要剧本。",
    date: "EPISODE 05",
    x: 35,
    y: 40,
    rotation: 5
  },
  {
    id: 3,
    type: "note",
    src: "", // No image for note
    title: "误会 · 撕碎的线索",
    desc: "“原来你接近我，只是为了通关？” 信任的崩塌只需要一句话。那张被撕碎的线索纸条，就像他们当时岌岌可危的关系。",
    date: "EPISODE 08",
    x: 60,
    y: 15,
    rotation: -8
  },
  {
    id: 4,
    type: "gif",
    src: "https://placehold.co/600x400/1a1a1a/F4E7D3?text=Kiss",
    title: "定情 · 戏中戏",
    desc: "在剧本的高潮，他终于说出了那句不在台词本上的话：“我不想演了，我想爱你。” 这一吻，是真的。",
    date: "EPISODE 12",
    x: 85,
    y: 30,
    rotation: 2
  }
];

export default function RelationshipBoard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });
  const [selectedMoment, setSelectedMoment] = useState<Moment | null>(null);

  // Calculate SVG path points based on MOMENTS positions
  // Note: In a real app with responsive width, these would need to be calculated dynamically based on container width
  // For this horizontal scroll demo, we assume a fixed wide container
  const containerWidth = 3000; // Virtual width of the scroll area

  return (
    <section className="relative h-screen bg-deep-black overflow-hidden flex flex-col justify-center">
      <div className="absolute top-8 left-8 z-10">
        <h2 className="text-3xl font-serif-sc text-warm-light font-bold">红线墙</h2>
        <p className="font-courier text-fate-red text-xs tracking-widest mt-1">THE RED THREAD OF FATE</p>
      </div>

      <div 
        ref={containerRef}
        className="w-full h-full overflow-x-auto overflow-y-hidden hide-scrollbar cursor-grab active:cursor-grabbing flex items-center"
      >
        <div className="relative h-[80%] min-w-[3000px] flex items-center px-24">
          {/* The Red Thread SVG */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
             <motion.path
               d={`M ${MOMENTS.map((m, i) => {
                 const x = (m.x / 100) * containerWidth;
                 const y = (m.y / 100) * 600 + 100; // Approximate vertical centering
                 return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
               }).join(' ')}`}
               fill="none"
               stroke="#C23B22"
               strokeWidth="2"
               initial={{ pathLength: 0, opacity: 0 }}
               whileInView={{ pathLength: 1, opacity: 0.8 }}
               transition={{ duration: 2, ease: "easeInOut" }}
             />
             {/* Drooping effect simulated with quadratic bezier curves could be added for more realism */}
          </svg>

          {/* Moments */}
          {MOMENTS.map((moment) => (
            <motion.div
              key={moment.id}
              className="absolute cursor-pointer group"
              style={{
                left: `${moment.x}%`,
                top: `${moment.y}%`,
                rotate: moment.rotation
              }}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              onClick={() => setSelectedMoment(moment)}
              whileHover={{ scale: 1.05, zIndex: 10 }}
            >
              {/* Pin */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-fate-red shadow-md z-20 border border-black/30" />
              
              <div className="bg-white p-2 pb-8 shadow-xl relative overflow-hidden w-64 md:w-80">
                {moment.type === 'note' ? (
                  <div className="w-full h-48 bg-[#f0f0f0] p-4 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/lined-paper.png')]"></div>
                    <p className="font-handwriting font-serif-sc text-black text-center italic text-sm">
                      "{moment.desc.substring(0, 30)}..."
                    </p>
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-black/10 rotate-45 translate-y-4 translate-x-4"></div>
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gray-200 overflow-hidden relative">
                    <img src={moment.src} alt={moment.title} className="w-full h-full object-cover sepia-[0.2]" />
                    <div className="absolute inset-0 bg-warm-light/10 mix-blend-overlay" />
                  </div>
                )}
                
                <div className="absolute bottom-2 left-4 font-courier text-black/70 text-xs font-bold uppercase tracking-wider">
                  {moment.date}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Detail View */}
      <AnimatePresence>
        {selectedMoment && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMoment(null)}
          >
            <motion.div 
              className="bg-deep-black border border-warm-light/20 max-w-4xl w-full p-8 md:p-12 relative flex flex-col md:flex-row gap-8 items-center"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 text-warm-light/50 hover:text-fate-red transition-colors"
                onClick={() => setSelectedMoment(null)}
              >
                <X />
              </button>

              <div className="w-full md:w-1/2">
                 {selectedMoment.type === 'note' ? (
                   <div className="w-full aspect-[4/5] bg-[#f0f0f0] p-8 flex items-center justify-center shadow-lg rotate-1 relative">
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-8 bg-fate-red/20 -rotate-1"></div>
                     <p className="font-serif-sc text-black text-lg leading-loose italic">
                       {selectedMoment.desc}
                     </p>
                   </div>
                 ) : (
                   <div className="w-full aspect-[4/5] bg-white p-2 pb-12 shadow-lg rotate-1">
                     <img src={selectedMoment.src} alt={selectedMoment.title} className="w-full h-full object-cover" />
                     <p className="mt-4 text-center font-handwriting text-black/60 text-sm">{selectedMoment.title}</p>
                   </div>
                 )}
              </div>

              <div className="w-full md:w-1/2 space-y-6">
                <div className="flex items-center gap-4">
                  <span className="bg-fate-red text-white text-xs font-courier px-2 py-1">{selectedMoment.date}</span>
                  <div className="h-[1px] flex-1 bg-warm-light/20"></div>
                </div>
                <h3 className="text-3xl md:text-4xl font-serif-sc text-warm-light font-bold">{selectedMoment.title}</h3>
                <p className="font-serif-sc text-warm-light/80 leading-relaxed text-lg">
                  {selectedMoment.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
