"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const terminalCommands = [
  [
    { text: "$ nmap -sV -sC -O joshua-muli.dev", type: "command" },
    { text: "", type: "empty" },
    { text: "Starting Nmap 7.94 ( https://nmap.org )", type: "output" },
    { text: "Nmap scan report for joshua-muli.dev (192.168.1.1)", type: "output" },
    { text: "Host is up (0.00012s latency).", type: "output" },
    { text: "", type: "empty" },
    { text: "PORT     STATE SERVICE  VERSION", type: "output" },
    { text: "22/tcp   open  ssh      OpenSSH 8.9p1", type: "output" },
    { text: "80/tcp   open  http     nginx 1.24.0", type: "output" },
    { text: "443/tcp  open  ssl/http nginx 1.24.0", type: "output" },
    { text: "", type: "empty" },
    { text: "✓ 0 vulnerabilities found", type: "success" },
    { text: "✓ All ports properly secured", type: "success" },
  ],
  [
    { text: "$ docker ps --format 'table {{.Names}}\\t{{.Status}}'", type: "command" },
    { text: "", type: "empty" },
    { text: "NAMES              STATUS", type: "output" },
    { text: "web-app            Up 2 days", type: "output" },
    { text: "postgres-db        Up 2 days", type: "output" },
    { text: "redis-cache        Up 2 days", type: "output" },
    { text: "", type: "empty" },
    { text: "$ kubectl get pods -n production", type: "command" },
    { text: "", type: "empty" },
    { text: "NAME                    READY   STATUS    RESTARTS", type: "output" },
    { text: "api-server-7d9f8        2/2     Running   0", type: "output" },
    { text: "frontend-5c8b4          1/1     Running   0", type: "output" },
    { text: "✓ All pods healthy", type: "success" },
  ],
  [
    { text: "$ nikto -h https://joshua-muli.dev", type: "command" },
    { text: "", type: "empty" },
    { text: "- Nikto v2.5.0", type: "output" },
    { text: "+ Target IP: 192.168.1.1", type: "output" },
    { text: "+ Target Hostname: joshua-muli.dev", type: "output" },
    { text: "+ Target Port: 443", type: "output" },
    { text: "", type: "empty" },
    { text: "+ SSL Info: Subject: /CN=joshua-muli.dev", type: "output" },
    { text: "+ SSL Info: Issuer: /C=US/O=Let's Encrypt", type: "output" },
    { text: "+ Server: nginx/1.24.0", type: "output" },
    { text: "", type: "empty" },
    { text: "✓ No vulnerabilities detected", type: "success" },
    { text: "✓ Security headers properly configured", type: "success" },
  ],
  [
    { text: "$ metasploit-framework", type: "command" },
    { text: "", type: "empty" },
    { text: "       =[ metasploit v6.3.25-dev                         ]", type: "output" },
    { text: "+ -- --=[ 2345 exploits - 1220 auxiliary - 413 post       ]", type: "output" },
    { text: "+ -- --=[ 1385 payloads - 46 encoders - 11 nops          ]", type: "output" },
    { text: "", type: "empty" },
    { text: "msf6 > use auxiliary/scanner/http/ssl_version", type: "command" },
    { text: "msf6 auxiliary(scanner/http/ssl_version) > set RHOSTS joshua-muli.dev", type: "command" },
    { text: "msf6 auxiliary(scanner/http/ssl_version) > run", type: "command" },
    { text: "", type: "empty" },
    { text: "[+] TLS 1.2 supported", type: "output" },
    { text: "[+] TLS 1.3 supported", type: "output" },
    { text: "✓ Strong encryption enabled", type: "success" },
  ],
]

