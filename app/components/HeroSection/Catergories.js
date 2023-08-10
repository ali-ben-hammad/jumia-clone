import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import categoriesData from "public/categoriesData.json";

export const Catergories = () => {
  const router = useRouter();
  return (
    <div className="list-none flex flex-col h-full justify-between p-2">
      {categoriesData.map((category) => (
        <Link
          href={"/" + decodeURIComponent(category.name)}
          className="mg pl-2 h-8 flex items-center hover:text-custom-hover-orange"
          key={category.name}
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
    </div>
  );
};
