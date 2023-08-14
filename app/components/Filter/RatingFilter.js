import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Rating from "@mui/material/Rating";

export const RatingFilter = ({ handleRatingChange }) => {
  const [selectedValue, setSelectedValue] = useState("all");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    handleRatingChange(
      event.target.value === "all" ? null : parseInt(event.target.value)
    );
  };

  const getRatingLabel = (ratingValue) => (
    <div className="flex items-center">
      <Rating name="rating" value={ratingValue} readOnly size="small" />
      <span className="ml-2 text-sm text-gray-600 ">et plus</span>
    </div>
  );

  return (
    <div className="p-4 border border-b border-gray-200">
      <div className="flex items-center">
        <div className="my-2 uppercase">évaluation clients</div>
        {
          // show a button to clear the filter
          selectedValue !== "all" && (
            <button
              className="justify-end h-10 px-2 ml-auto text-sm uppercase rounded text-custom-orange hover:bg-orange-200"
              onClick={
                // clear the filter when the button is clicked
                () => {
                  setSelectedValue("all");
                  handleRatingChange(null);
                }
              }
            >
              décocher
            </button>
          )
        }
      </div>
      <RadioGroup
        aria-label="rating"
        name="rating"
        value={selectedValue}
        onChange={handleChange}
      >
        <FormControlLabel
          value="4"
          control={
            <Radio
              size="small"
              sx={{
                color: "orange",
              }}
            />
          }
          label={getRatingLabel(4)}
        />
        <FormControlLabel
          value="3"
          control={
            <Radio
              size="small"
              sx={{
                color: "orange",
              }}
            />
          }
          label={getRatingLabel(3)}
        />
        <FormControlLabel
          value="2"
          control={
            <Radio
              size="small"
              sx={{
                color: "orange",
              }}
            />
          }
          label={getRatingLabel(2)}
        />
        <FormControlLabel
          value="1"
          control={
            <Radio
              size="small"
              sx={{
                color: "orange",
              }}
            />
          }
          label={getRatingLabel(1)}
        />
      </RadioGroup>
    </div>
  );
};
