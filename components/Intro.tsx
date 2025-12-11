"use client";

import { useEffect, useState, ReactNode } from "react";
import { MorphingText } from "@/components/ui/morphing-text";
import { Cpu, Wifi, Gauge } from "lucide-react";

interface IntroProps {
  children: React.ReactNode;
}

export default function Intro({ children }: IntroProps) {
  const [showIntro, setShowIntro] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  // Define the intro items here internally
  const items: ReactNode[] = [
    <div key="iot" className="flex items-center gap-3">
      <Wifi size={42} /> Internet of Things
    </div>,
    <div key="ai" className="flex items-center gap-3">
      <Cpu size={42} /> Artificial Intelligence
    </div>,
    <div key="hps" className="flex items-center gap-3">
      <Gauge size={42} /> High-Performance Software
    </div>,
    <div key="title" className="text-5xl">
      Engineering Intelligent Systems
    </div>,
  ];

  // Each morph cycle = 2s (1.5 morph + 0.5 cooldown)
  const totalDuration = items.length * 2000;

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), totalDuration - 500);
    const hideTimer = setTimeout(() => setShowIntro(false), totalDuration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [totalDuration]);

  return (
    <div className="relative w-full">
      {/* INTRO OVERLAY */}
      {showIntro && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black text-white transition-opacity duration-700 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <MorphingText items={items} />
        </div>
      )}

      {/* MAIN CONTENT */}
      <div
        className={`transition-opacity duration-700 ${
          showIntro ? "opacity-0 h-screen overflow-hidden" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </div>
  );
}