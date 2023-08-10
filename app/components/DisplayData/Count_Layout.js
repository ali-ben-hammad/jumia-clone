import React from "react";

export const Count_Layout = ({ count, setDisplay }) => {
  return (
    <div className="w-full p-2 border-custom-gray border-b flex  text-gray-500">
      <div className="text-sm">{count} résultats</div>
      <div className="ml-auto mr-2 flex gap-4">
        <svg
          aria-label="Liste"
          viewBox="0 0 24 24"
          className="hover:text-custom-orange cursor-pointer"
          width="24"
          height="24"
          fill="currentColor"
          onClick={() => setDisplay(1)}
        >
          <path d="M10 13a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h5zm9 3a1 1 0 0 1 0 2h-5a1 1 0 0 1 0-2h5zm0-3a1 1 0 0 1 0 2h-5a1 1 0 0 1 0-2h5zm-9-9a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5zm9 3a1 1 0 0 1 0 2h-5a1 1 0 0 1 0-2h5zm0-3a1 1 0 0 1 0 2h-5a1 1 0 0 1 0-2h5z"></path>
        </svg>
        <svg
          aria-label="Liste"
          viewBox="0 0 24 24"
          className="hover:text-custom-orange cursor-pointer"
          width="24"
          height="24"
          fill="currentColor"
          onClick={() => setDisplay(2)}
        >
          <path d="M10 13a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1v-5a1 1 0 011-1h5zm9 0a1 1 0 011 1v5a1 1 0 01-1 1h-5a1 1 0 01-1-1v-5a1 1 0 011-1h5zm-9-9a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1h5zm9 0a1 1 0 011 1v5a1 1 0 01-1 1h-5a1 1 0 01-1-1V5a1 1 0 011-1h5z"></path>
        </svg>
      </div>
    </div>
  );
};
