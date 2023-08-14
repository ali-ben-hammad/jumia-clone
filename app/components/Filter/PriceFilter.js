import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";

export const PriceFilter = ({ minPrice, maxPrice, handlePriceChange }) => {
  const [value, setValue] = useState([minPrice, maxPrice]);
  console.log(value);

  useEffect(() => {
    // Update the value state when minPrice or maxPrice changes
    setValue([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const handlePriceChangeLocal = (event, newValue) => {
    setValue(newValue);
  };

  const handleOKClick = () => {
    // Send back the selected price range when OK is clicked
    handlePriceChange(value);
  };

  return (
    <div className="p-4 border border-b border-gray-200">
      <div className="flex">
        <div className="uppercase">prix (dhs)</div>
        <button
          className="justify-end px-2 ml-auto rounded text-custom-orange hover:bg-orange-200"
          onClick={handleOKClick}
        >
          OK
        </button>
      </div>
      <Slider
        value={value}
        onChange={handlePriceChangeLocal}
        valueLabelDisplay="auto"
        min={minPrice}
        max={maxPrice}
        sx={{
          color: "orange",
        }}
      />
      <div className="flex mt-4">
        <input
          type="number"
          value={value[0]}
          onChange={(e) => setValue([Number(e.target.value), value[1]])}
          className="w-1/2 p-2 border border-gray-300 border-solid rounded"
        />
        <input
          type="number"
          value={value[1]}
          onChange={(e) => setValue([value[0], Number(e.target.value)])}
          className="w-1/2 p-2 ml-2 border border-gray-300 border-solid rounded"
        />
      </div>
    </div>
  );
};
