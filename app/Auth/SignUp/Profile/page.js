"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

//applying custom styles to the select componentclassName="text-red-700 px-4 text-xs font-bold pt-1">

const Profile = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const [prefixe, setPrefixe] = useState("+212");
  const [countries, setCountries] = useState([]);

  function isValidPhoneNumber(phoneNumber) {
    const phonePattern = /^\d{8,10}$/;
    return phonePattern.test(phoneNumber);
  }

  const [isPhoneValid, setIsPhoneValid] = useState(true);

  const handlePhoneNumberChange = (e) => {
    const inputValue = e.target.value;
    setPhoneNumber(inputValue);

    // Validate the phone number on each input change.
    setIsPhoneValid(isValidPhoneNumber(inputValue));
  };

  const handleSelect = (event) => {
    console.log(event.target.value);
    setPrefixe(event.target.value);
  };
  useEffect(() => {
    fetch("/phoneCodes.json") // Fetch the JSON file from the public directory
      .then((response) => response.json())
      .then((data) => {
        // Assuming the JSON file contains an array of country objects with 'code' and 'name' properties
        setCountries(data);
      })
      .catch((error) => {
        console.error("Error fetching data from JSON file:", error);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);
    // Initial check on component mount
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChange = (e) => {
    switch (e.target.id) {
      case "firstName":
        setFirstName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);

        break;
      case "phoneNumber":
        setPhoneNumber(e.target.value);

        break;
      default:
        break;
    }
  };
  const renderValue = (selected) => {
    const selectedCountry = countries.find(
      (country) => country.dial_code === selected
    );
    return selectedCountry ? selectedCountry.dial_code : "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      firstName.length >= 2 &&
      lastName.length >= 2 &&
      isPhoneValid &&
      phoneNumber.length >= 8
    ) {
      console.log(firstName, lastName, prefixe + phoneNumber);
      onSubmit(firstName, lastName, prefixe + phoneNumber);
    }
  };
  return (
    <div className="h-screen overflow-y-auto bg-white ">
      <div className="flex flex-col  h-screen w-[480px] max-w-full min-h-[500px] relative bg-white text-custom-gray my-0 mx-auto">
        <div className="p-2">
          {isMobile && (
            <Link href="/" className="inline-block w-12 h-12 p-3">
              <svg aria-label="" width="24" height="24">
                <path d="m12 19.875-7.85-7.85L12 4.175l1.2 1.2L7.375 11.2H19.85v1.65H7.375l5.825 5.825Z"></path>
              </svg>
            </Link>
          )}
        </div>
        <div className="flex items-center justify-center h-16 mb-2">
          <Image src="/myjumia-top-logo.png" alt="" width="64" height="64" />
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
              <div className="relative mt-8 h-[56px] flex group text-custom-gray">
                <input
                  id="firstName"
                  type="text"
                  className={`w-full border  border-gray-300 rounded px-3 py-2 outline-none peer  focus:border-1 hover:border-black focus:border-custom-orange focus:ring-custom-orange focus:ring-opacity-50 transition-all duration-200 ease-in-out placeholder-transparent
                ${
                  firstName != "" && firstName.length < 2
                    ? "focus:border-2 border-red-700 hover:border-red-700 focus:border-red-700"
                    : ""
                }`}
                  placeholder="Prénom*"
                  value={firstName}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <label
                  htmlFor="firstName"
                  className={`absolute left-3 -top-2.5 mt-1 text-xs
                  ${
                    firstName != "" && firstName.length < 2
                      ? "text-red-700 font-bold peer-focus:text-red-700"
                      : "text-gray-400 focus:text-custom-hover-orange peer-focus:text-custom-hover-orange"
                  } 
                    bg-white px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-focus:-top-2.5 peer-focus:text-xs  peer-focus:bg-white peer-focus:px-1 transition-all duration-200 ease-in-out`}
                  style={{ pointerEvents: "none" }}
                >
                  Prénom*
                </label>
              </div>
              <div className="px-4 pt-1 text-xs font-bold text-red-700">
                {firstName != "" && firstName.length < 2
                  ? "Le nom doit avoir un minimum de 2 caractères et un maximum de 60."
                  : ""}
              </div>
              <div className="relative mt-8 h-[56px] flex group text-custom-gray">
                <input
                  id="lastName"
                  type="text"
                  className={`w-full border  border-gray-300 rounded px-3 py-2 outline-none peer  focus:border-1 hover:border-black focus:border-custom-orange focus:ring-custom-orange focus:ring-opacity-50 transition-all duration-200 ease-in-out placeholder-transparent
                ${
                  lastName != "" && lastName.length < 2
                    ? "focus:border-2 border-red-700 hover:border-red-700 focus:border-red-700"
                    : ""
                }`}
                  placeholder="Nom de famille*"
                  value={lastName}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <label
                  htmlFor="lastName"
                  className={`absolute left-3 -top-2.5 mt-1 text-xs
                  ${
                    lastName != "" && lastName.length < 2
                      ? "text-red-700 font-bold peer-focus:text-red-700"
                      : "text-gray-400 focus:text-custom-hover-orange peer-focus:text-custom-hover-orange"
                  } 
                    bg-white px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-focus:-top-2.5 peer-focus:text-xs  peer-focus:bg-white peer-focus:px-1 transition-all duration-200 ease-in-out`}
                  style={{ pointerEvents: "none" }}
                >
                  Nom de famille*
                </label>
              </div>
              <div className="px-4 pt-1 text-xs font-bold text-red-700">
                {lastName != "" && lastName.length < 2
                  ? "Le nom doit avoir un minimum de 2 caractères et un maximum de 60."
                  : ""}
              </div>
              <div className="flex mt-4">
                <FormControl>
                  <InputLabel id="demo-simple-select-label">Préfixe</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={prefixe}
                    renderValue={renderValue}
                    autoWidth
                    label="Préfixe"
                    onChange={handleSelect}
                    style={{ width: "104px" }}
                    sx={{
                      outline: "none",
                      "&:focus": {
                        borderColor: "red",
                        borderWidth: "2px",
                        borderStyle: "solid",
                      },
                    }}
                  >
                    {countries.map((country) => (
                      <MenuItem key={country.code} value={country.dial_code}>
                        {country.name + " " + country.dial_code}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <div className="flex-col ml-2 grow">
                  <div className="relative  flex group h-[56px]  text-custom-gray">
                    <input
                      id="phoneNumber"
                      type="text"
                      className={`w-full border  border-gray-300 rounded px-3 py-2 outline-none peer  focus:border-1 hover:border-black focus:border-custom-orange focus:ring-custom-orange focus:ring-opacity-50 transition-all duration-200 ease-in-out placeholder-transparent
                ${
                  !isPhoneValid
                    ? "focus:border-2 border-red-700 hover:border-red-700 focus:border-red-700"
                    : ""
                }`}
                      placeholder="Nom de famille*"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                    />
                    <label
                      htmlFor="phoneNumber"
                      className={`absolute left-3 -top-2.5 mt-1 text-xs 
                  ${
                    !isPhoneValid
                      ? "text-red-700 font-bold peer-focus:text-red-700"
                      : "text-gray-400 focus:text-custom-hover-orange peer-focus:text-custom-hover-orange"
                  } 
                    bg-white px-1 peer-placeholder-shown:text-base  peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-focus:-top-2.5 peer-focus:text-xs  peer-focus:bg-white peer-focus:px-1 transition-all duration-200 ease-in-out`}
                      style={{ pointerEvents: "none" }}
                    >
                      Numéro de téléphone*
                    </label>
                  </div>
                  <div className="max-w-xs px-4 pt-1 text-xs font-bold text-red-700">
                    {!isPhoneValid
                      ? "Tapez un numéro de téléphone valide pour continuer"
                      : ""}
                  </div>
                </div>
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
        <div className="bottom-0 text-sm ">
          <div className="w-full px-6 text-center">
            Si besoin d&apos;aide, merci de vous référer au Centre
            d&apos;Assistance ou de contacter notre service client.
          </div>
          <div className="w-full py-8 text-center ">
            <svg
              role="img"
              viewBox="0 0 172 30"
              width="97"
              height="16"
              className="mx-auto"
            >
              <path
                fill="#282828"
                d="M43.73 19.5c0 1.81-1.72 2.69-5.24 2.69h-6.9c-3.6 0-5.34-.88-5.34-2.7V0H20.4v19.8a8.75 8.75 0 0 0 .56 3.27 6.8 6.8 0 0 0 1.54 2.29c.6.62 1.33 1.12 2.13 1.46a15.17 15.17 0 0 0 5.1 1.1h8.1c4.03 0 7-.67 8.87-2a7.12 7.12 0 0 0 2.86-6.15V0h-5.83v19.5ZM89.86 0a3.43 3.43 0 0 0-3.07 1.54l-13.12 19.2-13.49-19.2A3.63 3.63 0 0 0 57.11 0a2.95 2.95 0 0 0-2.9 2.04c-.15.42-.22.87-.2 1.31v24.87h5.84V11.07l10.48 15.55a3.84 3.84 0 0 0 3.32 1.86c.63 0 1.24-.17 1.79-.48.62-.32 1.15-.8 1.54-1.38L87.3 11.24v16.98h5.83V3.62a3.74 3.74 0 0 0-.88-2.6A2.97 2.97 0 0 0 89.86 0Zm13.34 0h-5.82v28.02h5.83V0Zm25.38 1.98a3.55 3.55 0 0 0-6.38 0l-15.62 26.14h6.87l4.15-7.4h15.38l4.24 7.4h6.58L128.58 1.98Zm.98 12.97h-8.6l4.25-7.12 4.35 7.12ZM10.55 5.47l-.1 10.03c.16 5.07-1.53 6.37-2.92 6.9a27.17 27.17 0 0 1-7.2 1.23H0v6.35h.42c2.38-.17 4.74-.55 7.05-1.15 6.02-1.3 8.7-5.43 8.7-13.36L16.36 0h-5.8l-.02 5.47Z"
              ></path>
              <path
                fill="#F90"
                d="M157.72.52a13.71 13.71 0 1 0 0 27.43 13.71 13.71 0 0 0 0-27.43Zm6.26 22.24-6.26-3.28-6.26 3.28 1.2-6.97-5.04-4.92 7-1.01 3.07-6.35 3.07 6.35 7 1.01-5.04 4.92 1.26 6.97Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
