"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertOctagon, AlertTriangle, ShieldAlert, Terminal } from "lucide-react";
import clsx from "clsx";
import { NPC_LOGS, SystemLog } from "@/data/drama-data";

function GlitchText({ text, isActive }: { text: string; isActive: boolean }) {
  const [display, setDisplay] = useState(text);
  const chars = useMemo(() => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()[]{}<>?/\\|", []);

  useEffect(() => {
    if (!isActive || text.length === 0) {
      setDisplay(text);
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

  return <span>{display}</span>;
}

export default function SystemLogViewer() {
  const [visibleLogs, setVisibleLogs] = useState<SystemLog[]>([]);
  const [selectedLog, setSelectedLog] = useState<SystemLog | null>(null);
  const [hoveredLogId, setHoveredLogId] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!Array.isArray(NPC_LOGS) || NPC_LOGS.length === 0) {
      setVisibleLogs([]);
      return;
    }

    let index = 0;
    const intervalId: ReturnType<typeof setInterval> = setInterval(() => {
      setVisibleLogs((prev) => {
        const nextLog = NPC_LOGS[index];
        if (!nextLog) return prev;
        return [...prev, nextLog];
      });

      index += 1;
      if (index >= NPC_LOGS.length) clearInterval(intervalId);

      const el = listRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    }, 520);

    return () => clearInterval(intervalId);
  }, []);

  const is故障 = (status: SystemLog["status"]) => status === "CRITICAL" || status === "SYSTEM_OVERRIDE";
  const is警告 = (status: SystemLog["status"]) => status === "WARNING";

  const 状态颜色 = (status: SystemLog["status"]) => {
    switch (status) {
      case "NORMAL":
        return "text-[#00ff00]";
      case "WARNING":
        return "text-yellow-400";
      case "CRITICAL":
        return "text-red-500";
      case "SYSTEM_OVERRIDE":
        return "text-pink-500";
      default:
        return "text-gray-400";
    }
  };

  const 状态中文 = (status: SystemLog["status"]) => {
    switch (status) {
      case "NORMAL":
        return "正常";
      case "WARNING":
        return "警告";
      case "CRITICAL":
        return "危险";
      case "SYSTEM_OVERRIDE":
        return "系统接管";
      default:
        return "未知";
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black font-mono text-green-500">
      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] bg-repeat" />
      <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.65)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-20 crt-flicker" />

      <div className="relative z-30 mx-auto flex h-full w-full max-w-6xl flex-col px-4 py-8 md:px-12 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-end justify-between border-b border-green-500/30 pb-4"
        >
          <div>
            <h1 className="mb-2 flex items-center gap-4 text-3xl font-bold tracking-tighter md:text-5xl">
              <Terminal size={40} className="animate-pulse" />
              NPC 系统日志
            </h1>
            <p className="text-xs uppercase tracking-widest text-green-500/60 md:text-sm">
              秦宵一 [ID: 9527] // 记忆核心转储 // v2.4.0
            </p>
          </div>
          <div className="hidden text-right md:block">
            <div className="flex items-center gap-2 text-red-500 animate-pulse">
              <AlertOctagon size={16} />
              <span className="text-xs font-bold">检测到核心不稳定</span>
            </div>
          </div>
        </motion.div>

        <div className="flex-1">
          <div ref={listRef} className="relative h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-black">
            <div className="absolute left-3 top-0 h-full w-px bg-green-500/20" />
            <div className="space-y-4 pl-8">
              <AnimatePresence>
                {visibleLogs.map((log) => {
                  const 故障 = is故障(log.status);
                  const 警告 = is警告(log.status);
                  const isHovered = hoveredLogId === log.id;

                  return (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      onMouseEnter={() => setHoveredLogId(log.id)}
                      onMouseLeave={() => setHoveredLogId(null)}
                      onClick={() => {
                        if (故障) setSelectedLog(log);
                      }}
                      className={clsx(
                        "relative cursor-pointer border-b border-dashed border-white/10 px-4 py-4 transition-colors",
                        状态颜色(log.status),
                        isHovered ? "bg-white/5" : "bg-transparent",
                        警告 ? "animate-jitter" : "",
                        故障 ? "glitch-line" : ""
                      )}
                    >
                      <div
                        className={clsx(
                          "absolute left-3 top-6 h-2 w-2 -translate-x-1/2 rounded-full border",
                          log.status === "SYSTEM_OVERRIDE"
                            ? "border-pink-400 bg-pink-500 shadow-[0_0_18px_rgba(255,0,170,0.45)]"
                            : log.status === "CRITICAL"
                              ? "border-red-400 bg-red-500 shadow-[0_0_18px_rgba(255,0,0,0.45)]"
                              : log.status === "WARNING"
                                ? "border-yellow-200 bg-yellow-400 shadow-[0_0_14px_rgba(250,204,21,0.35)]"
                                : "border-green-200 bg-[#00ff00] shadow-[0_0_14px_rgba(0,255,0,0.35)]"
                        )}
                      />

                      <div className="mb-2 flex flex-col gap-2 text-xs opacity-70 md:flex-row md:gap-8">
                        <span>[{log.timestamp}]</span>
                        <span>{log.episode}</span>
                        <span className={clsx("font-bold", 故障 ? "animate-flicker" : "")}>
                          状态：{状态中文(log.status)}（{log.status}）
                        </span>
                      </div>

                      <div className="flex items-start gap-4">
                        <span className="select-none opacity-50">{">"}</span>
                        <div className="min-w-0 flex-1 space-y-1">
                          <p className="truncate font-bold tracking-wide">指令：{log.command}</p>
                          <p className="leading-relaxed opacity-85">
                            输出：
                            {log.status === "CRITICAL" ? (
                              <span className="glitch-text">
                                {故障 ? <GlitchText text={log.output} isActive /> : log.output}
                              </span>
                            ) : (
                              <span>{故障 ? <GlitchText text={log.output} isActive /> : log.output}</span>
                            )}
                          </p>
                        </div>
                      </div>

                      {故障 && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60">
                          <AlertTriangle size={20} className="animate-bounce" />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.85, repeat: Infinity }}
                className="h-5 w-3 bg-green-500"
              />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedLog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setSelectedLog(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 18 }}
              className="relative w-full max-w-2xl border-2 border-red-500 bg-black p-8 shadow-[0_0_50px_rgba(255,0,0,0.3)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute left-0 top-0 h-1 w-full animate-pulse bg-red-500" />
              <div className="absolute bottom-0 left-0 h-1 w-full animate-pulse bg-red-500" />

              <div className="mb-6 flex items-center gap-4 border-b border-red-500/30 pb-4 text-red-500">
                <ShieldAlert size={32} />
                <h2 className="text-2xl font-bold tracking-widest">致命系统错误</h2>
              </div>

              <div className="space-y-6">
                <div className="text-sm text-red-400/80">
                  <p>{">"} 错误代码：0x{selectedLog.glitchLevel}E9</p>
                  <p>{">"} 模块：情感引擎_V2</p>
                  <p>{">"} 原因：爱意导致缓冲区溢出</p>
                </div>

                <div className="relative py-8 text-center">
                  <p className="text-3xl italic text-white drop-shadow-[0_0_10px_rgba(255,0,0,0.8)] md:text-4xl">
                    {selectedLog.memoryContent.quote}
                  </p>
                  <span className="absolute left-0 top-0 font-serif text-6xl text-red-900/20">“</span>
                  <span className="absolute bottom-0 right-0 font-serif text-6xl text-red-900/20">”</span>
                </div>

                <button
                  onClick={() => setSelectedLog(null)}
                  className="w-full border border-red-500 bg-red-500/10 py-3 font-bold uppercase tracking-widest text-red-500 transition-colors hover:bg-red-500/20"
                >
                  强制重启系统
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes flicker {
          0% { opacity: 0.08; }
          6% { opacity: 0.14; }
          10% { opacity: 0.06; }
          12% { opacity: 0.18; }
          20% { opacity: 0.08; }
          100% { opacity: 0.1; }
        }
        .crt-flicker {
          animation: flicker 2.2s infinite;
          background: rgba(255, 255, 255, 0.12);
          mix-blend-mode: overlay;
        }
        @keyframes textFlicker {
          0% { opacity: 1; }
          50% { opacity: 0.82; }
          52% { opacity: 0.22; }
          54% { opacity: 0.86; }
          100% { opacity: 1; }
        }
        .animate-flicker {
          animation: textFlicker 1.9s infinite;
        }
        @keyframes jitter {
          0% { transform: translateX(0); }
          20% { transform: translateX(-0.4px); }
          40% { transform: translateX(0.6px); }
          60% { transform: translateX(-0.5px); }
          80% { transform: translateX(0.3px); }
          100% { transform: translateX(0); }
        }
        .animate-jitter {
          animation: jitter 0.22s infinite;
        }
        @keyframes glitchShift {
          0% { transform: translate3d(0,0,0); text-shadow: none; }
          10% { transform: translate3d(-1px,0,0); text-shadow: 1px 0 rgba(255,0,0,0.6), -1px 0 rgba(255,0,170,0.6); }
          11% { transform: translate3d(1px,0,0); }
          12% { transform: translate3d(-2px,0,0); }
          13% { transform: translate3d(0,0,0); }
          100% { transform: translate3d(0,0,0); }
        }
        .glitch-line {
          animation: glitchShift 1.6s infinite;
        }
        @keyframes glitch-anim-1 {
          0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
          20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
          40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
          60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
          80% { clip-path: inset(10% 0 60% 0); transform: translate(-1px, 1px); }
          100% { clip-path: inset(30% 0 20% 0); transform: translate(0); }
        }
        .glitch-text {
          position: relative;
          display: inline-block;
          will-change: transform, clip-path;
          animation: glitch-anim-1 2s infinite linear alternate-reverse;
        }
      `}</style>
    </section>
  );
}
