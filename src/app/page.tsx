"use client";

import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import LoveTimeline from "@/components/LoveTimeline";
import CharacterCards from "@/components/CharacterCards";
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

  // Track mouse for flashlight effect in Script Mode
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

  // Update body class for global cursor styles
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
      {/* Script Mode Flashlight Effect */}
      {mode === "script" && (
        <div 
          className="flashlight-glow"
          style={{ top: mousePos.y, left: mousePos.x }}
        />
      )}
      
      {/* VR Transition Overlay */}
      <VRTransition 
        isActive={isTransitioning} 
        nextMode={targetMode}
        onComplete={() => setIsTransitioning(false)} 
      />

      {/* Scroll Progress Bar */}
      <motion.div
        className={clsx(
          "fixed top-0 left-0 right-0 h-1 z-[100] origin-left",
          mode === "reality" ? "bg-reality-accent" : "bg-script-neon"
        )}
        style={{ scaleX }}
      />

      {/* 1. Hero Section: The Dual Switch */}
      <HeroSection mode={mode} onToggle={toggleMode} isTransitioning={isTransitioning} />

      {/* Feature: Story Arcs (Deep Content) */}
      <StoryArcs mode={mode} />

      {/* 2. Love Timeline: From Blueprint to Heartbeat */}
      <LoveTimeline mode={mode} />

      {/* Feature: Interactive Photo Wall (Replaces DualLookGallery) */}
      <InteractivePhotoWall mode={mode} />

      {/* 3. Character Cards: Emotional Roles */}
      <CharacterCards mode={mode} />

      {/* Feature 1: The Parallel Phone */}
      <ParallelPhone mode={mode} />

      {/* Feature 2: Memory Scavenger Hunt */}
      <MemoryScavengerHunt mode={mode} />

      {/* Feature 3: Atmospheric Audio Player */}
      <AtmosphericPlayer mode={mode} />

      {/* Feature 4: Heartbeat Button (Existing) */}
      <HeartbeatButton mode={mode} />

      {/* Footer */}
      <footer className="py-12 text-center opacity-50 relative z-10">
        <p className={clsx(
          "text-xs tracking-[0.3em] uppercase transition-colors duration-500",
          mode === "reality" ? "text-reality-text font-serif" : "text-script-text font-handwriting"
        )}>
          {mode === "reality" 
            ? "Based on the story of Architect Hu Xiu & Xiao Zhiyu" 
            : "Directed by Fate • Starring Agent Hu Xiu & NPC Qin Xiaoyi"}
        </p>
      </footer>
    </main>
  );
}
