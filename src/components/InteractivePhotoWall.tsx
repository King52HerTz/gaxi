"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Film, User } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import { SCENE_PHOTOS } from "@/data/drama-data";

interface InteractivePhotoWallProps {
  mode: "reality" | "script";
}

export default function InteractivePhotoWall({ mode }: InteractivePhotoWallProps) {
  const [filter, setFilter] = useState<"all" | "character" | "scene">("all");
  const [selectedPhoto, setSelectedPhoto] = useState<typeof SCENE_PHOTOS[0] | null>(null);

  const filteredPhotos = SCENE_PHOTOS.filter(
    (photo) => filter === "all" || photo.type === filter
  );

  const isReality = mode === "reality";

  return (
    <section className={clsx(
      "py-24 px-4 md:px-12 transition-colors duration-1000",
      isReality ? "bg-[#fdfbf7]" : "bg-[#0f0505]" // Warm Cream vs Deep Black (Red Tint)
    )}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={clsx(
              "text-3xl md:text-5xl font-bold mb-4",
              isReality ? "font-serif text-reality-text" : "font-serif-sc text-script-neon text-shadow-neon"
            )}
          >
            {isReality ? "光影 · 回忆" : "碎片 · 梦境"}
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            viewport={{ once: true }}
            className={clsx(
              "h-1 mx-auto mb-8",
              isReality ? "bg-reality-accent" : "bg-script-neon"
            )} 
          />
          
          {/* Filters */}
          <div className="flex justify-center gap-4 mb-8">
            <FilterButton 
              active={filter === "all"} 
              onClick={() => setFilter("all")} 
              label="全部" 
              mode={mode}
            />
            <FilterButton 
              active={filter === "character"} 
              onClick={() => setFilter("character")} 
              label="人物" 
              icon={<User size={14} />}
              mode={mode}
            />
            <FilterButton 
              active={filter === "scene"} 
              onClick={() => setFilter("scene")} 
              label="场景" 
              icon={<Film size={14} />}
              mode={mode}
            />
          </div>
        </div>

        {/* Masonry Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredPhotos.map((photo) => (
              <motion.div
                layout
                key={photo.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ y: -10 }}
                className={clsx(
                  "relative group cursor-pointer overflow-hidden rounded-lg shadow-lg border",
                  isReality 
                    ? "border-transparent shadow-md" 
                    : "border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                )}
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className={clsx(
                  "aspect-[3/4] md:aspect-[4/3] relative overflow-hidden",
                  photo.type === "character" ? "aspect-[3/4]" : "aspect-[16/9]"
                )}>
                  <Image 
                    src={photo.src} 
                    alt={photo.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ZoomIn className="text-white w-10 h-10" />
                  </div>
                </div>
                
                {/* Caption overlay on hover */}
                <div className={clsx(
                  "absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300",
                  isReality ? "bg-white/90 text-reality-text" : "bg-black/80 text-white border-t border-script-neon/30"
                )}>
                  <h3 className="font-bold text-lg mb-1">{photo.title}</h3>
                  <p className="text-xs opacity-80 line-clamp-2">{photo.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 text-white/50 hover:text-white transition-colors"
              >
                <X size={32} />
              </button>

              <div className="flex-1 relative bg-black flex items-center justify-center min-h-[50vh] md:min-h-0">
                <Image 
                  src={selectedPhoto.src} 
                  alt={selectedPhoto.title}
                  fill
                  sizes="100vw"
                  className="object-contain p-4"
                />
              </div>

              <div className={clsx(
                "w-full md:w-80 p-8 flex flex-col justify-center transition-colors duration-500",
                isReality 
                  ? "bg-[#fdfbf7] text-reality-text" 
                  : "bg-[#050505] text-gray-200 border-l border-white/10"
              )}>
                <div className="mb-6">
                  <span className={clsx(
                    "text-xs px-2 py-1 rounded border uppercase tracking-widest",
                    isReality ? "border-gray-300 text-gray-500" : "border-script-neon text-script-neon"
                  )}>
                    {selectedPhoto.type === "character" ? "Character" : "Scene"}
                  </span>
                </div>
                <h3 className={clsx(
                  "text-3xl font-bold mb-4",
                  isReality ? "font-serif" : "font-serif-sc"
                )}>
                  {selectedPhoto.title}
                </h3>
                <div className={clsx(
                  "w-12 h-1 mb-6",
                  isReality ? "bg-reality-accent" : "bg-script-neon"
                )} />
                <p className="text-lg leading-relaxed opacity-80 font-light">
                  {selectedPhoto.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function FilterButton({ active, onClick, label, icon, mode }: { active: boolean; onClick: () => void; label: string; icon?: React.ReactNode; mode: "reality" | "script" }) {
  const isReality = mode === "reality";
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2",
        active 
          ? (isReality ? "bg-reality-text text-white shadow-lg" : "bg-script-neon text-black shadow-[0_0_15px_rgba(255,0,0,0.5)]")
          : (isReality ? "bg-white text-gray-500 hover:bg-gray-100" : "bg-white/5 text-gray-400 hover:bg-white/10")
      )}
    >
      {icon}
      {label}
    </button>
  );
}