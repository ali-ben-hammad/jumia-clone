"use client";
import React, { useState } from "react";

import SortingSelect from "../components/DisplayData/SortingSelect";
import { Count_Layout } from "../components/DisplayData/Count_Layout";
import { List } from "../components/DisplayData/List";

export const Data = ({ products, filter, category }) => {
  const [selectedSort, setSelectedSort] = useState("");
  const [display, setDisplay] = useState(2);

  const handleSortSelect = (sort) => {
    setSelectedSort(sort);
    // Perform any sorting logic here based on the selected sort
  };
  // const sorts = ["Les mieux notés", "Prix croissant", "Prix décroissant"];

  return (
    <div className="w-full h-full bg-white rounded-md text-custom-gray col-span-3">
      <div className="w-full p-2 border-custom-gray border-b flex">
        <span className="text-lg">{category}</span>
        <div className="ml-auto ">
          <SortingSelect
            selectedValue={selectedSort}
            onSelect={handleSortSelect}
          />
        </div>
      </div>
      <Count_Layout count={products.length} setDisplay={setDisplay} />
      <List display={display} products={products} />
    </div>
  );
};
