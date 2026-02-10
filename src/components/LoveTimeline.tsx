"use client";

import { motion, AnimatePresence } from "framer-motion";
import { TIMELINE_EVENTS } from "@/data/drama-data";
import clsx from "clsx";

interface LoveTimelineProps {
  mode: "reality" | "script";
}

interface TimelineEventContent {
  title: string;
  description: string;
}

interface TimelineEvent {
  episode: string;
  reality: TimelineEventContent;
  script: TimelineEventContent;
}

export default function LoveTimeline({ mode }: LoveTimelineProps) {
  return (
    <section className="py-32 px-6 max-w-5xl mx-auto relative">
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-current opacity-20" />

      <div className="space-y-32">
        {TIMELINE_EVENTS.map((event: TimelineEvent, index: number) => (
          <TimelineItem key={index} event={event} index={index} mode={mode} />
        ))}
      </div>
    </section>
  );
}

function TimelineItem({ event, index, mode }: { event: TimelineEvent; index: number; mode: "reality" | "script" }) {
  const isReality = mode === "reality";
  const content = isReality ? event.reality : event.script;
  const isEven = index % 2 === 0;

  return (
    <div className={clsx(
      "relative flex items-center md:justify-between gap-12",
      isEven ? "md:flex-row" : "md:flex-row-reverse",
      "flex-col items-start pl-16 md:pl-0"
    )}>
      {/* 时间线标记 */}
      <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 bg-current z-10 transition-colors duration-500" 
           style={{ 
             borderColor: isReality ? "var(--reality-accent)" : "var(--script-neon)",
             backgroundColor: isReality ? "var(--reality-bg)" : "var(--script-bg)"
           }}
      />

      {/* 剧集标签 */}
      <div className={clsx(
        "hidden md:block w-1/2 text-center text-xs tracking-[0.2em] opacity-80 font-bold",
        isEven ? "text-right pr-12" : "text-left pl-12",
        isReality ? "text-reality-accent" : "text-script-neon"
      )}>
        {event.episode}
      </div>

      {/* 内容卡片 */}
      <motion.div 
        className={clsx(
          "w-full md:w-1/2 relative p-8 transition-all duration-700",
          isReality 
            ? "bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-[#eee]" 
            : "bg-white/5 backdrop-blur-sm border border-white/10 shadow-[0_0_30px_-5px_rgba(125,196,255,0.25)]"
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* 移动端剧集标签 */}
        <span className={clsx(
          "md:hidden block text-xs tracking-widest opacity-80 mb-4 font-bold",
          isReality ? "text-reality-accent" : "text-script-neon"
        )}>
          {event.episode}
        </span>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className={clsx(
              "text-2xl font-bold mb-4",
              isReality ? "font-serif text-reality-text" : "font-handwriting text-script-neon text-3xl"
            )}>
              {content.title}
            </h3>
            <p className={clsx(
              "leading-relaxed",
              isReality ? "text-reality-text/80 font-sans text-sm" : "text-script-text/90 font-serif text-lg italic"
            )}>
              {content.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* 装饰元素 */}
        <div className={clsx(
          "absolute top-0 left-0 w-1 h-full transition-colors duration-500",
          isReality ? "bg-reality-accent" : "bg-script-accent"
        )} />
      </motion.div>
    </div>
  );
}
