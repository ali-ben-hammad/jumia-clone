import React from "react";

export const Filter = ({ setFilter }) => {
  const handleMinPriceChange = (event) => {
    const newFilter = { ...filter, minPrice: event.target.value };
    setFilter(newFilter);
  };

  const handleMaxPriceChange = (event) => {
    const newFilter = { ...filter, maxPrice: event.target.value };
    setFilter(newFilter);
  };

  const handleBrandChange = (event) => {
    const selectedBrands = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    const newFilter = { ...filter, selectedBrands };
    setFilter(newFilter);
  };
  return <div className="w-full h-full bg-white rounded-md">Filter</div>;
};
