import React, { useState, useEffect } from "react";
import SortingSelect from "../components/DisplayData/SortingSelect";
import { Count_Layout } from "../components/DisplayData/Count_Layout";
import { List } from "../components/DisplayData/List";

export const Data = ({ products, filter, category }) => {
  const [display, setDisplay] = useState(2);
  const [sort, setSort] = useState("");
  sort === "" ? setSort("Les mieux notés") : null;
  const [sortedProducts, setSortedProducts] = useState([]);

  // Update the sorted products whenever the sorting criteria or filter changes
  useEffect(() => {
    let sorted = [...products];
    console.log(sort);

    switch (sort) {
      case "Les mieux notés":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "Prix croissant":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "Prix décroissant":
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    // Apply the brand and filter criteria
    sorted = sorted.filter((product) => {
      const brandFilter =
        filter.selectedBrands.length === 0 ||
        filter.selectedBrands.includes(product.brand);
      return (
        brandFilter &&
        product.rating >= filter.rating &&
        product.price >= filter.minPrice &&
        product.price <= filter.maxPrice
      );
    });

    setSortedProducts(sorted);
  }, [products, filter, sort]);

  const handleSort = (s) => {
    setSort(s);
  };

  return (
    <div className="w-full h-full col-span-3 bg-white rounded-md text-custom-gray">
      <div className="flex w-full p-2 border-b border-custom-gray">
        <span className="text-lg">{category}</span>
        <div className="ml-auto ">
          <SortingSelect selectedValue={sort} onSelect={handleSort} />
        </div>
      </div>
      <Count_Layout count={sortedProducts.length} setDisplay={setDisplay} />
      <List display={display} products={sortedProducts} />
    </div>
  );
};
