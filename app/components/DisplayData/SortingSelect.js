import React, { useState, useEffect, useRef } from "react";

const SortingSelect = ({ selectedValue, onSelect }) => {
  const sorts = ["Les mieux notés", "Prix croissant", "Prix décroissant"];
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Add a mousedown event listener on the document
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.classList.contains("sorting-option")
      ) {
        setIsOpen(false); // Close the dropdown when clicking outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleSortChange = (sort) => {
    console.log(sort);
    onSelect(sort);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div
        className={`cursor-pointer flex px-2 rounded  hover:text-custom-orange  items-center h-8 ${
          isOpen ? "bg-gray-300" : ""
        }`}
        onClick={handleToggleOptions}
        ref={dropdownRef}
      >
        Trier par : {selectedValue}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="18"
          height="18"
          className="ml-2 transition-transform duration-300 transform"
          style={isOpen ? { transform: "rotate(180deg)" } : {}}
        >
          <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
        </svg>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full m-0 mt-2 bg-white rounded drop-shadow-lg t-0">
          <div className="space-y-1">
            {sorts.map((sort) => (
              <div
                key={sort}
                className="p-1 cursor-pointer hover:bg-gray-200 sorting-option"
                onClick={() => handleSortChange(sort)}
              >
                {sort}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortingSelect;
