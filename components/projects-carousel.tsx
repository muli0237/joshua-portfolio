"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ExternalLink, Github, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ElectricBorder } from "@/components/ui/electric-border"

interface LightPosition {
  x: number
  y: number
}

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "Full-featured e-commerce platform with real-time inventory management, payment processing, and order tracking.",
    tech: ["Next.js", "Stripe", "Nodejs", "Docker"],
    github: "https://github.com",
    demo: "https://demo.com",
    image: "/modern-ecommerce-dashboard.png",
  },
  {
    id: 2,
    title: "Headless CMS",
    description:
      "Flexible content management system with GraphQL API, role-based access control, and media management.",
    tech: ["NestJS", "GraphQL", "PostgreSQL", "S3"],
    github: "https://github.com",
    demo: "https://demo.com",
    image: "/cms-content-management-interface.jpg",
  },
  {
    id: 3,
    title: "School Management System",
    description:
      "Comprehensive school management platform with student tracking, grade management, and parent portals.",
    tech: ["React", "Nodejs", "RBAC"],
    github: "https://github.com",
    demo: "https://demo.com",
    image: "/school-management-dashboard.png",
  },
  {
    id: 4,
    title: "Data Analysis Platform",
    description: "Advanced data visualization and analysis platform with real-time processing and interactive charts.",
    tech: ["Django", "Pandas", "D3.js", "Celery"],
    github: "https://github.com",
    demo: "https://demo.com",
    image: "/data-analytics-dashboard.png",
  },
  {
    id: 5,
    title: "Pen-Testing Dashboard",
    description: "Security testing dashboard with real-time network scanning, vulnerability detection, and reporting.",
    tech: ["React", "Nodejs", "WebSocket", "Nmap"],
    github: "https://github.com",
    demo: "https://demo.com",
    image: "/cybersecurity-penetration-testing-dashboard.jpg",
  },
]

export function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [lightPosition, setLightPosition] = useState<LightPosition>({ x: 0, y: 0 })
  const [showLight, setShowLight] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const autoPlayRef = useRef<NodeJS.Timeout>()
  const lastInteractionRef = useRef<number>(Date.now())

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Auto-advance carousel
  useEffect(() => {
    if (prefersReducedMotion) return

    const checkAutoPlay = () => {
      const timeSinceInteraction = Date.now() - lastInteractionRef.current
      if (timeSinceInteraction >= 7000) {
        setCurrentIndex((prev) => (prev + 1) % projects.length)
        lastInteractionRef.current = Date.now()
      }
    }

    autoPlayRef.current = setInterval(checkAutoPlay, 1000)
    return () => clearInterval(autoPlayRef.current)
  }, [prefersReducedMotion])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
    lastInteractionRef.current = Date.now()
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
    lastInteractionRef.current = Date.now()
  }

  const handleCardClick = (project: (typeof projects)[0]) => {
    setSelectedProject(project)
    lastInteractionRef.current = Date.now()
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (prefersReducedMotion || index !== currentIndex) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePosition({ x, y })

    // Update ambient light position (in pixels relative to card)
    const lightX = e.clientX - rect.left
    const lightY = e.clientY - rect.top
    setLightPosition({ x: lightX, y: lightY })
    setShowLight(true)
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
    setShowLight(false)
  }

  return (
    <section id="projects" className="relative min-h-screen bg-[#0a0a0a] py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-4 text-balance">Featured Projects</h2>
        <p className="text-center text-muted-foreground mb-6 text-lg max-w-3xl mx-auto">
          Explore my latest work in full-stack development and security research. Each project showcases
          cutting-edge technologies, scalable architectures, and security-first design principles.
        </p>
        <p className="text-center text-muted-foreground/70 mb-16 text-sm">
          Hover over cards to see the ambient light effect • Click to view details
        </p>

        {/* 3D Carousel */}
        <div className="relative h-[600px] perspective-[2000px]">
          <div className="relative w-full h-full flex items-center justify-center">
            {projects.map((project, index) => {
              const offset = index - currentIndex
              const isActive = offset === 0
              const absOffset = Math.abs(offset)

              return (
                <div
                  key={project.id}
                  className={cn(
                    "absolute transition-all duration-700 ease-out cursor-pointer",
                    isActive ? "z-20" : "z-10",
                  )}
                  style={{
                    transform: prefersReducedMotion
                      ? `translateX(${offset * 300}px) scale(${isActive ? 1 : 0.8})`
                      : `
                      translateX(${offset * 300}px)
                      translateZ(${isActive ? 0 : -absOffset * 200}px)
                      rotateY(${offset * -15}deg)
                      scale(${isActive ? 1 : 0.8 - absOffset * 0.1})
                    `,
                    opacity: absOffset > 2 ? 0 : 1 - absOffset * 0.3,
                    pointerEvents: absOffset > 2 ? "none" : "auto",
                  }}
                  onClick={() => handleCardClick(project)}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <ElectricBorder
                    color={isActive ? "#7df9ff" : "#6366f1"}
                    speed={isActive ? 1.5 : 0.8}
                    chaos={isActive ? 0.6 : 0.3}
                    thickness={isActive ? 3 : 2}
                    style={{ borderRadius: '1rem' }}
                  >
                    <Card
                      className={cn(
                        "w-[600px] h-[480px] overflow-hidden transition-all duration-300 relative border-0",
                        isActive && "shadow-2xl shadow-primary/20 hover:shadow-primary/40",
                      )}
                      style={
                        isActive && !prefersReducedMotion
                          ? {
                              transform: `
                              rotateX(${mousePosition.y * 10}deg)
                              rotateY(${mousePosition.x * 10}deg)
                            `,
                            }
                          : undefined
                      }
                    >
                    {/* Ambient Light Effect */}
                    {isActive && showLight && !prefersReducedMotion && (
                      <div
                        className="absolute pointer-events-none z-10 transition-all duration-300 ease-out"
                        style={{
                          left: `${lightPosition.x}px`,
                          top: `${lightPosition.y}px`,
                          width: "250px",
                          height: "250px",
                          background: "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(99, 102, 241, 0.2) 30%, transparent 70%)",
                          borderRadius: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    )}

                    <div className="relative h-full">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>
                        <p className="text-sm text-gray-300 mb-4 line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="bg-primary/20 text-primary border-primary/30"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                  </ElectricBorder>
                </div>
              )
            })}
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="rounded-full bg-card/50 backdrop-blur-sm hover:bg-card/80 h-12 w-12"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <div className="flex gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index)
                    lastInteractionRef.current = Date.now()
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === currentIndex ? "bg-primary w-8" : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
                  )}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="rounded-full bg-card/50 backdrop-blur-sm hover:bg-card/80 h-12 w-12"
              aria-label="Next project"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Full-Screen Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-card rounded-2xl overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 rounded-full bg-black/50 hover:bg-black/70 h-12 w-12"
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </Button>

            <div className="grid md:grid-cols-2 gap-6 p-8">
              <div>
                <img
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              <div>
                <h3 className="text-3xl font-bold mb-4">{selectedProject.title}</h3>
                <p className="text-muted-foreground mb-6">{selectedProject.description}</p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button asChild className="flex-1">
                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-5 w-5" />
                      GitHub
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="flex-1 bg-transparent">
                    <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-5 w-5" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
