"use client"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

const techStack = [
  { name: "React", icon: "⚛️" },
  { name: "Node.js", icon: "🟢" },
  { name: "Kubernetes", icon: "☸️" },
  { name: "Kali Linux", icon: "🐉" },
  { name: "Go", icon: "🔵" },
  { name: "Python", icon: "🐍" },
  { name: "Windows", icon: "🪟" },
  { name: "TypeScript", icon: "📘" },
  { name: "Next.js", icon: "▲" },
  { name: "AWS", icon: "☁️" },
  { name: "Docker", icon: "🐳" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Redis", icon: "🔴" },
  { name: "GraphQL", icon: "◆" },
  { name: "Pentesting", icon: "🔐" },
  { name: "Tailwind", icon: "🎨" },
  { name: "Git", icon: "📦" },
]

export function TechStackMarquee() {
  const [isPaused, setIsPaused] = useState(false)
  const marqueeRef = useRef<HTMLDivElement>(null)

  return (
    <section id="tech-stack" className="relative min-h-screen bg-card py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-4 text-balance">Tech Stack</h2>
        <p className="text-center text-muted-foreground mb-16 text-lg">
          Technologies I work with to build exceptional products
        </p>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className={cn(
              "absolute inset-0 bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:4rem_4rem]",
              !isPaused && "animate-pulse",
            )}
            style={{
              animationDuration: "3s",
            }}
          />
        </div>

        {/* Marquee Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          ref={marqueeRef}
        >
          <div className="overflow-hidden">
            <div
              className={cn("flex gap-8 py-8", !isPaused && "animate-marquee")}
              style={{
                width: "fit-content",
              }}
            >
              {/* Duplicate items for seamless loop */}
              {[...techStack, ...techStack, ...techStack].map((tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className="flex flex-col items-center justify-center min-w-[180px] p-8 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-background/80 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                  tabIndex={0}
                  role="listitem"
                >
                  <span className="text-7xl mb-4" aria-hidden="true">
                    {tech.icon}
                  </span>
                  <span className="text-base font-semibold text-foreground">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-card to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-card to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
