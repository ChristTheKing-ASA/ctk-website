import { Hero } from "@/components/sections/Hero";
import { WhatIsAnglicanism } from "@/components/sections/WhatIsAnglicanism";
import { RectorWelcome } from "@/components/sections/RectorWelcome";
import { FeaturedMinistries } from "@/components/sections/FeaturedMinistries";
import { QuickLinks } from "@/components/sections/QuickLinks";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatIsAnglicanism />
      <RectorWelcome />
      <FeaturedMinistries />
      <QuickLinks />
    </>
  );
}
