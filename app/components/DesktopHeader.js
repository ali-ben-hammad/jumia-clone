"use client";
import React, { useState } from "react";
import { Dropdown1 } from "./Dropdown1";
import { Dropdown2 } from "./Dropdown2";
import Link from "next/link";
import categoriesData from "public/categoriesData.json";
import { usePathname } from "next/navigation";

export const DesktopHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();
  return (
    <div className="text-sm bg-slate-100 text-custom-gray">
      <div className="container mx-auto py-4 max-h-24 max-w-[1184px] font-medium  text-base  items-center flex  flex-initial justify-between">
        {pathname !== "/" && (
          <div className="relative z-20 flex-shrink-0 p-2 cursor-pointer group drop-shadow-md">
            <svg aria-label="Menu" className="ic -db" width="24" height="24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
            </svg>
            <div className="absolute z-20 hidden w-64 transition-all duration-300 bg-white rounded cursor-default top-10 group-hover:block group-hover:pointer-events-auto">
              {categoriesData.map((category) => (
                <Link
                  href={"/" + decodeURIComponent(category.name)}
                  className="py-2 px-3 min-h-[30px]  hover:text-custom-orange  focus:bg-[#fcdbb9] flex items-center w-full"
                >
                  <svg
                    aria-label="Menu"
                    className="mr-2"
                    width="24"
                    height="24"
                    fill="currentColor"
                  >
                    <path d={category.pathData}></path>
                  </svg>
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
        <Link href="/" className="px-2 sm:min-w-[18.75%] cursor-pointer">
          <svg role="img" viewBox="0 0 172 30" width="134" height="30">
            <path
              fill="#282828"
              d="M43.73 19.5c0 1.81-1.72 2.69-5.24 2.69h-6.9c-3.6 0-5.34-.88-5.34-2.7V0H20.4v19.8a8.75 8.75 0 0 0 .56 3.27 6.8 6.8 0 0 0 1.54 2.29c.6.62 1.33 1.12 2.13 1.46a15.17 15.17 0 0 0 5.1 1.1h8.1c4.03 0 7-.67 8.87-2a7.12 7.12 0 0 0 2.86-6.15V0h-5.83v19.5ZM89.86 0a3.43 3.43 0 0 0-3.07 1.54l-13.12 19.2-13.49-19.2A3.63 3.63 0 0 0 57.11 0a2.95 2.95 0 0 0-2.9 2.04c-.15.42-.22.87-.2 1.31v24.87h5.84V11.07l10.48 15.55a3.84 3.84 0 0 0 3.32 1.86c.63 0 1.24-.17 1.79-.48.62-.32 1.15-.8 1.54-1.38L87.3 11.24v16.98h5.83V3.62a3.74 3.74 0 0 0-.88-2.6A2.97 2.97 0 0 0 89.86 0Zm13.34 0h-5.82v28.02h5.83V0Zm25.38 1.98a3.55 3.55 0 0 0-6.38 0l-15.62 26.14h6.87l4.15-7.4h15.38l4.24 7.4h6.58L128.58 1.98Zm.98 12.97h-8.6l4.25-7.12 4.35 7.12ZM10.55 5.47l-.1 10.03c.16 5.07-1.53 6.37-2.92 6.9a27.17 27.17 0 0 1-7.2 1.23H0v6.35h.42c2.38-.17 4.74-.55 7.05-1.15 6.02-1.3 8.7-5.43 8.7-13.36L16.36 0h-5.8l-.02 5.47Z"
            ></path>
            <path
              fill="#F90"
              d="M157.72.52a13.71 13.71 0 1 0 0 27.43 13.71 13.71 0 0 0 0-27.43Zm6.26 22.24-6.26-3.28-6.26 3.28 1.2-6.97-5.04-4.92 7-1.01 3.07-6.35 3.07 6.35 7 1.01-5.04 4.92 1.26 6.97Z"
            ></path>
          </svg>
        </Link>
        <form className="flex w-full h-full max-w-full px-2 flex-grow-1">
          <div className="flex items-center w-full border border-gray-400 rounded">
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="flex-shrink-0 mx-2"
            >
              <path d="M20.773 18.51l-4.322-4.464c-.31-.32-.697-.449-.865-.285-.168.163-.556.035-.866-.286l-.061-.064A6.488 6.488 0 0 0 4.9 4.901a6.491 6.491 0 0 0 8.641 9.661l.027.029c.31.32.425.711.256.874-.168.163-.054.555.256.875l4.32 4.466c.31.32.82.33 1.141.02l1.213-1.174c.32-.31.328-.82.018-1.141zm-8.117-5.855a4.48 4.48 0 0 1-6.328 0 4.48 4.48 0 0 1 0-6.328 4.479 4.479 0 0 1 6.327 0 4.48 4.48 0 0 1 0 6.328z"></path>
            </svg>

            <input
              type="text"
              placeholder="Cherchez un produit, une marque ou une catégorie"
              className="w-full outline-none bg-inherit flex-grow-1"
              name=""
              id=""
            />
          </div>
          <div className="ml-2 py-3 px-4 cursor-pointer text-white text-sm leading-4 hover:bg-custom-hover-orange shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] felx items-center justify text-center uppercase bg-custom-orange rounded">
            Rechercher
          </div>
        </form>
        <div className="flex">
          <Dropdown1 />
          <Dropdown2 />
          <div className="relative flex items-center justify-center p-2 rounded cursor-pointer hover:text-custom-hover-orange">
            <svg
              viewBox="0 0 24 24"
              className="flex-shrink-0 mr-2"
              width="24"
              height="24"
              fill="currentColor"
            >
              <path d="M15.55 13a2 2 0 0 0 1.75-1.03l3.58-6.49A1 1 0 0 0 20.01 4H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44A2 2 0 0 0 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18a2 2 0 1 0 .01 4A2 2 0 0 0 7 18zm10 0a2 2 0 1 0 .01 4 2 2 0 0 0-.01-4z"></path>{" "}
            </svg>
            <span className="whitespace-nowrap">Panier</span>
          </div>
        </div>
      </div>
    </div>
  );
};
