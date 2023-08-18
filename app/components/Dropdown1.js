import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export const Dropdown1 = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    console.log("user", user);
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [user]);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };
  const handleLogout = () => {
    setLoggedIn(false);
    logout();
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
        {!loggedIn ? (
          <path d="M4.2 19.89c.44-2.7 2.88-5.55 5.88-5.55h3.84c3 0 5.44 2.84 5.88 5.55H4.2zM12 4.1a4.06 4.06 0 110 8.12 4.06 4.06 0 010-8.12zm7.52 10.68a8.45 8.45 0 00-3.27-2.16A6.18 6.18 0 0012 2a6.17 6.17 0 00-4.25 10.63A8.91 8.91 0 002 20.94V22h20v-1.06c0-2.28-.88-4.46-2.48-6.15z"></path>
        ) : (
          <path d="M18 13.01a5 5 0 110 10 5 5 0 010-10zM12.02 1a6.15 6.15 0 014.18 10.65c-1.2.24-2.28.83-3.14 1.64h-2.97c-1.3 0-2.7.6-3.82 1.63a6.99 6.99 0 00-2.2 4.12h7.04c.12.7.34 1.38.66 1.99H2v-1a8.92 8.92 0 015.87-8.35A6.16 6.16 0 0112 1zm8.73 14.8a.6.6 0 00-.42.18l-3.2 3.2-1.42-1.46a.6.6 0 00-.43-.18.6.6 0 00-.43 1l1.84 1.9a.6.6 0 00.85.01l3.63-3.63a.6.6 0 000-.84.59.59 0 00-.42-.18zM12.01 2.98a4.17 4.17 0 10.01 8.34 4.17 4.17 0 000-8.34z"></path>
        )}
      </svg>
      {!loggedIn ? (
        <div className="whitespace-nowrap">Se connecter</div>
      ) : (
        <span className="whitespace-nowrap">
          Bonjour,{" "}
          {
            // if the name is too long , show only the first 8 characters
            user.displayName && user.displayName.length > 8
              ? user.displayName.substring(0, 8) + "..."
              : user.displayName
          }
        </span>
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="18"
        height="18"
        className="ml-2"
        style={isDropdownOpen ? { transform: "rotate(180deg)" } : {}}
      >
        <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
      </svg>

      {isDropdownOpen && (
        <div className="absolute rounded shadow-[0_0_10px_0_rgba(0,0,0,0.15)] z-99 top-full text-sm bg-white font-normal w-full min-w-[206px]">
          {!loggedIn && (
            <div className="flex items-center justify-center p-4 border-b ">
              <Link
                href="/Auth"
                className="py-3 px-4 w-full text-sm cursor-pointer whitespace-nowrap text-white leading-4 hover:bg-custom-hover-orange shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] felx items-center justify text-center uppercase bg-custom-orange rounded"
              >
                Se connecter
              </Link>
            </div>
          )}
          <a className="flex items-center p-2 hover:bg-[#f1f1f2] py-2">
            <svg
              viewBox="0 0 24 24"
              className="flex-shrink-0 mr-4 fill-custom-gray"
              width="24"
              height="24"
            >
              <path d="M4.2 19.89c.44-2.7 2.88-5.55 5.88-5.55h3.84c3 0 5.44 2.84 5.88 5.55H4.2zM12 4.1a4.06 4.06 0 110 8.12 4.06 4.06 0 010-8.12zm7.52 10.68a8.45 8.45 0 00-3.27-2.16A6.18 6.18 0 0012 2a6.17 6.17 0 00-4.25 10.63A8.91 8.91 0 002 20.94V22h20v-1.06c0-2.28-.88-4.46-2.48-6.15z"></path>
            </svg>
            Votre compte
          </a>
          <a className="flex items-center p-2 hover:bg-[#f1f1f2]  py-2">
            <svg
              viewBox="0 0 24 24"
              className="flex-shrink-0 mr-4 fill-custom-gray"
              width="24"
              height="24"
            >
              <path d="M21 8.34V8.2c0-.02 0-.05-.03-.08 0-.03 0-.06-.02-.09 0-.02-.03-.05-.06-.08l-.02-.06-2.33-3.96A1.8 1.8 0 0 0 16.98 3H7.02a1.8 1.8 0 0 0-1.56.93L3.13 7.89l-.02.06c-.03.03-.03.06-.06.08l-.02.09c0 .03-.03.06-.03.08v10.55C3 19.99 3.95 21 5.12 21h13.76c1.17 0 2.12-1.01 2.12-2.25V8.35zm-3.81-3.51 1.59 2.67h-5.99V4.69h4.19c.08 0 .16.05.2.14zm-10.38 0c.05-.09.13-.14.21-.14h4.19V7.5H5.22l1.6-2.67zm7.04 14.48h-3.7v-1.4h3.7v1.4zm5.56-.56c0 .31-.24.56-.53.56h-3.44v-2.25c0-.48-.34-.84-.8-.84H9.36c-.45 0-.8.36-.8.84v2.25H5.13c-.3 0-.53-.25-.53-.56V9.19H19.4v9.56z"></path>{" "}
            </svg>
            Vos commandes
          </a>
          <a className="flex items-center p-2 hover:bg-[#f1f1f2]  py-2">
            <svg
              viewBox="0 0 24 24"
              className="flex-shrink-0 mr-4 fill-custom-gray"
              width="24"
              height="24"
            >
              <path d="M16.05 4A5.462 5.462 0 0 0 12 5.822 5.462 5.462 0 0 0 7.95 4C5.178 4 3 6.11 3 8.796c0 3.296 3.06 5.981 7.695 10.062L12 20l1.305-1.151C17.94 14.777 21 12.092 21 8.796 21 6.11 18.822 4 16.05 4zm-3.96 13.559l-.09.087-.09-.087C7.626 13.8 4.8 11.316 4.8 8.796c0-1.744 1.35-3.052 3.15-3.052 1.386 0 2.736.863 3.213 2.058h1.683c.468-1.195 1.818-2.058 3.204-2.058 1.8 0 3.15 1.308 3.15 3.052 0 2.52-2.826 5.005-7.11 8.763z"></path>{" "}
            </svg>
            Votre liste d'envies
          </a>
          {loggedIn && (
            <div className="flex items-center justify-center px-6 py-2 border-t cursor-default ">
              <button
                className="p-2 text-center uppercase rounded-lg text-custom-orange hover:bg-orange-100"
                onClick={handleLogout}
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
