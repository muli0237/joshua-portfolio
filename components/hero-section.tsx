"use client"

import { Button } from "@/components/ui/button"
import { GradientMesh } from "./gradient-mesh"
import { ElectricBorder } from "@/components/ui/electric-border"

export function HeroSection() {
  const name = "Joshua Muli"
  const subtitle = "Full-Stack Engineer & Security Researcher"

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* WebGL Gradient Mesh Background */}
      <GradientMesh />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto py-8">
        {/* Animated Name with Glitch Effect */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight animate-slide-up-infinite relative group">
          <span className="relative inline-block animate-glitch">
            {name}
            <span className="absolute top-0 left-0 w-full h-full animate-glitch-1" aria-hidden="true">
              {name}
            </span>
            <span className="absolute top-0 left-0 w-full h-full animate-glitch-2" aria-hidden="true">
              {name}
            </span>
          </span>
        </h1>

        {/* Terminal-style Subtitle */}
        <div className="mb-8 flex items-center justify-center gap-2 animate-slide-up-infinite" style={{ animationDelay: "0.3s" }}>
          <span className="text-secondary font-mono text-lg md:text-xl">{">"}</span>
          <p className="font-mono text-lg md:text-xl text-muted-foreground">
            {subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up-infinite" style={{ animationDelay: "0.5s" }}>
          Crafting secure, scalable, and high-performance web applications with modern technologies.
          Specializing in React, Next.js, Node.js, Go, and Python. Expert in ethical hacking, Kali Linux,
          Windows security, and Kubernetes orchestration with a focus on cybersecurity best practices.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto animate-slide-up-infinite" style={{ animationDelay: "0.7s" }}>
          <ElectricBorder color="#6366f1" speed={0.8} chaos={0.3} thickness={2} style={{ borderRadius: '0.5rem' }}>
            <div className="p-4 rounded-lg bg-card/30 backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">5+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
          </ElectricBorder>
          <ElectricBorder color="#8b5cf6" speed={0.9} chaos={0.3} thickness={2} style={{ borderRadius: '0.5rem' }}>
            <div className="p-4 rounded-lg bg-card/30 backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
          </ElectricBorder>
          <ElectricBorder color="#ec4899" speed={1.0} chaos={0.3} thickness={2} style={{ borderRadius: '0.5rem' }}>
            <div className="p-4 rounded-lg bg-card/30 backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">20+</div>
              <div className="text-sm text-muted-foreground">Technologies</div>
            </div>
          </ElectricBorder>
          <ElectricBorder color="#10b981" speed={0.7} chaos={0.3} thickness={2} style={{ borderRadius: '0.5rem' }}>
            <div className="p-4 rounded-lg bg-card/30 backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
          </ElectricBorder>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-up-infinite" style={{ animationDelay: "0.9s" }}>
          <ElectricBorder color="#7df9ff" speed={1.2} chaos={0.5} thickness={3} style={{ borderRadius: '0.75rem' }}>
            <Button
              size="lg"
              onClick={scrollToProjects}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/50 border-0"
            >
              View My Work
            </Button>
          </ElectricBorder>
          <ElectricBorder color="#a78bfa" speed={1.0} chaos={0.5} thickness={3} style={{ borderRadius: '0.75rem' }}>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-0 hover:bg-primary/10 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
            >
              Get In Touch
            </Button>
          </ElectricBorder>
        </div>

        {/* Specializations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto animate-slide-up-infinite" style={{ animationDelay: "1.1s" }}>
          <ElectricBorder color="#fbbf24" speed={0.8} chaos={0.4} thickness={2} style={{ borderRadius: '0.75rem' }}>
            <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold mb-2">High Performance</h3>
              <p className="text-sm text-muted-foreground">
                Building lightning-fast applications optimized for speed and efficiency
              </p>
            </div>
          </ElectricBorder>
          <ElectricBorder color="#ef4444" speed={0.9} chaos={0.4} thickness={2} style={{ borderRadius: '0.75rem' }}>
            <div className="p-6 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 backdrop-blur-sm hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="text-lg font-semibold mb-2">Security First</h3>
              <p className="text-sm text-muted-foreground">
                Implementing robust security measures to protect against vulnerabilities
              </p>
            </div>
          </ElectricBorder>
          <ElectricBorder color="#3b82f6" speed={1.0} chaos={0.4} thickness={2} style={{ borderRadius: '0.75rem' }}>
            <div className="p-6 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 backdrop-blur-sm hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-3">📈</div>
              <h3 className="text-lg font-semibold mb-2">Scalable Solutions</h3>
              <p className="text-sm text-muted-foreground">
                Architecting systems that grow seamlessly with your business needs
              </p>
            </div>
          </ElectricBorder>
        </div>

        {/* Quick Stats Bar */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-center animate-slide-up-infinite" style={{ animationDelay: "1.3s" }}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Available for freelance</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">📍 Remote / Hybrid</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">🌍 Global Timezone Flexible</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-muted-foreground/50 rounded-full animate-scroll-down" />
          </div>
        </div>
      </div>
    </section>
  )
}
