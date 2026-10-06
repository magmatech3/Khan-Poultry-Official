import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Stats from "@/components/Stats";
import Showcase from "@/components/Showcase";
import LambFeature from "@/components/LambFeature";
import MartOverview from "@/components/MartOverview";
import Instagram from "@/components/Instagram";
import Locations from "@/components/Locations";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import Cta from "@/components/Cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Stats />
      <Showcase />
      <LambFeature />
      <Locations />
      <MartOverview />
      <Instagram />
      <Testimonials />
      <Partners />
      <Cta />
    </>
  );
}