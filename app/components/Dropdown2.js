import React, { useState, useEffect, useRef } from "react";

export const Dropdown2 = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  useEffect(() => {
    // Add a mousedown event listener on the document
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close the dropdown when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`p-2 flex relative items-center justify-center rounded cursor-pointer z-10 ${
        !isDropdownOpen
          ? "hover:text-custom-hover-orange"
          : "bg-custom-hover-gray"
      } `}
      onClick={() => handleDropdownToggle()}
    >
      <svg
        viewBox="0 0 24 24"
        className="flex-shrink-0 mr-2"
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
        width="18"
        height="18"
        className="ml-3"
        style={isDropdownOpen ? { transform: "rotate(180deg)" } : {}}
      >
        <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
      </svg>

      {isDropdownOpen && (
        <div className="absolute rounded shadow-[0_0_10px_0_rgba(0,0,0,0.15)] z-99 top-full bg-white font-normal text-sm w-full min-w-[206px]">
          <a className="flex items-center px-4 hover:bg-[#f1f1f2] py-3">
            Centre d&apos;assistance
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

          <div className="flex items-center justify-center p-4 border-t ">
            <div className="py-2 px-4 flex w-full text-sm cursor-pointer uppercase whitespace-nowrap text-white leading-4 hover:bg-custom-hover-orange shadow-[0_4px_8px_0_rgba(0,0,0,0.3)] felx items-center justify text-center bg-custom-orange rounded">
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                width="24"
                height="24"
                className="flex-shrink-0 "
              >
                <path d="M20 2a2 2 0 012 2v12a2 2 0 01-2 2H6l-4 4V4c0-1.1.9-2 2-2zm-1 2H5a1 1 0 00-1 1v13l2-2h13c.6 0 1-.5 1-1V5c0-.6-.5-1-1-1zM7.6 8.6a1.4 1.4 0 110 2.8 1.4 1.4 0 010-2.8zm4.4 0a1.4 1.4 0 110 2.8 1.4 1.4 0 010-2.8zm4.4 0a1.4 1.4 0 110 2.8 1.4 1.4 0 010-2.8z"></path>{" "}
              </svg>
              <span className="pr-6 mx-auto font-medium leading-4 text-center whitespace-normal">
                Chat en direct
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
