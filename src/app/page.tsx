import { Header } from "@/components/ui/Header";
import { Hero } from "@/components/ui/Hero";
import { About } from "@/components/ui/About";
import { Projects } from "@/components/ui/Projects";
import { SideHustleSkills } from "@/components/ui/SideHustleSkills";
import { Skills } from "@/components/ui/Skills";
import { Experience } from "@/components/ui/Experience";
import { Contact } from "@/components/ui/Contact";
import { Footer } from "@/components/ui/Footer";
import CustomCursor from "@/components/ui/CustomCursor";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full overflow-hidden">
      <CustomCursor />
      <Header />
      <Hero />
      <About />
      <Projects />
      <SideHustleSkills />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
