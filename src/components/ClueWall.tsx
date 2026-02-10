"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertOctagon, AlertTriangle, ShieldAlert, Terminal, Radio, X } from "lucide-react";
import clsx from "clsx";
import { NPC_LOGS, SystemLog } from "@/data/drama-data";

function GlitchText({ text, isActive }: { text: string; isActive: boolean }) {
  const [display, setDisplay] = useState(text);
  const chars = useMemo(() => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()[]{}<>?/\\|", []);

  useEffect(() => {
    if (!isActive || text.length === 0) {
      return;
    }

    let iteration = 0;
    const intervalId: ReturnType<typeof setInterval> = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((_, index) => {
            if (index < iteration) return text[index] ?? "";
            return chars[Math.floor(Math.random() * chars.length)] ?? "";
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(intervalId);
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(intervalId);
  }, [chars, isActive, text]);

  return <span>{isActive ? display : text}</span>;
}

export default function SystemLogEntrance() {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleLogs, setVisibleLogs] = useState<SystemLog[]>([]);
  const [selectedLog, setSelectedLog] = useState<SystemLog | null>(null);
  const [hoveredLogId, setHoveredLogId] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Auto-load logs when open
  useEffect(() => {
    if (isOpen) {
        let index = 0;
        const intervalId: ReturnType<typeof setInterval> = setInterval(() => {
          setVisibleLogs((prev) => {
            // 如果是刚开始，先清空
            if (index === 0 && prev.length > 0) return [];
            
            const nextLog = NPC_LOGS[index];
            if (!nextLog) return prev;
            if (prev.find(l => l.id === nextLog.id)) return prev;
            return [...prev, nextLog];
          });

          index += 1;
          if (index >= NPC_LOGS.length) clearInterval(intervalId);

          if (listRef.current) {
              listRef.current.scrollTop = listRef.current.scrollHeight;
          }
        }, 800); 

        return () => {
          clearInterval(intervalId);
          setVisibleLogs([]); // 离开或重置时清空
        };
    }
  }, [isOpen]);

  const is故障 = (status: SystemLog["status"]) => status === "CRITICAL" || status === "SYSTEM_OVERRIDE";
  const is警告 = (status: SystemLog["status"]) => status === "WARNING";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isWarningStatus = is警告; // Keep reference to avoid unused error if needed later or remove entirely

  const 状态颜色 = (status: SystemLog["status"]) => {
    switch (status) {
      case "NORMAL": return "text-blue-100";
      case "WARNING": return "text-blue-200";
      case "CRITICAL": return "text-blue-50";
      case "SYSTEM_OVERRIDE": return "text-blue-100";
      default: return "text-blue-200/70";
    }
  };

  const 状态中文 = (status: SystemLog["status"]) => {
    switch (status) {
      case "NORMAL": return "正常";
      case "WARNING": return "警告";
      case "CRITICAL": return "危险";
      case "SYSTEM_OVERRIDE": return "系统接管";
      default: return "未知";
    }
  };

  return (
    <>
      {/* 底部入口 Trigger */}
      <section className="relative w-full py-20 bg-[#050a1a] border-t border-blue-900/30 flex flex-col items-center justify-center gap-6 overflow-hidden">
         <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(80,140,255,0.15),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(130,210,255,0.18),transparent_50%),radial-gradient(circle_at_50%_80%,rgba(90,160,255,0.12),transparent_55%)]" />
         <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(6,16,40,0.8),rgba(6,16,40,0.2)_60%,rgba(6,16,40,0.9))]" />
         <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle,rgba(160,220,255,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
         
         <div className="z-20 flex flex-col items-center gap-2 text-blue-200/70 font-mono text-sm">
            <Radio size={24} className="text-blue-300" />
            <span className="tracking-[0.2em] uppercase">深层记忆信号</span>
         </div>

         <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 0 28px rgba(140,200,255,0.35)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsOpen(true)}
            className="z-20 px-8 py-3 border border-blue-300/30 bg-white/5 hover:bg-white/10 text-blue-100 font-mono text-lg tracking-widest uppercase transition-all duration-300 relative group overflow-hidden rounded-full backdrop-blur-md"
         >
            <span className="relative z-10 flex items-center gap-2">
               <Terminal size={18} />
               进入NPC秦宵一记忆系统
            </span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
         </motion.button>
         
         <p className="z-20 text-[10px] text-blue-200/40 font-mono">
            NPC秦宵一记忆系统 // 记忆档案
         </p>
      </section>

      {/* Full Screen Overlay - The "Log Viewer" */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#050a1a] font-mono text-blue-100 overflow-hidden flex flex-col"
          >
            {/* Close Button */}
            <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 z-50 p-2 text-blue-200/60 hover:text-blue-100 hover:bg-white/10 rounded-full transition-colors group"
            >
                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">退出系统</span>
                    <X size={32} />
                </div>
            </button>

            {/* CRT Effects */}
            <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_20%_30%,rgba(110,190,255,0.18),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(80,140,255,0.2),transparent_50%),radial-gradient(circle_at_50%_80%,rgba(140,220,255,0.12),transparent_55%)]" />
            <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(4,10,24,0.85)_100%)]" />
            <div className="pointer-events-none absolute inset-0 z-20 snow-drift" />

            <div className="relative z-30 mx-auto flex h-full w-full max-w-6xl flex-col px-4 py-8 md:px-12 md:py-12">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 flex items-end justify-between border-b border-blue-200/20 pb-4 shrink-0"
                >
                  <div>
                    <h1 className="mb-2 flex items-center gap-4 text-3xl font-bold tracking-tighter md:text-5xl">
                      <Terminal size={40} className="text-blue-200" />
                      记忆档案
                    </h1>
                    <p className="text-xs uppercase tracking-widest text-blue-200/60 md:text-sm">
                      秦宵一 [ID: 9527] // 深层记忆回流 // v5.2.0
                    </p>
                  </div>
                  <div className="hidden text-right md:block">
                    <div className="flex items-center gap-2 text-blue-200/80">
                      <AlertOctagon size={16} />
                      <span className="text-xs font-bold">记忆温度过载</span>
                    </div>
                  </div>
                </motion.div>

                <div className="flex-1 min-h-0 relative">
                  <div ref={listRef} className="absolute inset-0 overflow-y-auto pr-4 custom-scrollbar pb-20">
                    <div className="absolute left-3 top-0 h-full w-px bg-blue-200/20" />
                    <div className="space-y-4 pl-8">
                      <AnimatePresence>
                        {visibleLogs.map((log) => {
                          const 故障 = is故障(log.status);
                          const isHovered = hoveredLogId === log.id;

                          return (
                            <motion.div
                              key={log.id}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              onMouseEnter={() => setHoveredLogId(log.id)}
                              onMouseLeave={() => setHoveredLogId(null)}
                              onClick={() => {
                                if (故障) setSelectedLog(log);
                              }}
                              className={clsx(
                                "relative cursor-pointer border border-white/10 px-4 py-4 transition-colors rounded-2xl backdrop-blur-md bg-white/5 float-breath",
                                状态颜色(log.status),
                                isHovered ? "bg-white/10 shadow-[0_0_30px_rgba(160,220,255,0.15)]" : "shadow-[0_0_12px_rgba(90,150,255,0.08)]"
                              )}
                              transition={{ duration: 0.6 }}
                            >
                              <div
                                className={clsx(
                                  "absolute left-3 top-6 h-2 w-2 -translate-x-1/2 rounded-full border",
                                  log.status === "SYSTEM_OVERRIDE"
                                    ? "border-blue-200 bg-blue-100 shadow-[0_0_18px_rgba(160,220,255,0.35)]"
                                    : log.status === "CRITICAL"
                                      ? "border-blue-100 bg-blue-50 shadow-[0_0_18px_rgba(190,230,255,0.35)]"
                                      : log.status === "WARNING"
                                        ? "border-blue-200 bg-blue-200 shadow-[0_0_14px_rgba(160,220,255,0.25)]"
                                        : "border-blue-200 bg-blue-200 shadow-[0_0_14px_rgba(160,220,255,0.25)]"
                                )}
                              />

                              <div className="mb-2 flex flex-col gap-2 text-xs opacity-70 md:flex-row md:gap-8">
                                <span className="text-blue-200/70">[{log.timestamp}]</span>
                                <span className="text-blue-200/70">{log.episode}</span>
                                <span className={clsx("font-bold text-blue-100/80", 故障 ? "animate-flicker" : "")}>
                                  状态：{状态中文(log.status)}（{log.status}）
                                </span>
                              </div>

                              <div className="flex items-start gap-4">
                                <span className="select-none opacity-40 text-blue-200/70">{">"}</span>
                                <div className="min-w-0 flex-1 space-y-1">
                                  <p className="truncate font-bold tracking-wide text-blue-100/80">{log.command}</p>
                                  <p className="leading-relaxed text-blue-100/85 font-serif">
                                    {log.status === "CRITICAL" ? "内心：" : "回声："}
                                    <span>{故障 ? <GlitchText text={log.output} isActive /> : log.output}</span>
                                  </p>
                                </div>
                              </div>

                              {故障 && (
                                <div className="absolute right-4 top-4 opacity-80">
                                  <AlertTriangle size={20} className="text-red-500 animate-pulse" />
                                </div>
                              )}
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                      
                       {/* Loading Cursor */}
                       <motion.div
                        animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -2, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                        className="h-4 w-2 bg-blue-200/70 mt-6 rounded-full blur-[0.5px]"
                      />
                    </div>
                  </div>
                </div>
            </div>

            {/* Error Modal (Nested) */}
            <AnimatePresence>
                {selectedLog && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[120] flex items-center justify-center bg-[#050a1a]/90 p-4 backdrop-blur-xl"
                    onClick={() => setSelectedLog(null)}
                  >
                    <motion.div
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: 20 }}
                      className="relative w-full max-w-2xl border border-white/15 bg-white/5 p-8 shadow-[0_0_50px_rgba(120,180,255,0.25)] rounded-2xl backdrop-blur-md"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="absolute left-0 top-0 h-px w-full bg-blue-200/40" />
                      <div className="absolute bottom-0 left-0 h-px w-full bg-blue-200/40" />

                      <div className="mb-6 flex items-center gap-4 border-b border-blue-200/20 pb-4 text-blue-100">
                        <ShieldAlert size={32} />
                        <h2 className="text-2xl font-bold tracking-widest">深海记忆裂隙</h2>
                      </div>

                      <div className="space-y-6">
                        <div className="text-sm text-blue-200/70 font-mono">
                          <p>{">"} 事件签名：0x{selectedLog.glitchLevel}E9</p>
                          <p>{">"} 模块：心潮引擎_V3</p>
                          <p>{">"} 触发：情感雪崩 / 深层回响</p>
                        </div>

                        <div className="relative py-8 text-center">
                          <p className="text-3xl italic text-blue-50 drop-shadow-[0_0_10px_rgba(120,180,255,0.6)] md:text-4xl font-serif">
                            {selectedLog.memoryContent.quote}
                          </p>
                          <span className="absolute left-0 top-0 font-serif text-6xl text-blue-200/15">“</span>
                          <span className="absolute bottom-0 right-0 font-serif text-6xl text-blue-200/15">”</span>
                        </div>

                        <button
                          onClick={() => setSelectedLog(null)}
                          className="w-full border border-blue-200/30 bg-white/5 py-3 font-bold uppercase tracking-widest text-blue-100 transition-colors hover:bg-white/10 rounded-full backdrop-blur-md"
                        >
                          返回档案
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        /* 自定义滚动条样式 */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 58, 138, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(96, 165, 250, 0.3);
          border-radius: 3px;
          transition: background 0.3s;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(96, 165, 250, 0.5);
        }

        @keyframes snowDrift {
          0% { transform: translateY(0) translateX(0); opacity: 0.12; }
          50% { transform: translateY(10px) translateX(-6px); opacity: 0.22; }
          100% { transform: translateY(0) translateX(0); opacity: 0.12; }
        }
        .snow-drift {
          animation: snowDrift 8s ease-in-out infinite;
          background: radial-gradient(circle at 20% 30%, rgba(180,220,255,0.18), transparent 35%),
                      radial-gradient(circle at 70% 60%, rgba(140,200,255,0.16), transparent 38%),
                      radial-gradient(circle at 40% 80%, rgba(200,240,255,0.12), transparent 40%);
          filter: blur(12px);
        }
        @keyframes textFlicker {
          0% { opacity: 1; }
          50% { opacity: 0.82; }
          52% { opacity: 0.22; }
          54% { opacity: 0.86; }
          100% { opacity: 1; }
        }
        .animate-flicker {
          animation: textFlicker 2.6s infinite;
        }
        @keyframes floatBreath {
          0% { transform: translateY(0); box-shadow: 0 0 16px rgba(140,200,255,0.12); }
          50% { transform: translateY(-4px); box-shadow: 0 0 28px rgba(140,200,255,0.2); }
          100% { transform: translateY(0); box-shadow: 0 0 16px rgba(140,200,255,0.12); }
        }
        .float-breath {
          animation: floatBreath 6s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
