import { getVideos } from "@/lib/videos";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { Pricing } from "@/components/Pricing";
import { About } from "@/components/About";
import { Team } from "@/components/Team";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { DemoBanner } from "@/components/DemoBanner";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { videos, usingDemo } = await getVideos();
  const featured = videos.find((v) => v.is_featured) ?? videos[0] ?? null;

  return (
    <div className="bg-aurora min-h-screen">
      {usingDemo && <DemoBanner />}
      <Navbar />
      <main>
        <Hero featured={featured} />
        <Features />
        <PortfolioGrid videos={videos} />
        <Pricing />
        <About />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
