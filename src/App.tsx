import { lazy, Suspense, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Expertise } from "@/components/sections/Expertise";
import { Stats } from "@/components/sections/Stats";
import { Contact } from "@/components/sections/Contact";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

const GlobalBackground = lazy(() =>
  import("@/components/ui/GlobalBackground").then(m => ({ default: m.GlobalBackground }))
);

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <CustomCursor />
      <Suspense fallback={null}>
        <GlobalBackground />
      </Suspense>
      <Navbar />
      <ScrollToTop />
      <main className="min-h-screen text-text-primary transition-colors duration-300 relative z-10 pb-16 md:pb-0">
        <Hero />
        <Experience />
        <Expertise />
        <Stats />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
