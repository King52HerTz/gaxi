"use client";

import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import LoveTimeline from "@/components/LoveTimeline";
import CharacterCards from "@/components/CharacterCards";
import ClueWall from "@/components/ClueWall";
import HeartbeatButton from "@/components/HeartbeatButton";
import ParallelPhone from "@/components/ParallelPhone";
import MemoryScavengerHunt from "@/components/MemoryScavengerHunt";
import AtmosphericPlayer from "@/components/AtmosphericPlayer";
import StoryArcs from "@/components/StoryArcs";
import InteractivePhotoWall from "@/components/InteractivePhotoWall";
import VRTransition from "@/components/VRTransition";
import clsx from "clsx";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
  const [mode, setMode] = useState<"reality" | "script">("reality");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetMode, setTargetMode] = useState<"reality" | "script">("script");
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const toggleMode = () => {
    const next = mode === "reality" ? "script" : "reality";
    setTargetMode(next);
    setIsTransitioning(true);
    
    // Delay mode switch to match the full screen "blackout" phase of the VR effect
    // Animation timing: Enter (0.4s) + Wait/Text (1.5s) + Exit (0.4s)
    // We want to switch the mode while the screen is fully black (covered)
    setTimeout(() => {
        setMode(next);
    }, 1000); // Switch mode after 1s, while text is showing and screen is black
  };

  // 跟踪鼠标位置以实现剧本模式下的手电筒效果
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    if (mode === "script") {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mode]);

  // 更新 body 的类名以应用全局光标样式
  useEffect(() => {
    document.body.className = mode === "reality" ? "mode-reality" : "mode-script";
  }, [mode]);

  return (
    <main 
      className={clsx(
        "min-h-screen transition-colors duration-1000 relative",
        mode === "reality" ? "bg-reality" : "bg-script"
      )}
    >
      {/* 剧本模式手电筒效果 */}
      {mode === "script" && (
        <div 
          className="flashlight-glow"
          style={{ top: mousePos.y, left: mousePos.x }}
        />
      )}
      
      {/* VR 转场覆盖层 */}
      <VRTransition 
        isActive={isTransitioning} 
        nextMode={targetMode}
        onComplete={() => setIsTransitioning(false)} 
      />

      {/* 滚动进度条 */}
      <motion.div
        className={clsx(
          "fixed top-0 left-0 right-0 h-1 z-[100] origin-left",
          mode === "reality" ? "bg-reality-accent" : "bg-script-neon"
        )}
        style={{ scaleX }}
      />

      {/* 1. 英雄区域：双重模式切换 */}
      <HeroSection mode={mode} onToggle={toggleMode} isTransitioning={isTransitioning} />

      {/* 功能：剧情章节 (深度内容) */}
      <StoryArcs mode={mode} />

      {/* 2. 爱情时间轴：从蓝图到心跳 */}
      <LoveTimeline mode={mode} />

      {/* 功能：互动照片墙 (替代了双面画廊) */}
      <InteractivePhotoWall mode={mode} />

      {/* 3. 人物卡片：情感角色 (仅现实模式) */}
      {mode === "reality" && <CharacterCards mode={mode} />}

      {/* 功能 1：平行时空手机 */}
      <ParallelPhone mode={mode} />

      {/* 功能 2：记忆碎片寻宝 */}
      <MemoryScavengerHunt mode={mode} key={mode} />

      {/* 功能 3：氛围音乐播放器 */}
      <AtmosphericPlayer mode={mode} />

      {/* 功能 4：心跳按钮 (现有) */}
      <HeartbeatButton mode={mode} />

      {/* 功能：NPC 系统日志入口 (仅剧本模式，放在页面底部) */}
      {mode === "script" && <ClueWall />}

      {/* 页脚 */}
      <footer className="py-12 text-center opacity-50 relative z-10">
        <p className={clsx(
          "text-xs tracking-[0.3em] uppercase transition-colors duration-500",
          mode === "reality" ? "text-reality-text font-serif" : "text-script-text font-handwriting"
        )}>
          Designed by Eliauk
        </p>
      </footer>
    </main>
  );
}
