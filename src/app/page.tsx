import { Header } from "@/components/ui/Header";
import { Hero } from "@/components/ui/Hero";
import { About } from "@/components/ui/About";
import { Services } from "@/components/ui/Services";
import { Projects } from "@/components/ui/Projects";
import { SideHustleSkills } from "@/components/ui/SideHustleSkills";
import { Skills } from "@/components/ui/Skills";
import { Experience } from "@/components/ui/Experience";
import { Testimonials } from "@/components/ui/Testimonials";
import { Contact } from "@/components/ui/Contact";
import { Footer } from "@/components/ui/Footer";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full overflow-x-hidden">
      <Header />
      <Hero />
      <About />
      <Services />
      <Projects />
      <SideHustleSkills />
      <Skills />
      <Experience />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
