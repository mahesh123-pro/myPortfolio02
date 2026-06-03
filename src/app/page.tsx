import { Header } from "@/components/ui/Header";
import { Hero } from "@/components/ui/Hero";
import { About } from "@/components/ui/About";
import { Statistics } from "@/components/ui/Statistics";
import { Skills } from "@/components/ui/Skills";
import { Projects } from "@/components/ui/Projects";
import { Certifications } from "@/components/ui/Certifications";
import { Experience } from "@/components/ui/Experience";
import { GithubSection } from "@/components/ui/GithubSection";
import { Contact } from "@/components/ui/Contact";
import { Footer } from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start w-full overflow-x-hidden bg-[#0A0A0A]">
      <Header />
      <Hero />
      
      {/* Content sections container with smooth spacing */}
      <div className="w-full flex flex-col items-center relative z-10">
        <About />
        <Statistics />
        <Skills />
        <Projects />
        <Certifications />
        <Experience />
        <GithubSection />
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
