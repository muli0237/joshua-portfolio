"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Github, Linkedin, Twitter, Mail, Lock, Unlock } from "lucide-react"
import { cn } from "@/lib/utils"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Reset form
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" })
      setIsSuccess(false)
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="relative min-h-screen bg-[#0a0a0a] py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-4 text-balance">Get In Touch</h2>
        <p className="text-center text-muted-foreground mb-16 text-lg">Let's build something amazing together</p>

        <div className="max-w-2xl mx-auto" id="contact-form">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="relative">
              <Label
                htmlFor="name"
                className={cn(
                  "absolute left-3 transition-all duration-200 pointer-events-none",
                  focusedField === "name" || formData.name
                    ? "-top-2 text-xs bg-[#0a0a0a] px-2 text-primary"
                    : "top-3 text-muted-foreground",
                )}
              >
                Your Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                required
                className="pt-6 pb-2 bg-transparent border-2 border-border focus:border-primary transition-all duration-300"
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <Label
                htmlFor="email"
                className={cn(
                  "absolute left-3 transition-all duration-200 pointer-events-none",
                  focusedField === "email" || formData.email
                    ? "-top-2 text-xs bg-[#0a0a0a] px-2 text-primary"
                    : "top-3 text-muted-foreground",
                )}
              >
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                required
                className="pt-6 pb-2 bg-transparent border-2 border-border focus:border-primary transition-all duration-300"
              />
            </div>

            {/* Message Field */}
            <div className="relative">
              <Label
                htmlFor="message"
                className={cn(
                  "absolute left-3 transition-all duration-200 pointer-events-none",
                  focusedField === "message" || formData.message
                    ? "-top-2 text-xs bg-[#0a0a0a] px-2 text-primary"
                    : "top-3 text-muted-foreground",
                )}
              >
                Your Message
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                required
                rows={6}
                className="pt-6 pb-2 bg-transparent border-2 border-border focus:border-primary transition-all duration-300 resize-none"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="w-full relative overflow-hidden group bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
            >
              {isSubmitting ? (
                <>
                  <Lock className="mr-2 h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : isSuccess ? (
                <>
                  <Unlock className="mr-2 h-5 w-5 animate-scale-in" />
                  Message Sent!
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  Send Message
                </>
              )}
            </Button>
          </form>

          {/* Success Confetti Effect */}
          {isSuccess && (
            <div className="fixed inset-0 pointer-events-none z-50" aria-hidden="true">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-primary rounded-full animate-confetti"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: "-10px",
                    animationDelay: `${Math.random() * 0.5}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Social Links */}
          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-center text-muted-foreground mb-6">Or connect with me on</p>
            <div className="flex justify-center gap-6">
              <a
                href="https://github.com/muli0237"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 rounded-full bg-card border border-border hover:border-primary transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6 group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://linkedin.com/in/joshuamuli"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 rounded-full bg-card border border-border hover:border-primary transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6 group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://twitter.com/joshuamuli"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 rounded-full bg-card border border-border hover:border-primary transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6 group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 text-center text-sm text-muted-foreground">
            <p>© 2025 Joshua Muli. Built with Next.js, TypeScript, and Tailwind CSS.</p>
            <p className="mt-2">Designed for performance, security, and accessibility.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
