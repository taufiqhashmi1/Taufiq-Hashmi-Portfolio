"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";

export default function Project() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref as React.RefObject<HTMLDivElement>, () =>
    setActive(null)
  );

  return (
    <div id="projects" className="py-10 px-4">
      {/* --- Section Headings --- */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white dark:text-neutral-100 font-sans">
          Technical Projects
        </h2>
        <p className="mt-4 text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          A focused collection of my work in AI/ML pipelines, Embedded Systems architecture, and Full-Stack engineering.
        </p>
      </div>

      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6 z-50"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90vh] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-60 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div className="flex flex-col flex-1 overflow-hidden">
                <div className="flex justify-between items-start p-4 shrink-0">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-lg"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-sm"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-2 text-sm rounded-full font-bold bg-green-500 text-white shrink-0"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                
                {/* Scrollable Content Area */}
                <div className="relative px-4 pb-4 overflow-y-auto flex-1 custom-scrollbar">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-sm lg:text-base flex flex-col items-start gap-4 dark:text-neutral-400"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* --- Grid Configuration: 2 cols mobile, 4 cols desktop --- */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={card.title}
            className="relative group block p-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>

            <motion.div
              layoutId={`card-${card.title}-${id}`}
              onClick={() => setActive(card)}
              className="rounded-2xl h-full w-full p-4 overflow-hidden bg-white dark:bg-neutral-900 border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 cursor-pointer flex flex-col"
            >
              <div className="flex gap-4 flex-col w-full h-full">
                <motion.div layoutId={`image-${card.title}-${id}`}>
                  <img
                    width={100}
                    height={100}
                    src={card.src}
                    alt={card.title}
                    className="h-40 w-full rounded-lg object-cover object-top"
                  />
                </motion.div>
                <div className="flex justify-center items-center flex-col flex-1">
                  <motion.h3
                    layoutId={`title-${card.title}-${id}`}
                    className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${card.description}-${id}`}
                    className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-xs mt-1"
                  >
                    {card.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

// --- DATA ---
const cards = [
  // --- CLUSTER A: AI / Machine Learning ---
  {
    description: "Computer Vision / Embedded AI",
    title: "FOMO Fruit Detection",
    // Assumes you placed the file in your public folder
    src: "/FomoFruit.webp", 
    ctaText: "View Repo",
    ctaLink: "https://github.com/taufiqhashmi1/Fruit-Detection-Using-FOMO/",
    content: () => {
      return (
        <div className="space-y-4">
          <p>
            <strong>The Problem:</strong> Standard object detection models (YOLO, MobileNet SSD) are too heavy for constrained microcontrollers like the ESP32.
          </p>
          <p>
            <strong>The Solution:</strong> Implemented <strong>FOMO (Faster Objects, More Objects)</strong> architecture. Unlike standard detection, FOMO provides object centroids rather than full bounding boxes, making it up to <strong>30x faster</strong> on DSP-capable silicon.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Hardware:</strong> AI-Thinker ESP32-CAM (4MB PSRAM).</li>
            <li><strong>Performance:</strong> ~150ms inference time (15 FPS), &lt;250KB RAM usage.</li>
            <li><strong>Stack:</strong> Edge Impulse, C++, Arduino IDE.</li>
          </ul>
        </div>
      );
    },
  },
  {
    description: "Robotics / Sensor Fusion",
    title: "Autonomous Patrol Bot",
    src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop",
    ctaText: "View Repo",
    ctaLink: "https://github.com/taufiqhashmi1/autonomous-patrol-bot",
    content: () => {
      return (
        <div className="space-y-4">
          <p>
            <strong>Overview:</strong> An autonomous mobile robot designed for surveillance and environmental monitoring.
          </p>
          <p>
            <strong>Key Engineering:</strong> 
            Utilized <strong>Sensor Fusion</strong> (ultrasonic, IR, camera) to map environments and avoid obstacles in real-time.
          </p>
          <p>
            <strong>AI Integration:</strong> 
            Deployed lightweight ML models for path planning and anomaly detection, allowing the robot to patrol designated zones without human intervention.
          </p>
        </div>
      );
    },
  },

  // --- CLUSTER C: Software / Full-Stack ---
  {
    description: "SaaS / Dev Tool",
    title: "HashLab",
    src: "/hashlab.webp",
    ctaText: "Try Beta",
    ctaLink: "https://hashlabcode.vercel.app/",
    content: () => {
      return (
        <div className="space-y-4">
          <p>
            <strong>Concept:</strong> An AI-powered online IDE designed to assist developers with real-time debugging and code suggestions.
          </p>
          <p>
            <strong>Tech Stack:</strong> 
            Built with <strong>Tailwind</strong> for a responsive frontend. The backend leverages Python (Django) to interface with LLM APIs (Hugging Face) for code analysis.
          </p>
          <p>
            <strong>Features:</strong> 
            Syntax highlighting, instant error explanation, and automated code refactoring suggestions.
          </p>
        </div>
      );
    },
  },
  {
    description: "Full-Stack Web",
    title: "INWOFU Studio",
    src: "/Inwofu.webp",
    ctaText: "Visit Site",
    ctaLink: "https://inwofu.onrender.com/",
    content: () => {
      return (
        <div className="space-y-4">
          <p>
            <strong>Project:</strong> A complete digital presence for a boutique interior design studio.
          </p>
          <p>
            <strong>Architecture:</strong> 
            Developed using the <strong>Django Framework</strong> (Python) for robust backend management and a custom frontend styling system.
          </p>
          <p>
             <strong>Deployment:</strong> 
             Managed end-to-end deployment including database configuration (SQLite3) and static asset handling on cloud infrastructure.
          </p>
        </div>
      );
    },
  },

  // --- CLUSTER C (Continued): Organizational Leadership ---
  {
    description: "Official Organization",
    title: "IIC-DJSCE Website",
    src: "/IIC.webp",
    ctaText: "Visit IIC",
    ctaLink: "https://iic-website-iota.vercel.app/",
    content: () => {
      return (
        <div className="space-y-4">
          <p>
            <strong>Role:</strong> Tech Head & Lead Developer
          </p>
          <p>
            <strong>Scope:</strong> 
            Building the official platform for the Institution's Innovation Council (IIC) at DJSCE from scratch.
          </p>
          <p>
            <strong>Impact:</strong> 
            The platform centralizes event registrations, team showcases, and innovation resources for the student body. Focused on scalability and modern UI/UX principles.
          </p>
        </div>
      );
    },
  },
  {
    description: "Consulting Group",
    title: "DJS-Consulting",
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
    ctaText: "Visit Site",
    ctaLink: "#",
    content: () => {
      return (
        <div className="space-y-4">
          <p>
            <strong>Role:</strong> Tech Head
          </p>
          <p>
            <strong>Overview:</strong> 
            Spearheading the technical development of the DJS Consulting Group's digital portfolio.
          </p>
          <p>
             Designed to showcase case studies, student consultant profiles, and industry reports. Implemented a CMS-like structure to allow non-technical team members to update content easily.
          </p>
        </div>
      );
    },
  },
];