"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "about", label: "About" },
  { id: "security", label: "Security" },
  { id: "contact", label: "Contact" },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState("home")
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    // Intersection Observer for section tracking
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections
    navItems.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Scroll behavior for auto-hide/show
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 100) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false)
      } else {
        // Scrolling up
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full",
      )}
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="relative backdrop-blur-md bg-card/30 border border-border/20 rounded-2xl shadow-lg shadow-black/10">
          {/* Glassmorphism effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 rounded-2xl" />

          <div className="relative flex items-center justify-center gap-1 p-2">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg",
                    "hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive ? "text-foreground" : "text-muted-foreground",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}

                  {/* Animated underline "comet" */}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-slide-in"
                      aria-hidden="true"
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
