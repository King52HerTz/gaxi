"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Film, User, Heart } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import { SCENE_PHOTOS } from "@/data/drama-data";

interface InteractivePhotoWallProps {
  mode: "reality" | "script";
}

export default function InteractivePhotoWall({ mode }: InteractivePhotoWallProps) {
  const [filter, setFilter] = useState<"scene" | "huxiu" | "xiaozhiyu" | "kiss">("scene");
  const [selectedPhoto, setSelectedPhoto] = useState<typeof SCENE_PHOTOS[0] | null>(null);

  const isReality = mode === "reality";

  const filteredPhotos = SCENE_PHOTOS.filter(
    (photo) => {
      // 1. 类型过滤 (场景/胡羞/肖稚宇/名场面)
      // 如果筛选类型是胡羞或肖稚宇，则严格匹配类型
      const typeMatch = photo.type === filter;
      
      // 2. 模式过滤 (Reality vs Script)
      // 如果照片定义了 mode，则必须严格匹配当前模式
      // 如果照片没有定义 mode（如通用名场面），则在两个模式下都显示
      const modeMatch = photo.mode ? photo.mode === mode : true;

      return typeMatch && modeMatch;
    }
  );

  const safeSelectedPhoto =
    selectedPhoto && (selectedPhoto.mode ? selectedPhoto.mode === mode : true) ? selectedPhoto : null;

  const gridClassName =
    filter === "kiss"
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

  return (
    <section className={clsx(
      "py-24 px-4 md:px-12 transition-colors duration-1000",
      isReality ? "bg-[#fdfbf7]" : "bg-[#050a1a]"
    )}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            key={`title-${mode}`}
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
              active={filter === "scene"} 
              onClick={() => setFilter("scene")} 
              label="场景" 
              icon={<Film size={14} />}
              mode={mode}
            />
            <FilterButton 
              active={filter === "huxiu"} 
              onClick={() => setFilter("huxiu")} 
              label="胡羞" 
              icon={<User size={14} />}
              mode={mode}
            />
            <FilterButton 
              active={filter === "xiaozhiyu"} 
              onClick={() => setFilter("xiaozhiyu")} 
              label={isReality ? "肖稚宇" : "秦宵一"} 
              icon={<User size={14} />}
              mode={mode}
            />
            <FilterButton 
              active={filter === "kiss"} 
              onClick={() => setFilter("kiss")} 
              label="名场面" 
              icon={<Heart size={14} />}
              mode={mode}
            />
          </div>
        </div>

        {/* Masonry Grid */}
        <motion.div 
          layout
          key={`grid-${mode}-${filter}`}
          className={gridClassName}
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo) => (
              <motion.div
                layout
                key={`${photo.id}-${photo.type}-${photo.mode ?? "all"}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ y: -10 }}
                className={clsx(
                  "relative group cursor-pointer overflow-hidden rounded-lg shadow-lg border",
                  isReality 
                    ? "border-transparent shadow-md" 
                    : "border-white/10 shadow-[0_0_15px_rgba(7,20,42,0.7)]"
                )}
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className={clsx(
                  "relative overflow-hidden",
                  (photo.type === "huxiu" || photo.type === "xiaozhiyu")
                    ? "aspect-[3/4]"
                    : photo.type === "kiss"
                      ? "aspect-[4/3]"
                      : "aspect-[16/9]"
                )}>
                  <Image 
                    src={photo.src} 
                    alt={photo.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={clsx(
                      "transition-transform duration-700 group-hover:scale-110",
                      photo.type === "kiss" ? "object-contain bg-[#050a1a]" : "object-cover"
                    )}
                  />
                  <div className="absolute inset-0 bg-[#050a1a]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ZoomIn className="text-white w-10 h-10" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {safeSelectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050a1a]/90 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full max-h-[90vh] bg-[#050a1a] rounded-lg overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 text-blue-100/60 hover:text-blue-100 transition-colors"
              >
                <X size={32} />
              </button>

              <div className="relative bg-[#050a1a] flex items-center justify-center min-h-[70vh]">
                <Image 
                  src={safeSelectedPhoto.src} 
                  alt={safeSelectedPhoto.title}
                  fill
                  sizes="100vw"
                  className="object-contain p-4"
                />
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
          ? (isReality ? "bg-reality-text text-white shadow-lg" : "bg-script-neon text-[#050a1a] shadow-[0_0_15px_rgba(125,196,255,0.45)]")
          : (isReality ? "bg-white text-gray-500 hover:bg-gray-100" : "bg-white/5 text-blue-200/70 hover:bg-white/10")
      )}
    >
      {icon}
      {label}
    </button>
  );
}
