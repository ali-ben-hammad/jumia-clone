"use client";
import React from "react";
import { Dropdown1 } from "./Dropdown1";
import { Dropdown2 } from "./Dropdown2";

export const Header = () => {
  return (
    <div className="bg-slate-100 text-custom-gray text-sm">
      <div className="container mx-auto py-4 max-h-24  h-[72px] items-center flex  flex-initial justify-between">
        <div className="px-2">
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
        </div>
        <form className="flex flex-grow-1 w-full  h-full max-w-full px-2">
          <div className="flex items-center rounded  border w-full border-gray-600">
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="mx-2 flex-shrink-0"
            >
              <path d="M20.773 18.51l-4.322-4.464c-.31-.32-.697-.449-.865-.285-.168.163-.556.035-.866-.286l-.061-.064A6.488 6.488 0 0 0 4.9 4.901a6.491 6.491 0 0 0 8.641 9.661l.027.029c.31.32.425.711.256.874-.168.163-.054.555.256.875l4.32 4.466c.31.32.82.33 1.141.02l1.213-1.174c.32-.31.328-.82.018-1.141zm-8.117-5.855a4.48 4.48 0 0 1-6.328 0 4.48 4.48 0 0 1 0-6.328 4.479 4.479 0 0 1 6.327 0 4.48 4.48 0 0 1 0 6.328z"></path>
            </svg>

            <input
              type="text"
              placeholder="Cherchez un produit, une marque ou une catégorie"
              className="bg-inherit w-full flex-grow-1 outline-none"
              name=""
              id=""
            />
          </div>
          <div className="mx-2 py-3 px-4 ml-2 font-medium cursor-pointer text-white leading-4 hover:bg-custom-hover-orange shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] felx items-center justify text-center uppercase bg-custom-orange rounded">
            Rechercher
          </div>
        </form>
        <div className="flex">
          <Dropdown1 />
          <Dropdown2 />
        </div>
      </div>
    </div>
  );
};
