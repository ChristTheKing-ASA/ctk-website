import { Hero } from "@/components/sections/Hero";
import { Announcements } from "@/components/sections/Announcements";
import { WhatIsAnglicanism } from "@/components/sections/WhatIsAnglicanism";
import { RectorWelcome } from "@/components/sections/RectorWelcome";
import { FeaturedMinistries } from "@/components/sections/FeaturedMinistries";
import { QuickLinks } from "@/components/sections/QuickLinks";

export default function Home() {
  return (
    <>
      <Hero />
      <Announcements />
      <WhatIsAnglicanism />
      <RectorWelcome />
      <FeaturedMinistries />
      <QuickLinks />
    </>
  );
}
