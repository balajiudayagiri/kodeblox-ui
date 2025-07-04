import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Palette } from "lucide-react";
import { Button } from "kodebloxui/components/ui/button";

const GradiantSvg = dynamic(() => import("./GradiantSvg"), { ssr: false });

function GradientPaletteHero() {
  return (
    <div className="py-12 flex max-lg:flex-col-reverse md:mx-5 gap-6  max-md:px-4">
      <div className="lg:w-1/2 lg:h-[inherit] flex justify-center items-center">
        <div className="text-primary">
          <h1 className="text-3xl md:text-6xl font-bold  leading-tight mb-4 text-primary flex items-center text-center justify-center gap-2">
            <Palette className="md:size-12 size-8" />
            <span>Gradient Gallery</span>
          </h1>
          <p className="text-center mb-10 text-lg text-gray-300">
            Explore our extensive collection of beautiful gradient backgrounds.
            Choose any gradient to see how it enhances your design. Click on a
            gradient to copy the CSS code and elevate your projects with
            stunning color transitions.
          </p>
          <div className="w-full text-center">
            <Link href={"/gradientpalette"}>
              <Button className="font-semibold">Go to Color Palette</Button>
            </Link>
          </div>
        </div>
      </div>
      <GradiantSvg className="lg:w-1/2" />
    </div>
  );
}

export default GradientPaletteHero;
