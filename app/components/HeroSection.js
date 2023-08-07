"use client";

import React, { useEffect, useState } from "react";
import { Catergories } from "./HeroSection/Catergories";
import { Pub } from "./HeroSection/Pub";
import { Support } from "./HeroSection/Support";

export const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 954); // Adjust the breakpoint as needed
    };
    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);
    // Initial check on component mount
    handleResize();
    console.log(isMobile);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  return (
    <div className="grid-cols-4 p-4 grid  gap-4">
      <div
        className={`col-span-1 h-full bg-white rounded drop-shadow-md 
          ${isMobile ? "hidden" : "block"}`}
      >
        <Catergories />
      </div>
      <div
        className={` h-full bg-white rounded drop-shadow-md" + ${
          isMobile ? "col-span-4" : "col-span-3"
        }
            `}
      >
        <Pub />
      </div>
    </div>
  );
};

//export default HeroSection;
