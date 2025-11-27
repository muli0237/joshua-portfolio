"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, CheckCircle2 } from "lucide-react"
import { ProfileCard } from "@/components/ui/profile-card"
import { ElectricBorder } from "@/components/ui/electric-border"
import DecryptedText from "@/components/ui/decrypted-text"

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDownloaded, setIsDownloaded] = useState(false)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const messages = [
    "Building the future, one line of code at a time",
    "Ethical hacker | Penetration testing specialist",
    "Kubernetes expert | Container orchestration master",
    "Securing applications with cutting-edge practices",
    "Kali Linux & Windows security professional",
    "Transforming ideas into scalable solutions",
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Cycle through messages
  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length)
    }, 8000) // Match the typewriter animation duration

    return () => clearInterval(interval)
  }, [isVisible, messages.length])

  const handleDownloadResume = () => {
    // Simulate resume download
    setIsDownloaded(true)
    setTimeout(() => setIsDownloaded(false), 3000)

    // In production, this would trigger actual download
    // window.open('/resume.pdf', '_blank')
  }

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section ref={sectionRef} id="about" className="relative min-h-screen bg-[#0a0a0a] py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-4 text-balance">About Me</h2>
        {/* Typewriter subtitle - News bulletin style */}
        {isVisible && (
          <div className="flex justify-center mb-12 min-h-[32px]">
            <div className="flex items-center gap-3">
              <span className="text-primary font-mono text-lg">▸</span>
              <p
                key={currentMessageIndex}
                className="font-mono text-lg text-muted-foreground animate-typewriter inline-block"
              >
                {messages[currentMessageIndex]}
              </p>
            </div>
          </div>
        )}

        {/* Split-screen layout */}
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left: Profile Card with Electric Border */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="flex justify-center">
              <ElectricBorder
                color="#7df9ff"
                speed={1.2}
                chaos={0.5}
                thickness={3}
                style={{ borderRadius: '1rem' }}
              >
                <ProfileCard
                  avatarUrl="/albert-dera-ILip77SbmOE-unsplash.jpg"
                  name="Joshua Muli"
                  title="Full-Stack Engineer & Security Researcher"
                  handle="joshuamuli"
                  status="Available for Work"
                  contactText="Get In Touch"
                  onContactClick={handleContactClick}
                  enableTilt={true}
                  enableMobileTilt={true}
                  className="w-full max-w-sm"
                />
              </ElectricBorder>
            </div>
          </div>

          {/* Right: Narrative text */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p className="text-pretty">
                <DecryptedText
                  text="I'm a senior full-stack developer and security researcher with a passion for building high-performance web applications that are both beautiful and secure."
                  speed={30}
                  maxIterations={15}
                  sequential={true}
                  revealDirection="start"
                  animateOn="view"
                  repeatInterval={120000}
                  className="text-muted-foreground"
                  encryptedClassName="text-muted-foreground/40"
                />
              </p>

              <p className="text-pretty">
                <DecryptedText
                  text="With expertise spanning from modern frontend frameworks like React and Next.js to backend technologies like Node.js, Go, and Python, I bring a holistic approach to software development."
                  speed={30}
                  maxIterations={15}
                  sequential={true}
                  revealDirection="start"
                  animateOn="view"
                  repeatInterval={120000}
                  className="text-muted-foreground"
                  encryptedClassName="text-muted-foreground/40"
                />
              </p>

              <p className="text-pretty">
                <DecryptedText
                  text="My security research background enables me to build applications with security-first principles, ensuring robust protection against vulnerabilities while maintaining exceptional user experiences."
                  speed={30}
                  maxIterations={15}
                  sequential={true}
                  revealDirection="start"
                  animateOn="view"
                  repeatInterval={120000}
                  className="text-muted-foreground"
                  encryptedClassName="text-muted-foreground/40"
                />
              </p>

              <p className="text-pretty">
                <DecryptedText
                  text="I thrive on solving complex technical challenges and transforming innovative ideas into production-ready solutions that scale."
                  speed={30}
                  maxIterations={15}
                  sequential={true}
                  revealDirection="start"
                  animateOn="view"
                  repeatInterval={120000}
                  className="text-muted-foreground"
                  encryptedClassName="text-muted-foreground/40"
                />
              </p>
            </div>

            {/* Key Skills */}
            <div className="pt-4">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Core Competencies</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm">Full-Stack Development</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm">Ethical Hacking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm">Kubernetes Orchestration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm">Kali Linux & Pentesting</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm">Windows Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm">Cloud Architecture (AWS)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm">DevOps & CI/CD</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm">Container Security</span>
                </div>
              </div>
            </div>

            {/* Download Resume Button */}
            <div className="pt-6">
              <Button
                size="lg"
                onClick={handleDownloadResume}
                disabled={isDownloaded}
                className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
              >
                {isDownloaded ? (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5 animate-scale-in" />
                    Downloaded!
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                    Download Resume
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Info Section - Infinite Carousel */}
        <div className={`mt-20 max-w-6xl mx-auto overflow-hidden transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden">
              <div className="flex gap-8 animate-carousel-scroll">
                {/* Duplicate items 3 times for seamless infinite loop */}
                {[...Array(3)].map((_, setIndex) => (
                  <div key={setIndex} className="flex gap-8 flex-shrink-0">
                    {/* Experience Highlights */}
                    <div className="w-[350px] flex-shrink-0 p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-card/40 transition-all duration-300">
                      <h3 className="text-xl font-semibold mb-4 text-foreground">Experience</h3>
                      <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">▸</span>
                          <span>Led development of enterprise-scale applications serving 100K+ users</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">▸</span>
                          <span>Conducted penetration testing & security audits for Fortune 500 companies</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">▸</span>
                          <span>Deployed & managed Kubernetes clusters in production environments</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">▸</span>
                          <span>Mentored junior developers and led technical teams</span>
                        </li>
                      </ul>
                    </div>

                    {/* Education & Certifications */}
                    <div className="w-[350px] flex-shrink-0 p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50 hover:border-secondary/50 hover:bg-card/40 transition-all duration-300">
                      <h3 className="text-xl font-semibold mb-4 text-foreground">Education</h3>
                      <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">▸</span>
                          <span>B.Sc. Computer Science</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">▸</span>
                          <span>AWS Certified Solutions Architect</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">▸</span>
                          <span>Certified Ethical Hacker (CEH)</span>
                        </li>
                      </ul>
                    </div>

                    {/* Interests */}
                    <div className="w-[350px] flex-shrink-0 p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50 hover:border-accent/50 hover:bg-card/40 transition-all duration-300">
                      <h3 className="text-xl font-semibold mb-4 text-foreground">Interests</h3>
                      <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">▸</span>
                          <span>Open source contributions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">▸</span>
                          <span>Cybersecurity research & CTF competitions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">▸</span>
                          <span>Technical writing & speaking at conferences</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gradient Overlays for fade effect */}
            <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none z-10" />
            <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
