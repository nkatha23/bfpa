import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { About } from "@/components/about"
import { CoursesSection } from "@/components/courses-section"
import { Timeline } from "@/components/timeline"
import { Testimonials } from "@/components/testimonials"
import { Partnerships } from "@/components/partnerships"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <CoursesSection />
        <Timeline />
        <Testimonials />
        <Partnerships />
      </main>
      <Footer />
    </>
  )
}
