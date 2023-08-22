"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { app } from "@/firebase";
import { useAuth } from "@/context/AuthContext";
import { setLazyProp } from "next/dist/server/api-utils";

export const EmailAndPasswordForm = ({ onSubmit, email }) => {
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(false);
  // check if password and confirm password match
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [isweak, setIsweak] = useState(true);
  const { user, createUser } = useAuth();

  const handlePasswordChange = (e) => {
    setpassword(e.target.value);
    if (e.target.value === confirmPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
    getPasswordStrength(e.target.value);
    setIsweak(getPasswordStrength(e.target.value) === "weak");
  };

  const [showPassword, setShowPassword] = useState(false);

  //helper function to determine if password is strong and return weak, medium or strong without regex
  const getPasswordStrength = (password) => {
    //if password has only one character or less than 4 characters return weak
    if (password.length <= 6) {
      return "weak";
    }

    //if contains only the same character return weak
    if (/^([a-zA-Z0-9])\1+$/.test(password)) {
      return "weak";
    }
    //if password contains more than 8 characters and contains at least one number and one character return strong
    if (
      password.length >= 8 &&
      /\d/.test(password) &&
      /[a-zA-Z]/.test(password)
    ) {
      return "strong";
    }
    // else return medium
    return "medium";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isweak && passwordMatch) {
      setLoading(true);
      setIsReady(true);
      onSubmit({ email, password });
    }
  };
  const passwordStrength = getPasswordStrength(password);

  return (
    <>
      <div
        className={`h-[2px] w-full overflow-hidden ${loading ? "" : "hidden"}`}
      >
        <div className="tape"></div>
      </div>
      <div className="flex flex-1 px-6 py-2">
        <form onSubmit={handleSubmit} action="" className="w-full">
          <div className="w-full text-center">
            <h2 className="text-xl font-bold text-black ">
              Créez votre compte
            </h2>
            <p className="mt-2 mb-4 text-base font-normal text-center text-custom-gray">
              Commençons par créer votre compte. Pour assurer la sécurité de
              votre compte, nous avons besoin d&apos;un mot de passe fort!
            </p>
          </div>
          <div className="pt-4">
            <div className="flex justify-between p-4 mt-8 mb-4 bg-slate-200">
              <div className="flex items-center flex-1 ">{email}</div>
              <Link
                href={{ pathname: "/Auth", query: { email: email } }}
                className="text-custom-orange"
              >
                modifier
              </Link>
            </div>
            <div className="relative flex mt-8 text-custom-gray">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 placeholder-transparent transition-all duration-200 ease-in-out border border-gray-300 rounded outline-none peer focus:border-custom-orange focus:border-2 focus:ring-custom-orange focus:ring-opacity-50"
                placeholder="Mot de passe"
                onChange={(e) => {
                  handlePasswordChange(e);
                }}
              />
              <label
                htmlFor="password"
                className="absolute left-3 -top-2.5 text-xs text-gray-400 focus:text-custom-hover-orange bg-white px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-custom-hover-orange peer-focus:bg-white peer-focus:px-1 transition-all duration-200 ease-in-out"
              >
                Mot de passe
              </label>
              <div
                className="absolute right-0 p-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                  {showPassword ? (
                    <path
                      fill="rgba(0,0,0,.54)"
                      d="M12 16q1.875 0 3.188-1.312Q16.5 13.375 16.5 11.5q0-1.875-1.312-3.188Q13.875 7 12 7q-1.875 0-3.188 1.312Q7.5 9.625 7.5 11.5q0 1.875 1.312 3.188Q10.125 16 12 16Zm0-1.8q-1.125 0-1.912-.788Q9.3 12.625 9.3 11.5t.788-1.913Q10.875 8.8 12 8.8t1.913.787q.787.788.787 1.913t-.787 1.912q-.788.788-1.913.788Zm0 4.8q-3.65 0-6.65-2.038-3-2.037-4.35-5.462 1.35-3.425 4.35-5.463Q8.35 4 12 4q3.65 0 6.65 2.037 3 2.038 4.35 5.463-1.35 3.425-4.35 5.462Q15.65 19 12 19Z"
                    ></path>
                  ) : (
                    <path
                      fill="rgba(0,0,0,.54)"
                      d="m19.8 22.6-4.2-4.15q-.875.275-1.762.413Q12.95 19 12 19q-3.775 0-6.725-2.087Q2.325 14.825 1 11.5q.525-1.325 1.325-2.463Q3.125 7.9 4.15 7L1.4 4.2l1.4-1.4 18.4 18.4ZM12 16q.275 0 .512-.025.238-.025.513-.1l-5.4-5.4q-.075.275-.1.513-.025.237-.025.512 0 1.875 1.312 3.188Q10.125 16 12 16Zm7.3.45-3.175-3.15q.175-.425.275-.862.1-.438.1-.938 0-1.875-1.312-3.188Q13.875 7 12 7q-.5 0-.938.1-.437.1-.862.3L7.65 4.85q1.025-.425 2.1-.638Q10.825 4 12 4q3.775 0 6.725 2.087Q21.675 8.175 23 11.5q-.575 1.475-1.512 2.738Q20.55 15.5 19.3 16.45Zm-4.625-4.6-3-3q.7-.125 1.288.112.587.238 1.012.688.425.45.613 1.038.187.587.087 1.162Z"
                    ></path>
                  )}
                </svg>
              </div>
            </div>
            {/* Password Strength Indicator 
              and chnages it to show the first 2 when medium and show them all on green when strong */}
            {password != "" && (
              <>
                <div className="flex w-full mt-4">
                  {passwordStrength === "strong" && (
                    <>
                      <div className="w-1/3 h-[3px] mr-1 rounded bg-green-500"></div>
                      <div className="w-1/3 h-[3px] mr-1 rounded bg-green-500"></div>
                      <div className="w-1/3 h-[3px] mr-1 rounded bg-green-500"></div>
                    </>
                  )}
                  {passwordStrength === "medium" && (
                    <>
                      <div className="w-1/3 h-[3px] mr-1 rounded bg-yellow-500"></div>
                      <div className="w-1/3 h-[3px] mr-1 rounded bg-yellow-500"></div>
                    </>
                  )}
                  {passwordStrength === "weak" && (
                    <>
                      <div className="w-1/3 h-[3px] mr-1 rounded bg-red-700"></div>
                    </>
                  )}
                </div>

                <div
                  className={`text-right  text-sm ${
                    passwordStrength === "weak"
                      ? "text-red-700"
                      : passwordStrength === "medium"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {passwordStrength}
                </div>
              </>
            )}
            <div className="relative flex mt-8 group text-custom-gray">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className={`w-full border  border-gray-300 rounded px-3 py-2 outline-none peer  focus:border-1 hover:border-black focus:border-custom-orange focus:ring-custom-orange focus:ring-opacity-50 transition-all duration-200 ease-in-out placeholder-transparent
                ${
                  password !== "" && !isweak && !passwordMatch
                    ? "focus:border-2 border-red-700 hover:border-red-700 focus:border-red-700"
                    : ""
                }`}
                placeholder="Confirmez le mot de passe"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (e.target.value === password) {
                    setPasswordMatch(true);
                  } else {
                    setPasswordMatch(false);
                  }
                }}
              />
              <label
                htmlFor="confirmPassword"
                className={`absolute left-3 -top-2.5 text-xs
                  ${
                    password !== "" && !isweak && !passwordMatch
                      ? "text-red-700 font-bold peer-focus:text-red-700"
                      : "text-gray-400 focus:text-custom-hover-orange peer-focus:text-custom-hover-orange"
                  } 
                    bg-white px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-focus:-top-2.5 peer-focus:text-xs  peer-focus:bg-white peer-focus:px-1 transition-all duration-200 ease-in-out`}
              >
                Confirmez le mot de passe
              </label>
              <div
                className="absolute right-0 p-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                  {showConfirmPassword ? (
                    <path
                      fill="rgba(0,0,0,.54)"
                      d="M12 16q1.875 0 3.188-1.312Q16.5 13.375 16.5 11.5q0-1.875-1.312-3.188Q13.875 7 12 7q-1.875 0-3.188 1.312Q7.5 9.625 7.5 11.5q0 1.875 1.312 3.188Q10.125 16 12 16Zm0-1.8q-1.125 0-1.912-.788Q9.3 12.625 9.3 11.5t.788-1.913Q10.875 8.8 12 8.8t1.913.787q.787.788.787 1.913t-.787 1.912q-.788.788-1.913.788Zm0 4.8q-3.65 0-6.65-2.038-3-2.037-4.35-5.462 1.35-3.425 4.35-5.463Q8.35 4 12 4q3.65 0 6.65 2.037 3 2.038 4.35 5.463-1.35 3.425-4.35 5.462Q15.65 19 12 19Z"
                    ></path>
                  ) : (
                    <path
                      fill="rgba(0,0,0,.54)"
                      d="m19.8 22.6-4.2-4.15q-.875.275-1.762.413Q12.95 19 12 19q-3.775 0-6.725-2.087Q2.325 14.825 1 11.5q.525-1.325 1.325-2.463Q3.125 7.9 4.15 7L1.4 4.2l1.4-1.4 18.4 18.4ZM12 16q.275 0 .512-.025.238-.025.513-.1l-5.4-5.4q-.075.275-.1.513-.025.237-.025.512 0 1.875 1.312 3.188Q10.125 16 12 16Zm7.3.45-3.175-3.15q.175-.425.275-.862.1-.438.1-.938 0-1.875-1.312-3.188Q13.875 7 12 7q-.5 0-.938.1-.437.1-.862.3L7.65 4.85q1.025-.425 2.1-.638Q10.825 4 12 4q3.775 0 6.725 2.087Q21.675 8.175 23 11.5q-.575 1.475-1.512 2.738Q20.55 15.5 19.3 16.45Zm-4.625-4.6-3-3q.7-.125 1.288.112.587.238 1.012.688.425.45.613 1.038.187.587.087 1.162Z"
                    ></path>
                  )}
                </svg>
              </div>
            </div>
            <div className="px-4 pt-1 text-xs font-bold text-red-700">
              {password !== "" &&
              confirmPassword !== "" &&
              !isweak &&
              !passwordMatch
                ? "Les deux mots de passe doivent correspondre"
                : ""}
            </div>
            <button
              type="submit"
              className="mt-4 rounded bg-custom-orange drop-shadow-lg active:opacity-50 active:drop-shadow-xl hover:opacity-70 text-center text-base w-full text-white h-[48px] font-bold"
            >
              Continuer
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