export function SecurityTerminal() {
  const [currentCommandSet, setCurrentCommandSet] = useState(0)
  const [currentLine, setCurrentLine] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [visibleLines, setVisibleLines] = useState<Array<{ text: string; type: string }>>([])
  const [easterEggTriggered, setEasterEggTriggered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout>()
  const lineTimeoutRef = useRef<NodeJS.Timeout>()

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const columns = Math.floor(canvas.width / 20)
    const drops: number[] = Array(columns).fill(1)

    const matrix = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 10, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#22d3ee"
      ctx.font = "15px monospace"

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)]
        ctx.fillText(text, i * 20, drops[i] * 20)

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 50)
    return () => clearInterval(interval)
  }, [])

  // Intersection observer to start animation when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Infinite typewriter effect
  useEffect(() => {
    if (!isVisible) return

    const currentCommands = terminalCommands[currentCommandSet]

    if (currentLine >= currentCommands.length) {
      // Pause before clearing and starting next command set
      lineTimeoutRef.current = setTimeout(() => {
        setVisibleLines([])
        setCurrentLine(0)
        setCurrentCommandSet((prev) => (prev + 1) % terminalCommands.length)
      }, 3000)
      return
    }

    const currentLineData = currentCommands[currentLine]
    const textToType = currentLineData.text

    if (textToType === "") {
      // Empty line, add immediately
      setVisibleLines((prev) => [...prev, currentLineData])
      setCurrentLine((prev) => prev + 1)
      return
    }

    // Type character by character
    setIsTyping(true)
    let charIndex = 0
    setDisplayedText("")

    const typeChar = () => {
      if (charIndex < textToType.length) {
        setDisplayedText(textToType.slice(0, charIndex + 1))
        charIndex++
        typingTimeoutRef.current = setTimeout(typeChar, 30) // 30ms per character
      } else {
        // Line complete, add to visible lines
        setIsTyping(false)
        setVisibleLines((prev) => [...prev, currentLineData])
        setDisplayedText("")

        // Move to next line after a short delay
        lineTimeoutRef.current = setTimeout(() => {
          setCurrentLine((prev) => prev + 1)
        }, 200)
      }
    }

    typeChar()

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
      if (lineTimeoutRef.current) clearTimeout(lineTimeoutRef.current)
    }
  }, [isVisible, currentLine, currentCommandSet])

  const handleEasterEgg = () => {
    setEasterEggTriggered(true)
    setTimeout(() => setEasterEggTriggered(false), 5000)
  }

  return (
    <section ref={sectionRef} id="security" className="relative min-h-screen bg-card py-20 overflow-hidden">
      {/* Matrix Rain Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-20" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-4 text-balance">Security Corner</h2>
        <p className="text-center text-muted-foreground mb-16 text-lg">
          Demonstrating security-first development practices
        </p>

        {/* Terminal Emulator */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0a0a0a] rounded-lg overflow-hidden shadow-2xl border border-primary/20">
            {/* Terminal Header */}
            <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-2 border-b border-primary/10">
              <div className="flex gap-2">
                <button
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                  aria-label="Close terminal"
                  onClick={handleEasterEgg}
                />
                <div className="w-3 h-3 rounded-full bg-yellow-500" aria-hidden="true" />
                <div className="w-3 h-3 rounded-full bg-green-500" aria-hidden="true" />
              </div>
              <span className="ml-4 text-sm text-muted-foreground font-mono">security-scan.sh</span>
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm min-h-[500px]" role="log" aria-live="polite" aria-atomic="false">
              {visibleLines.map((line, index) => (
                <div
                  key={index}
                  className={cn(
                    "mb-2",
                    line.type === "command" && "text-cyan-400 font-semibold",
                    line.type === "success" && "text-green-400 font-semibold",
                    line.type === "output" && "text-gray-300",
                    line.type === "empty" && "text-gray-300",
                  )}
                >
                  {line.text}
                </div>
              ))}
              {isTyping && (
                <div
                  className={cn(
                    "mb-2",
                    terminalCommands[currentCommandSet][currentLine]?.type === "command" && "text-cyan-400 font-semibold",
                    terminalCommands[currentCommandSet][currentLine]?.type === "success" && "text-green-400 font-semibold",
                    terminalCommands[currentCommandSet][currentLine]?.type === "output" && "text-gray-300",
                  )}
                >
                  {displayedText}
                  <span className="animate-pulse">_</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Easter Egg Alert */}
      {easterEggTriggered && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-red-500/10 backdrop-blur-sm animate-fade-in">
          <div className="bg-red-950 border-2 border-red-500 rounded-lg p-8 max-w-md mx-4 animate-scale-in shadow-2xl shadow-red-500/50">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-bounce">🚨</div>
              <h3 className="text-2xl font-bold text-red-400 mb-2">SECURITY BREACH DETECTED!</h3>
              <p className="text-red-300 mb-4">Unauthorized access attempt logged...</p>
              <div className="h-1 bg-red-500 animate-pulse mb-4" />
              <p className="text-green-400 font-semibold">Just kidding! 😄</p>
              <p className="text-gray-300 text-sm mt-2">
                Thanks for exploring. Security awareness is everyone's responsibility.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
