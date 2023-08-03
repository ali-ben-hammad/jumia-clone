"use client";
import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import dayjs from "dayjs";
import { Days_One } from "next/font/google";

export const GenderAndBirthdayForm = ({ onSubmit }) => {
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState(dayjs());
  const [genderError, setGenderError] = useState(false);
  const [birthdayError, setBirthdayError] = useState(false);

  //log the birthday date not the birthday object
  console.log(dayjs(birthday).format("YYYY-MM-DD"));
  const handleSubmit = (event) => {
    gender == "" ? setGenderError(true) : setGenderError(false);
    birthday.isValid() ? setBirthdayError(false) : setBirthdayError(true);

    if (!birthday.isValid()) {
      alert("Please select a valid birthday.");
      return;
    }

    event.preventDefault();
    onSubmit({
      gender: gender,
      birthday: birthday.format("YYYY-MM-DD"),
    });
  };

  const handleSelectChange = (event) => {
    setGender(event.target.value);
  };
  const handleDateChange = (date) => {
    setBirthday(date);
  };
  return (
    <div className="py-2 px-6 flex flex-1">
      <form onSubmit={handleSubmit} action="" className="w-full">
        <div className="text-center w-full">
          <h2 className="font-bold text-black text-xl ">
            Données personnelles
          </h2>
          <p className="font-normal text-base mt-2 mb-4 text-custom-gray text-center">
            Il vous suffit de remplir les détails ci-dessous.
          </p>
        </div>
        <div className="pt-4">
          <div className="flex  mt-4">
            <FormControl className="w-full">
              <InputLabel id="demo-simple-select-label">Genre</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                autoWidth
                label="Genre"
                onChange={handleSelectChange}
                sx={{
                  outline: "none",
                  "&:focus": {
                    borderColor: genderError ? "red" : "initial",
                    borderWidth: genderError ? "2px" : "1px",
                    borderStyle: "solid",
                  },
                  width: "100%",
                  marginBottom: "20px",
                }}
              >
                <MenuItem key={1} value={"Male"}>
                  Male
                </MenuItem>
                <MenuItem key={2} value={"Female"}>
                  Female
                </MenuItem>
              </Select>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  defaultValue={
                    // set the default date to an empty string to avoid the error
                    dayjs()
                  }
                  onChange={() => handleDateChange(birthday)}
                  label="Date de naissance*"
                  minDate={dayjs("1900-01-01")}
                  maxDate={
                    // reduce the max date to 13 years ago
                    dayjs().subtract(13, "year")
                  }
                  sx={{
                    outline: "none",
                    "&:focus": {
                      borderColor: birthdayError ? "red" : "initial",
                      borderWidth: birthdayError ? "2px" : "1px",
                      borderStyle: "solid",
                    },
                  }}
                />
              </LocalizationProvider>
            </FormControl>
          </div>
          <button
            type="submit"
            className="mt-8 rounded bg-custom-orange drop-shadow-lg active:opacity-50 active:drop-shadow-xl hover:opacity-70 text-center text-base w-full text-white h-[48px] font-bold"
          >
            Continuer
          </button>
        </div>
      </form>
    </div>
  );
};
