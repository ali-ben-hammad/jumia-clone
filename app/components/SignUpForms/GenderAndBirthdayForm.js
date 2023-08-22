"use client";
import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { FormControlLabel } from "@mui/material";
import Select from "@mui/material/Select";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import dayjs from "dayjs";

export const GenderAndBirthdayForm = ({ onSubmit }) => {
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [genderError, setGenderError] = useState(false);
  const [birthdayError, setBirthdayError] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //log the birthday date not the birthday object
  const handleSubmit = (event) => {
    event.preventDefault();
    setGenderError(!gender);
    setBirthdayError(!birthday);

    if (birthday && gender) {
      setIsLoading(true);
      const formattedBirthday = dayjs(birthday).format("YYYY-MM-DD");

      onSubmit({
        gender,
        birthday: formattedBirthday,
      });
    }
  };

  const handleOpenDatePicker = () => {
    setBirthday(dayjs().year(2000)); // Set the default year to 2000 (or any desired year)
  };
  const handleSelectChange = (event) => {
    setGender(event.target.value);
  };
  const handleDateChange = (date) => {
    setBirthday(date);
  };
  return (
    <>
      <div
        className={`h-[2px] w-full overflow-hidden ${
          isLoading ? "" : "hidden"
        }`}
      >
        <div className="tape"></div>
      </div>
      <div className="flex flex-1 px-6 py-2">
        <form onSubmit={handleSubmit} action="" className="w-full">
          <div className="w-full text-center">
            <h2 className="text-xl font-bold text-black ">
              Données personnelles
            </h2>
            <p className="mt-2 mb-4 text-base font-normal text-center text-custom-gray">
              Il vous suffit de remplir les détails ci-dessous.
            </p>
          </div>
          <div className="pt-4">
            <div className="flex mt-4">
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
                    value={birthday}
                    onChange={handleDateChange}
                    emptyLabel="yyyy-mm-dd"
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
              className={
                "mt-8 rounded bg-custom-orange drop-shadow-lg active:opacity-50 active:drop-shadow-xl hover:opacity-70 text-center text-base w-full text-white h-[48px] font-bold" +
                (acceptedTerms ? "" : " opacity-50 cursor-not-allowed")
              }
            >
              Continuer
            </button>
            <div className="flex w-full px-8 mt-2 text-sm">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 mr-2"
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              <label htmlFor="terms">
                {" "}
                <span className="text-custom-gray">
                  J&apos;ai lu et accepté les{" "}
                  <a href="#" className="text-custom-orange">
                    Termes et conditions
                  </a>
                </span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
