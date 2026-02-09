import Footer from "./components/Footer";
import HeroSection from "./components/sections/HeroSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import TechTimeline from "./components/sections/TechTimeline";
import BlogPreview from "./components/sections/BlogPreview";
import ContactSection from "./components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />

        {/* Editorial divider: Hero → Projects */}
        <div className="mx-auto max-w-6xl px-6 lg:px-0">
          <div className="editorial-rule text-text-3">
            <span className="text-[10px] tracking-widest">◆</span>
          </div>
        </div>

        <ProjectsSection />
        <TechTimeline />
        <BlogPreview />

        {/* Editorial divider: Blog → Contact */}
        <div className="mx-auto max-w-6xl px-6 lg:px-0">
          <div className="editorial-rule text-text-3">
            <span className="text-[10px] tracking-widest">◆</span>
          </div>
        </div>

        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
