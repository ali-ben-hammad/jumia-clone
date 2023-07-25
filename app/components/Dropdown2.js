import React from "react";
import { useState } from "react";

export const Dropdown2 = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div
      className={`p-2 flex relative items-center justify-center rounded cursor-pointer ${
        !isDropdownOpen
          ? "hover:text-custom-hover-orange"
          : "bg-custom-hover-gray"
      } `}
      onClick={() => handleDropdownToggle()}
    >
      <svg
        viewBox="0 0 24 24"
        className="mr-2 flex-shrink-0"
        width="24"
        height="24"
        fill="currentColor"
      >
        <path d="M11 18h2v-2h-2v2zm1-16a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm0-14a4 4 0 0 0-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.8-3 5h2c0-2.3 3-2.5 3-5a4 4 0 0 0-4-4z"></path>{" "}
      </svg>

      <span className="whitespace-nowrap">Aide</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="24"
        height="24"
        className="ml-3"
        style={isDropdownOpen ? { transform: "rotate(180deg)" } : {}}
      >
        <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
      </svg>

      {isDropdownOpen && (
        <div className="absolute rounded shadow-[0_0_10px_0_rgba(0,0,0,0.15)] top-full bg-white font-normal w-full min-w-[206px]">
          <a className="flex items-center px-4 hover:bg-[#f1f1f2] py-3">
            Centre d'assistance
          </a>
          <a className="flex items-center px-4 hover:bg-[#f1f1f2]  py-3">
            Passer et suivre ma commande
          </a>
          <a className="flex items-center px-4 hover:bg-[#f1f1f2]  py-3">
            Annuler ma commande
          </a>
          <a className="flex items-center px-4 hover:bg-[#f1f1f2]  py-3">
            Retour et Remboursement
          </a>
          <a className="flex items-center px-4 hover:bg-[#f1f1f2]  py-3">
            Paiement et compte Jumia
          </a>

          <div className="p-4 flex  items-center justify-center border-t ">
            <div className="py-3 px-4 w-full font-medium cursor-pointer uppercase whitespace-nowrap text-white leading-4 hover:bg-custom-hover-orange shadow-[0_4px_8px_0_rgba(0,0,0,0.3)] felx items-center justify text-center bg-custom-orange rounded">
              Chat en direct
            </div>
          </div>
        </div>
      )}
    </div>
   
  );
};
