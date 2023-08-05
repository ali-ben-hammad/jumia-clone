import React from "react";
import Link from "next/link";

import categoriesData from "public/categoriesData.json";

export const Catergories = () => {
  return (
    <ul className="list-none">
      {categoriesData.map((category) => (
        <Link
          href={"#"}
          className="mg pl-2 h-8 flex items-center hover:text-custom-hover-orange"
        >
          <svg
            viewBox="0 0 24 24"
            className="ic -mrxs -fsh0 mr-2"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d={category.pathData} fill="current"></path>
          </svg>
          <span className="text-xs">{category.name}</span>
        </Link>
      ))}
    </ul>
  );
};
