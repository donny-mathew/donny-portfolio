import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import AskDonny from "@/components/AskDonny";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Timeline />
      <Contact />
      <AskDonny />
    </main>
  );
}
