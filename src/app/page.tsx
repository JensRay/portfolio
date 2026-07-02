import Nav from "@/components/Nav";
import IntroSequence from "@/components/IntroSequence";
import Experience from "@/components/Experience";
import Capabilities from "@/components/Capabilities";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* IntroSequence's first panel IS the hero — scroll goes right from there. */}
        <IntroSequence />
        <Experience />
        <Capabilities />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
