"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Film, Camera, Clapperboard, Video } from "lucide-react";
import clsx from "clsx";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const EVENTS: TimelineEvent[] = [
  {
    date: "EPISODE 01",
    title: "初入剧本杀",
    description: "建筑师肖稚宇为了寻找设计灵感，误打误撞进入了一家沉浸式剧本杀店。在这里，他第一次遇到了“戏精”玩家胡羞。",
    icon: <Film className="w-6 h-6" />,
  },
  {
    date: "EPISODE 03",
    title: "意外的搭档",
    description: "在《夜半歌声》的剧本中，肖稚宇被分配到与胡羞扮演一对情侣。理性的他试图用逻辑破解谜题，却被胡羞的即兴发挥打乱了节奏。",
    icon: <Clapperboard className="w-6 h-6" />,
  },
  {
    date: "EPISODE 07",
    title: "虚实界限",
    description: "随着游戏的深入，两人开始在现实生活中产生交集。肖稚宇发现，胡羞在游戏里的每一个抉择，似乎都映射着她现实中的秘密。",
    icon: <Camera className="w-6 h-6" />,
  },
  {
    date: "EPISODE 12",
    title: "双向奔赴",
    description: "最后一场剧本杀，不再是为了解谜，而是为了彼此。在戏中戏的高潮，他们终于确认了这份穿梭于虚实之间的心意。",
    icon: <Video className="w-6 h-6" />,
  },
];

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for the film strip
  const yMove = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[150vh] py-24 overflow-hidden">
      {/* Background Film Strip Decorations */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 hidden md:block" />
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-serif-sc font-bold text-off-white mb-4">
            剧情回溯
          </h2>
          <div className="h-1 w-24 bg-neon-red mx-auto mb-6" />
          <p className="font-courier text-white/50 tracking-widest uppercase text-sm">
            Timeline of Events • Recording in Progress
          </p>
        </motion.div>

        <div className="relative space-y-24">
          {EVENTS.map((event, index) => (
            <TimelineItem key={index} event={event} index={index} />
          ))}
        </div>
      </div>

      {/* Film Strip Border Effect */}
      <div className="absolute top-0 bottom-0 left-0 w-8 md:w-16 bg-black border-r border-white/20 flex flex-col items-center py-4 gap-8 z-20">
         {Array.from({ length: 20 }).map((_, i) => (
           <div key={i} className="w-4 h-6 md:w-8 md:h-12 bg-white/5 rounded-sm border border-white/10" />
         ))}
      </div>
      <div className="absolute top-0 bottom-0 right-0 w-8 md:w-16 bg-black border-l border-white/20 flex flex-col items-center py-4 gap-8 z-20">
         {Array.from({ length: 20 }).map((_, i) => (
           <div key={i} className="w-4 h-6 md:w-8 md:h-12 bg-white/5 rounded-sm border border-white/10" />
         ))}
      </div>
    </section>
  );
}

function TimelineItem({ event, index }: { event: TimelineEvent; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, type: "spring" }}
      className={clsx(
        "relative flex items-center gap-8 md:gap-16",
        isEven ? "flex-col md:flex-row" : "flex-col md:flex-row-reverse"
      )}
    >
      {/* Date / Episode Marker */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center">
        <div className={clsx(
          "relative group cursor-pointer",
          isEven ? "md:text-right" : "md:text-left"
        )}>
           <div className="absolute -inset-4 bg-neon-red/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
           <div className="relative z-10 bg-black border border-white/20 p-4 md:p-6 rounded-sm group-hover:border-neon-red/50 transition-colors duration-300">
             <span className="block font-courier text-neon-red text-xs md:text-sm tracking-[0.2em] mb-2">{event.date}</span>
             <h3 className="font-serif-sc text-xl md:text-3xl text-off-white font-bold">{event.title}</h3>
           </div>
        </div>
      </div>

      {/* Center Icon */}
      <div className="relative z-10 flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-black border-2 border-white/20 flex items-center justify-center group shadow-[0_0_15px_rgba(255,255,255,0.1)]">
        <div className="absolute inset-0 rounded-full border border-neon-red/50 scale-125 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500" />
        <div className="text-white/70 group-hover:text-spotlight-yellow transition-colors duration-300">
          {event.icon}
        </div>
      </div>

      {/* Content Card */}
      <div className="w-full md:w-1/2">
        <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-sm backdrop-blur-sm hover:bg-white/10 transition-colors duration-300 relative overflow-hidden group">
          {/* Film Grain Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none noise-bg" />
          
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30" />

          <p className="font-serif-sc text-off-white/80 leading-relaxed text-sm md:text-base">
            {event.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
