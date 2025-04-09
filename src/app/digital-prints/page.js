"use client";

import PosterCarousel from "@/components/PosterCarousel"
import { Seo } from "@/components/Seo";

export default function DigitalPrints() {
  /*return <PosterCarousel />;*/
  return (
    <>
    <Seo title="Anita Gonzalez Gallery-Digital Prints" />
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <PosterCarousel />
    </div></>
  );
}
