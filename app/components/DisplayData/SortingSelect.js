import React, { useState } from "react";

const SortingSelect = ({ selectedValue, onSelect }) => {
  const sorts = ["Les mieux notés", "Prix croissant", "Prix décroissant"];
  const [isOpen, setIsOpen] = useState(false);

  selectedValue = selectedValue || sorts[0];

  const handleToggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleSortChange = (selectedSort) => {
    onSelect(selectedSort);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <div
        className={`cursor-pointer flex px-2 rounded  hover:text-custom-orange  items-center h-8 ${
          isOpen ? "bg-gray-300" : ""
        }`}
        onClick={handleToggleOptions}
      >
        Trier par : {selectedValue}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="18"
          height="18"
          className="ml-2 transition-transform transform duration-300"
          style={isOpen ? { transform: "rotate(180deg)" } : {}}
        >
          <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
        </svg>
      </div>
      {isOpen && (
        <div className="mt-2 m-0 bg-white drop-shadow-lg rounded">
          <div className="space-y-1">
            {sorts.map((sort) => (
              <div
                key={sort}
                className="cursor-pointer hover:bg-gray-200 p-1"
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
