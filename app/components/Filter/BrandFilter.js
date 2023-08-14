import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { FormGroup } from "@mui/material";

export const BrandFilter = ({ handleBrandChange, selectedBrands, brands }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBrands = brands.filter((brand) =>
    brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleBrandChecked = (event) => {
    const brand = event.target.name;
    const newSelectedBrands = event.target.checked
      ? [...selectedBrands, brand]
      : selectedBrands.filter((selectedBrand) => selectedBrand !== brand);
    handleBrandChange(newSelectedBrands);
  };

  return (
    <div className="p-4 border border-b border-gray-200">
      <div className="uppercase">Marque</div>
      {/* Search bar */}

      <button className="flex items-center w-full px-2 py-1 mt-2 border border-gray-400 border-solid rounded-full">
        <svg className="mr-1" fill="currentColor" width="24" height="24">
          <path d="m20.7735 18.5109-4.3221-4.465c-.31-.3204-.6973-.4487-.8651-.2849-.1684.1626-.556.0347-.866-.2857l-.0618-.064c1.9344-2.5442 1.7467-6.187-.5763-8.5099-2.5352-2.5352-6.6458-2.5352-9.1808 0-2.5352 2.5353-2.5352 6.6453 0 9.1806 2.3625 2.3628 6.0913 2.521 8.6407.4803l.0271.0283c.3094.3204.4246.7118.2557.8746-.1681.163-.0538.5546.2565.8744l4.3197 4.4668c.31.3195.8206.329 1.1413.0188l1.2123-1.173c.3195-.3095.3281-.8198.0188-1.1413zm-8.1179-5.8556c-1.7446 1.7449-4.5837 1.7449-6.328.0006-1.7447-1.7447-1.7445-4.5841 0-6.3284 1.7443-1.7447 4.5834-1.7444 6.3275.0002 1.7449 1.7444 1.7449 4.5832.0005 6.3276z"></path>
        </svg>
        <input
          className="text-[#75757a] text-sm outline-none w-full "
          type="text"
          placeholder="Rechercher une marque"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </button>
      {/* List of checkboxes */}

      {filteredBrands.map((brand) => (
        <div key={brand} className="h-8 text-sm">
          <Checkbox
            onChange={(event) => handleBrandChecked(event)}
            checked={selectedBrands.includes(brand)} // Check if the brand is selected
            inputProps={{ "aria-label": "controlled" }}
            sx={{
              color: "gray",
              "&.Mui-checked": {
                color: "orange",
              },
            }}
            name={brand}
          />
          {brand}
        </div>
      ))}
    </div>
  );
};
