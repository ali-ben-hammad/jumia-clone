"use client";
import React, { useEffect, useState } from "react";
import { Menu } from "./Menu/Menu";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export const MobileHeader = () => {
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

  return (
    <div className="relative z-10 ">
      {" "}
      <div className=" bg-slate-100 text-[#313133] z-50">
        <div className="flex items-center  min-h-[56px] text-custom-gray text-sm">
          <div className="flex items-center w-1/2 px-2">
            <Menu />
            <div className="p-1 mx-1">
              <svg role="img" viewBox="0 0 172 30" width="104" height="24">
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
          </div>
          <div className="flex justify-end w-1/2 px-2">
            <Link
              className="p-2 mx-2 flex-shrink-0 outline-none rounded-full inline-block focus:bg-[#fcdbb9]"
              href=""
            >
              <svg
                aria-label="Votre compte"
                className="ic"
                width="24"
                height="24"
              >
                {!loggedIn ? (
                  <path d="M4.2 19.89c.44-2.7 2.88-5.55 5.88-5.55h3.84c3 0 5.44 2.84 5.88 5.55H4.2zM12 4.1a4.06 4.06 0 110 8.12 4.06 4.06 0 010-8.12zm7.52 10.68a8.45 8.45 0 00-3.27-2.16A6.18 6.18 0 0012 2a6.17 6.17 0 00-4.25 10.63A8.91 8.91 0 002 20.94V22h20v-1.06c0-2.28-.88-4.46-2.48-6.15z"></path>
                ) : (
                  <path d="M18 13.01a5 5 0 110 10 5 5 0 010-10zM12.02 1a6.15 6.15 0 014.18 10.65c-1.2.24-2.28.83-3.14 1.64h-2.97c-1.3 0-2.7.6-3.82 1.63a6.99 6.99 0 00-2.2 4.12h7.04c.12.7.34 1.38.66 1.99H2v-1a8.92 8.92 0 015.87-8.35A6.16 6.16 0 0112 1zm8.73 14.8a.6.6 0 00-.42.18l-3.2 3.2-1.42-1.46a.6.6 0 00-.43-.18.6.6 0 00-.43 1l1.84 1.9a.6.6 0 00.85.01l3.63-3.63a.6.6 0 000-.84.59.59 0 00-.42-.18zM12.01 2.98a4.17 4.17 0 10.01 8.34 4.17 4.17 0 000-8.34z"></path>
                )}
              </svg>
            </Link>
            <Link
              className="p-2 mx-2 flex-shrink-0 outline-none rounded-full inline-block focus:bg-[#fcdbb9]"
              href=""
            >
              <svg aria-label="Votre compte" width="24" height="24">
                <path d="M15.6 13a2 2 0 0 0 1.7-1l3.6-6.5A1 1 0 0 0 20 4H5.2l-1-2H1v2h2l3.6 7.6L5.2 14A2 2 0 0 0 7 17h12v-2H7l1.1-2h7.5zM6.2 6h12.1l-2.7 5h-7L6.1 6zM7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path>{" "}
              </svg>
            </Link>
          </div>
        </div>
        <div className="px-2 pb-2">
          <button className="flex items-center w-full px-2 py-1 border border-gray-400 border-solid rounded-full">
            <svg className="mr-1" fill="currentColor" width="24" height="24">
              <path d="m20.7735 18.5109-4.3221-4.465c-.31-.3204-.6973-.4487-.8651-.2849-.1684.1626-.556.0347-.866-.2857l-.0618-.064c1.9344-2.5442 1.7467-6.187-.5763-8.5099-2.5352-2.5352-6.6458-2.5352-9.1808 0-2.5352 2.5353-2.5352 6.6453 0 9.1806 2.3625 2.3628 6.0913 2.521 8.6407.4803l.0271.0283c.3094.3204.4246.7118.2557.8746-.1681.163-.0538.5546.2565.8744l4.3197 4.4668c.31.3195.8206.329 1.1413.0188l1.2123-1.173c.3195-.3095.3281-.8198.0188-1.1413zm-8.1179-5.8556c-1.7446 1.7449-4.5837 1.7449-6.328.0006-1.7447-1.7447-1.7445-4.5841 0-6.3284 1.7443-1.7447 4.5834-1.7444 6.3275.0002 1.7449 1.7444 1.7449 4.5832.0005 6.3276z"></path>
            </svg>
            <span className="text-[#75757a] text-sm">Cherchez sur Jumia</span>
          </button>
        </div>
      </div>
    </div>
  );
};
