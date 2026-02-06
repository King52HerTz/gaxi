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
    title: "初入容城",
    description: "失意的胡羞误入“Midnight Express”剧本杀店，在虚拟的民国容城，遇到了深不可测的督军秦宵一。一句“你想要的，究竟是什么”，开启了两人纠葛的序幕。",
    icon: <Film className="w-6 h-6" />,
  },
  {
    date: "EPISODE 09",
    title: "守护之伤",
    description: "在剧本杀中，为了保护胡羞免受倒塌道具的伤害，肖稚宇毫不犹豫地挡在她身前，右手受伤。那一刻，他不再是高冷的NPC，而是守护她的骑士。",
    icon: <Clapperboard className="w-6 h-6" />,
  },
  {
    date: "EPISODE 12",
    title: "屋顶烟火",
    description: "在弄堂的屋顶，胡羞带肖稚宇俯瞰人间烟火。两颗孤独的心在夜色中靠近，他不仅找到了设计的灵感，也找到了灵魂的共鸣。",
    icon: <Camera className="w-6 h-6" />,
  },
  {
    date: "EPISODE 19",
    title: "樱花定情",
    description: "樱花树下，肖稚宇终于卸下防备，向胡羞正式告白：“我不想演了，我想爱你。” 两人在漫天花雨中拥吻，确认了彼此的心意。",
    icon: <Video className="w-6 h-6" />,
  },
  {
    date: "EPISODE 27",
    title: "尘埃落定",
    description: "跨越二十年的恩怨终于了结，真相大白。肖稚宇洗清了父亲的污名，堂堂正正地来到胡羞身边。他们紧紧相拥，温暖着彼此的余生。",
    icon: <Film className="w-6 h-6" />,
  }
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
