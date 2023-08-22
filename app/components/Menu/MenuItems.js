import React from "react";
import Link from "next/link";

export const MenuItems = () => {
  return (
    <div>
      <button className="py-3 px-4 min-h-[48px] border-t border-b-neutral-100 border-b-2 focus:bg-[#fcdbb9] flex items-center w-full">
        <svg aria-label="Menu" className="mr-2" width="24" height="24">
          <path d="M20 2a2 2 0 012 2v12a2 2 0 01-2 2H6l-4 4V4c0-1.1.9-2 2-2zm-1 2H5a1 1 0 00-1 1v13l2-2h13c.6 0 1-.5 1-1V5c0-.6-.5-1-1-1zM7.6 8.6a1.4 1.4 0 110 2.8 1.4 1.4 0 010-2.8zm4.4 0a1.4 1.4 0 110 2.8 1.4 1.4 0 010-2.8zm4.4 0a1.4 1.4 0 110 2.8 1.4 1.4 0 010-2.8z"></path>
        </svg>
        Chat en direct
      </button>
      <Link href="" className="flex items-center justify-between px-4 py-2">
        <span className="text-xs font-bold uppercase text-custom-orange">
          Votre Compte Jumia
        </span>
        <svg aria-label="Menu" className="" width="24" height="24">
          <path d="M9 15.84 12.84 12 9 8.18 10.18 7l5 5-5 5z"></path>{" "}
        </svg>
      </Link>
      <>
        <Link
          href=""
          className="py-3 px-4 min-h-[48px]  focus:bg-[#fcdbb9] flex items-center w-full"
        >
          <svg aria-label="Menu" className="mr-2" width="24" height="24">
            <path d="M21 8.34V8.2c0-.02 0-.05-.03-.08 0-.03 0-.06-.02-.09 0-.02-.03-.05-.06-.08l-.02-.06-2.33-3.96A1.8 1.8 0 0 0 16.98 3H7.02a1.8 1.8 0 0 0-1.56.93L3.13 7.89l-.02.06c-.03.03-.03.06-.06.08l-.02.09c0 .03-.03.06-.03.08v10.55C3 19.99 3.95 21 5.12 21h13.76c1.17 0 2.12-1.01 2.12-2.25V8.35zm-3.81-3.51 1.59 2.67h-5.99V4.69h4.19c.08 0 .16.05.2.14zm-10.38 0c.05-.09.13-.14.21-.14h4.19V7.5H5.22l1.6-2.67zm7.04 14.48h-3.7v-1.4h3.7v1.4zm5.56-.56c0 .31-.24.56-.53.56h-3.44v-2.25c0-.48-.34-.84-.8-.84H9.36c-.45 0-.8.36-.8.84v2.25H5.13c-.3 0-.53-.25-.53-.56V9.19H19.4v9.56z"></path>
          </svg>
          Vos commandes
        </Link>
        <Link
          href=""
          className="py-3 px-4 min-h-[48px] focus:bg-[#fcdbb9]   flex items-center w-full"
        >
          <svg aria-label="Menu" className="mr-2" width="24" height="24">
            <path d="m10.65 13.8 1.8-1.8h4.95v1.8h-6.75zm8.47 2.26V4.88H4.88V17l.51-.4.52-.54h13.22zM19.2 3c.99 0 1.8.8 1.8 1.8v10.8c0 1.4-1 2.4-1.8 2.4H6.6L3 21V4.8C3 3.81 3.82 3 4.8 3h14.4zM8.31 13.68H6.97l-.02-1.54 3.9-3.91.69-.68.44-.44a.71.71 0 0 1 1 0l.41.41a.7.7 0 0 1 0 1l-.4.4-.03.05-4.65 4.7z"></path>
          </svg>
          Vos avis en attente
        </Link>
        <Link
          href=""
          className="py-3 px-4 min-h-[48px] focus:bg-[#fcdbb9]  flex items-center w-full"
        >
          <svg aria-label="Menu" className="mr-2" width="24" height="24">
            <path d="M21 10.25c-.99 0-1.8.79-1.8 1.75s.81 1.75 1.8 1.75v3.5c0 .96-.81 1.75-1.8 1.75H4.8c-.99 0-1.8-.79-1.8-1.75v-3.5c1 0 1.8-.79 1.8-1.75S4 10.25 3 10.25v-3.5C3 5.79 3.82 5 4.8 5h14.4c.99 0 1.8.79 1.8 1.75v3.5zm-1.78-1.28V6.73H4.7l.01 2.24A3.57 3.57 0 0 1 6.6 12c0 1.29-.8 2.4-1.87 3v2.23h14.52V15a3.5 3.5 0 0 1-1.85-3c0-1.29.75-2.42 1.82-3.03zm-4.33 2.13c.22.04.29.29.16.45l-1.3 1.26c-.03.03-.03.09-.03.14l.3 1.76a.25.25 0 0 1-.35.27l-1.62-.86a.2.2 0 0 0-.14 0l-1.58.84c-.18.09-.4-.07-.36-.27l.3-1.8a.14.14 0 0 0-.03-.13L8.96 11.5c-.15-.14-.06-.39.14-.43l1.8-.26c.03-.02.08-.04.1-.1l.78-1.6c.1-.17.36-.17.45 0l.8 1.64c.01.06.05.1.1.1l1.76.24z"></path>{" "}
          </svg>
          Bon d&apos;achat
        </Link>
        <Link
          href=""
          className="py-3 px-4 min-h-[48px] focus:bg-[#fcdbb9]  flex items-center w-full"
        >
          <svg aria-label="Menu" className="mr-2" width="24" height="24">
            <path d="M16.5 3c-1.74 0-3.41.8-4.5 2.05A6.04 6.04 0 0 0 7.5 3 5.4 5.4 0 0 0 2 8.4c0 3.7 3.4 6.72 8.55 11.31L12 21l1.45-1.3C18.6 15.13 22 12.1 22 8.4A5.4 5.4 0 0 0 16.5 3zm-4.4 15.25l-.1.1-.1-.1C7.14 14.03 4 11.23 4 8.4c0-1.97 1.5-3.44 3.5-3.44a3.9 3.9 0 0 1 3.57 2.32h1.87a3.89 3.89 0 0 1 3.56-2.32c2 0 3.5 1.47 3.5 3.44 0 2.83-3.14 5.63-7.9 9.85z"></path>{" "}
          </svg>
          Vos listes d&apos;envies
        </Link>
      </>
    </div>
  );
};
