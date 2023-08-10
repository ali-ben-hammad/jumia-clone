import React from "react";
import Link from "next/link";

export const TopBar = ({ props }) => {
  return (
    <div className="px-4 flex  items-center w-full bg-custom-orange h-12 text-lg font-medium">
      <div>{props.title}</div>
      <div className="ml-auto ">
        <Link href="#" className="mb-1 flex items-center uppercase text-sm">
          <span>voir plus</span>
          <svg viewBox="0 0 24 24" class="ic" width="24" height="24">
            <path d="M9 15.84 12.84 12 9 8.18 10.18 7l5 5-5 5z"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};
