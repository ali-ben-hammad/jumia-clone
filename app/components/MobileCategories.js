import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import categoriesData from "public/categoriesData.json";

export const MobileCategories = () => {
  return (
    <div>
      <div className="flex items-center justify-between px-4 py-2">
        <span className="text-xs font-bold uppercase text-custom-orange">
          Nos catégories
        </span>
      </div>
      {categoriesData.map((category) => (
        <Link
          key={category.name}
          href={"/" + decodeURIComponent(category.name)}
          className="py-3 px-4 min-h-[48px]  focus:bg-[#fcdbb9] flex items-center w-full"
        >
          <svg aria-label="Menu" className="mr-2" width="24" height="24">
            <path d={category.pathData}></path>
          </svg>
          {category.name}
        </Link>
      ))}
    </div>
  );
};
