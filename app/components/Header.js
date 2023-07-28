"use client";
import React from "react";
import { DesktopHeader } from "./DesktopHeader";
import { MobileHeader } from "./MobileHeader";
import { useEffect, useState } from "react";

export const Header = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);
    // Initial check on component mount
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div>{isMobile ? <MobileHeader /> : <DesktopHeader />}</div>;
};
