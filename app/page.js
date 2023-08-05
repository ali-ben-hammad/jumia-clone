import React from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";

export default function Home() {
  return (
    <div className="bg-blue-200">
      <Header />
      <div className="container mx-auto max-w-[1184px] text-custom-gray h-screen">
        <div className="">
          <HeroSection />
        </div>
      </div>
    </div>
  );
}
