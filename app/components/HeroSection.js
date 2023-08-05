import React from "react";
import { Catergories } from "./HeroSection/Catergories";
import { Pub } from "./HeroSection/Pub";
import { Support } from "./HeroSection/Support";

export const HeroSection = () => {
  return (
    <div className="grid-cols-5 p-4 grid h-96 gap-4">
      <div className="col-span-1 h-full bg-white rounded drop-shadow-md">
        <Catergories />
      </div>
      <div className="col-span-3 h-full bg-white rounded drop-shadow-md">
        <Pub />
      </div>
      <div className="col-span-1 h-full bg-white rounded drop-shadow-md">
        <Support />
      </div>
    </div>
  );
};

//export default HeroSection;
