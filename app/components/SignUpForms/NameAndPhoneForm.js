
"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

//applying custom styles to the select componentclassName="text-red-700 px-4 text-xs font-bold pt-1">
 

const NameAndPhoneForm = ({onSubmit}) => {
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
    const selectedCountry = countries.find((country) => country.dial_code === selected);
    return selectedCountry ? selectedCountry.dial_code : "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(firstName.length >= 2 && lastName.length >= 2 &&  isPhoneValid && phoneNumber.length >= 8){
      
      console.log(firstName, lastName,  prefixe+phoneNumber);
      onSubmit(firstName, lastName,  prefixe+phoneNumber);

    }
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
              <div className="text-red-700 px-4 text-xs font-bold pt-1">
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
              <div className="text-red-700 px-4 text-xs font-bold pt-1">
                {lastName != "" && lastName.length < 2
                  ? "Le nom doit avoir un minimum de 2 caractères et un maximum de 60."
                  : ""}
              </div>
              <div className="flex  mt-4">
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
                      <MenuItem  key={country.code} value={country.dial_code}>
                        {  country.name + " " + country.dial_code}
                      </MenuItem>
                    ))}
                
                  </Select>
                </FormControl>
                <div className="grow ml-2   flex-col">
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
                  <div className="text-red-700 px-4 max-w-xs text-xs font-bold  pt-1">
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
       
    
    
  );
};

export default NameAndPhoneForm;
