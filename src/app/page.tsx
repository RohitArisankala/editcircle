import { getVideos } from "@/lib/videos";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { Pricing } from "@/components/Pricing";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Background } from "@/components/Background";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { videos } = await getVideos();
  const featured = videos.find((v) => v.is_featured) ?? videos[0] ?? null;

  return (
    <div className="relative min-h-screen">
      <Background />
      <Navbar />
      <main>
        <Hero featured={featured} />
        <Pricing />
        <PortfolioGrid videos={videos} />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
