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
import DualLookGallery from "@/components/DualLookGallery";
import clsx from "clsx";

export default function Home() {
  const [mode, setMode] = useState<"reality" | "script">("reality");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const toggleMode = () => {
    setMode((prev) => (prev === "reality" ? "script" : "reality"));
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

      {/* 1. Hero Section: The Dual Switch */}
      <HeroSection mode={mode} onToggle={toggleMode} />

      {/* Feature: Story Arcs (Deep Content) */}
      <StoryArcs mode={mode} />

      {/* 2. Love Timeline: From Blueprint to Heartbeat */}
      <LoveTimeline mode={mode} />

      {/* Feature: Dual-Look Photo Gallery */}
      <DualLookGallery mode={mode} />

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
            : "Directed by Fate • Starring Player 026 & NPC Qin Xiaoyi"}
        </p>
      </footer>
    </main>
  );
}
