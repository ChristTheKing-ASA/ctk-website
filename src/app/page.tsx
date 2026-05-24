import { Hero } from "@/components/sections/Hero";
import { Announcements } from "@/components/sections/Announcements";
import { MissionPillars } from "@/components/sections/MissionPillars";
import { WhatIsAnglicanism } from "@/components/sections/WhatIsAnglicanism";
import { RectorWelcome } from "@/components/sections/RectorWelcome";
import { FeaturedMinistries } from "@/components/sections/FeaturedMinistries";
import { QuickLinks } from "@/components/sections/QuickLinks";

export default function Home() {
  return (
    <>
      <Hero />
      <Announcements />
      <MissionPillars />
      <WhatIsAnglicanism />
      <RectorWelcome />
      <FeaturedMinistries />
      <QuickLinks />
    </>
  );
}
