import React from "react";
import { useState } from "react";

export const Dropdown1 = () => {
  
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };
  return (
    <div>
      <div
        className={`${isDropdownOpen ? "open" : ""}`}
        onClick={handleDropdownToggle}
      >
        {/* Arrow Down SVG for closed state */}
        {!isDropdownOpen && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="24"
            height="24"
          >
            <path d="M12 15.5l6-6-1.42-1.42L12 12.66 7.42 7.08 6 8.5l6 6z" />
          </svg>
        )}

        {/* Arrow Up SVG for open state */}
        {isDropdownOpen && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="24"
            height="24"
          >
            <path d="M12 8.5l6 6-1.42 1.42L12 11.34l-4.58 4.58L6 14.5l6-6z" />
          </svg>
        )}
      </div>

      {/* Dropdown content */}
      {isDropdownOpen && (
        <div className="dropdown-content">{/* Dropdown options go here */}</div>
      )}
    </div>
  );
};
