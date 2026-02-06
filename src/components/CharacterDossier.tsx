"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Fingerprint, Sparkles, Gamepad2 } from "lucide-react";
import clsx from "clsx";

export interface CharacterData {
  id: string;
  actorName: string;
  characterName: string;
  role: string;
  publicIdentity: string;
  hiddenScript: string;
  keywords: string[];
  themeColor: string; // Hex color for accents
}

interface CharacterDossierProps {
  data: CharacterData;
  index: number;
}

export default function CharacterDossier({ data, index }: CharacterDossierProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Rotation for the "Peeking" effect on hover
  const coverVariants = {
    closed: { rotateX: 0, rotateY: 0, y: 0 },
    hover: { 
      rotateX: 15, 
      y: -20,
      transition: { duration: 0.3, ease: "easeOut" } 
    },
    flipped: { 
      opacity: 0,
      pointerEvents: "none" as const
    }
  };

  const contentVariants = {
    hidden: { rotateY: 180, opacity: 0 },
    visible: { 
      rotateY: 0, 
      opacity: 1,
      transition: { duration: 0.6, type: "spring" }
    }
  };

  return (
    <div className="relative w-full max-w-md h-[500px] perspective-1000 group cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        className={clsx(
          "w-full h-full relative transition-all duration-700 transform-style-3d",
        )}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* === FRONT SIDE (The Script Folder) === */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          {/* The Inner Content (Photo) - Visible when cover lifts */}
          <div className="absolute inset-0 bg-black border border-white/10 flex flex-col items-center justify-start pt-10 overflow-hidden rounded-sm">
             {/* Photo Placeholder */}
            <div className="w-48 h-64 bg-zinc-800 relative overflow-hidden mb-4 grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500">
               {/* In a real app, use next/image here */}
               <div className="absolute inset-0 flex items-center justify-center text-white/10">
                  <User size={80} strokeWidth={1} />
               </div>
               <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent h-20" />
            </div>
            <h3 className="text-2xl font-serif-sc text-off-white tracking-widest z-10">{data.actorName}</h3>
          </div>

          {/* The Folder Cover (Lifts on Hover) */}
          <motion.div
            className="absolute inset-0 bg-[#1c1c1c] border-t-2 border-white/20 shadow-2xl origin-top flex flex-col items-center justify-center p-8 rounded-sm"
            variants={coverVariants}
            initial="closed"
            whileHover="hover"
            style={{ 
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
            }}
          >
            {/* Folder Tab */}
            <div className="absolute -top-6 left-0 w-1/3 h-8 bg-[#1c1c1c] rounded-t-md border-t border-l border-r border-white/20" />
            
            {/* Stamps and Text */}
            <div className="border-2 border-white/30 p-6 mb-8 relative">
              <span className="absolute -top-3 left-4 bg-[#1c1c1c] px-2 text-xs font-courier text-white/50 uppercase tracking-widest">Script File</span>
              <span className="text-spotlight-yellow font-serif-sc font-bold text-3xl tracking-widest">角色剧本</span>
            </div>

            <div className="w-full border-t border-b border-white/10 py-4 my-4 flex flex-col gap-2">
              <div className="flex justify-between text-xs font-courier text-white/40 uppercase tracking-widest">
                <span>Player ID</span>
                <span>{data.id}</span>
              </div>
              <div className="flex justify-between text-xs font-courier text-white/40 uppercase tracking-widest">
                <span>Status</span>
                <span>In Game</span>
              </div>
            </div>

            <h2 className="text-4xl font-serif-sc text-off-white mt-4">{data.characterName}</h2>
            <p className="text-xs font-courier text-neon-red mt-2 animate-pulse">Click to Reveal Role</p>
          </motion.div>
        </div>

        {/* === BACK SIDE (The Opened File) === */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden bg-[#f0f0f0] text-black p-6 shadow-xl rotate-y-180 rounded-sm overflow-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          {/* Paper Texture Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-20" 
               style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5'/%3E%3CfeDiffuseLighting lighting-color='%23f5f5f5' surfaceScale='2'%3E%3CfeDistantLight azimuth='45' elevation='60'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)'/%3E%3C/svg%3E\")" }} 
          />
          
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex justify-between items-start border-b-2 border-black/80 pb-4 mb-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-black/60 font-courier">Character Profile</h3>
                <h2 className="text-3xl font-serif-sc font-black text-black">{data.characterName}</h2>
              </div>
              <Gamepad2 className="w-10 h-10 text-black/20" />
            </div>

            <div className="space-y-6 flex-1">
              {/* Public Identity Section */}
              <div className="bg-black/5 p-4 rounded-sm border-l-4 border-black">
                <div className="flex items-center gap-2 mb-2 text-black/70">
                  <User className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider font-courier">Reality Identity</span>
                </div>
                <p className="font-serif-sc text-lg font-bold">{data.publicIdentity}</p>
              </div>

              {/* Hidden Script Section */}
              <div className="relative p-4 rounded-sm border border-neon-red/30 bg-neon-red/5">
                 <div className="absolute -top-3 -right-3 rotate-0 bg-neon-red text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest shadow-sm">
                   Game Script
                 </div>
                <div className="flex items-center gap-2 mb-2 text-neon-red">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider font-courier">Hidden Objective</span>
                </div>
                <p className="font-serif-sc text-base leading-relaxed text-black/80">{data.hiddenScript}</p>
              </div>

              {/* Keywords */}
              <div className="mt-auto pt-4">
                <p className="text-xs font-bold uppercase tracking-wider font-courier text-black/50 mb-3">Character Traits</p>
                <div className="flex flex-wrap gap-2">
                  {data.keywords.map((kw, i) => (
                    <span key={i} className="px-3 py-1 bg-black text-white text-xs font-courier tracking-widest uppercase transform hover:-translate-y-1 transition-transform">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 opacity-50">
               <Fingerprint className="w-24 h-24 text-black/5" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
