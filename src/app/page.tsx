import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import Marquee from "@/sections/Marquee";
import About from "@/sections/About";
import Experience from "@/sections/Experience";
import MenuHighlights from "@/sections/MenuHighlights";
import Gallery from "@/sections/Gallery";
import NightlifeEvents from "@/sections/NightlifeEvents";
import Reviews from "@/sections/Reviews";
import ReserveCTA from "@/sections/ReserveCTA";
import LocationHours from "@/sections/LocationHours";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <MenuHighlights />
        <div className="section-divider" />
        <Gallery />
        <div className="section-divider" />
        <NightlifeEvents />
        <div className="section-divider" />
        <Reviews />
        <div className="section-divider" />
        <ReserveCTA />
        <div className="section-divider" />
        <LocationHours />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
