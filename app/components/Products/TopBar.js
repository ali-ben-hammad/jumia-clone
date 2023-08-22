import React from "react";
import Link from "next/link";

export const TopBar = ({ props }) => {
  return (
    <div className="flex items-center w-full h-12 px-4 text-lg font-medium bg-custom-orange">
      <div>{props.title}</div>
      {/*
      <div className="ml-auto ">
        <Link href="#" className="flex items-center mb-1 text-sm uppercase">
          <span>voir plus</span>
          <svg viewBox="0 0 24 24" class="ic" width="24" height="24">
            <path d="M9 15.84 12.84 12 9 8.18 10.18 7l5 5-5 5z"></path>
          </svg>
        </Link>
      </div>
      */}
    </div>
  );
};
