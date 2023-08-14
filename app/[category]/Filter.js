import React, { useState, useEffect } from "react";
import { BrandFilter } from "../components/Filter/BrandFilter";
import { RatingFilter } from "../components/Filter/RatingFilter";
import { PriceFilter } from "../components/Filter/PriceFilter";

export const Filter = ({ setFilter, filter, brands, minPrice, maxPrice }) => {
  const handlePriceChange = (value) => {
    const newFilter = { ...filter, minPrice: value[0], maxPrice: value[1] };
    setFilter(newFilter);
  };

  const handleBrandChange = (selectedBrands) => {
    console.log(selectedBrands);

    const newFilter = { ...filter, selectedBrands };
    setFilter(newFilter);
  };

  const handleRatingChange = (rating) => {
    const newFilter = { ...filter, rating };
    setFilter(newFilter);
  };

  // Update the parent filter when local filter changes
  useEffect(() => {
    setFilter(filter);
  }, [filter, setFilter]);

  return (
    <div className="w-full h-full bg-white rounded-md">
      <BrandFilter
        handleBrandChange={handleBrandChange}
        selectedBrands={filter.selectedBrands}
        brands={brands}
      />
      <PriceFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        handlePriceChange={handlePriceChange}
      />
      <RatingFilter handleRatingChange={handleRatingChange} />
    </div>
  );
};
