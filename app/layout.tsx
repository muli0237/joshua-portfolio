import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { CursorProvider } from "@/components/cursor-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-satoshi",
  display: "swap",
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "Joshua Muli | Full-Stack Engineer & Security Researcher",
  description:
    "Senior full-stack developer and security researcher specializing in high-performance web applications, cybersecurity, and modern JavaScript frameworks. Expert in React, Next.js, Node.js, Go, Python, Kubernetes, ethical hacking, Kali Linux, Windows security, and cloud infrastructure.",
  keywords: [
    "full-stack developer",
    "security researcher",
    "ethical hacker",
    "penetration testing",
    "web development",
    "cybersecurity",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Go",
    "Python",
    "Kubernetes",
    "Kali Linux",
    "Windows security",
    "container orchestration",
  ],
  authors: [{ name: "Joshua Muli" }],
  creator: "Joshua Muli",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://joshua-muli.dev",
    title: "Joshua Muli | Full-Stack Engineer & Security Researcher",
    description:
      "Senior full-stack developer and security researcher specializing in high-performance web applications, cybersecurity, ethical hacking, Kubernetes, and penetration testing.",
    siteName: "Joshua Muli Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joshua Muli | Full-Stack Engineer & Security Researcher",
    description:
      "Senior full-stack developer and security researcher specializing in high-performance web applications, cybersecurity, ethical hacking, and Kubernetes orchestration.",
    creator: "@joshuamuli",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <CursorProvider enabled={true} color="#7df9ff" size={24} trailLength={20} particleCount={8}>
          <Suspense fallback={null}>{children}</Suspense>
          <Analytics />
        </CursorProvider>
      </body>
    </html>
  )
}
