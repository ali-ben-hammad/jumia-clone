import React from "react";
import Image from "next/image";

export const Pub = () => {
  return (
    <div className="overflow-hidden ">
      <Image
        src="/pub.png"
        alt="Picture of the pub"
        width={1000}
        height={560}
        layout="cover"
      />
    </div>
  );
};
