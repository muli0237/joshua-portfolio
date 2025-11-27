import { HeroSection } from "@/components/hero-section"
import { Navigation } from "@/components/navigation"
import { ProjectsCarousel } from "@/components/projects-carousel"
import { TechStackMarquee } from "@/components/tech-stack-marquee"
import { AboutSection } from "@/components/about-section"
import { SecurityTerminal } from "@/components/security-terminal"
import { ContactSection } from "@/components/contact-section"

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="relative">
        <section id="home">
          <HeroSection />
        </section>

        <ProjectsCarousel />

        <TechStackMarquee />

        <AboutSection />

        <SecurityTerminal />

        <ContactSection />
      </main>
    </>
  )
}
