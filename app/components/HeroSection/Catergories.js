import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import categoriesData from "public/categoriesData.json";

export const Catergories = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-between h-full p-2 list-none">
      {categoriesData.map((category) => (
        <Link
          href={"/" + decodeURIComponent(category.name)}
          className="flex items-center h-8 pl-2 mg hover:text-custom-hover-orange"
          key={category.name}
        >
          <svg
            viewBox="0 0 24 24"
            className="mr-2 ic -mrxs -fsh0"
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
