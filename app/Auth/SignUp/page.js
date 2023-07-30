"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SignUp = () => {
  //resolving winidow is not defined error
 
  const [isMobile, setIsMobile] = useState(false);
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // check if password and confirm password match
    const [passwordMatch, setPasswordMatch] = useState(false);


  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");

  //helper function to determine if password is strong and return weak, medium or strong without regex
  const getPasswordStrength = (password) => {
    //if password has only one character or less than 4 characters return weak
    if (password.length <= 4) {
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

  const passwordStrength = getPasswordStrength(password);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    const queryParams = new URLSearchParams(window.location.search);
    const emailParam = queryParams.get("email") || "";
    setEmail(emailParam);

    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);
    // Initial check on component mount
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="bg-white ">
      <div className="flex flex-col  h-screen w-[480px] max-w-full min-h-[500px] relative bg-white text-custom-gray my-0 mx-auto">
        <div className="p-2">
          {isMobile && (
            <Link href="/" className="h-12 w-12 p-3 inline-block">
              <svg aria-label="" width="24" height="24">
                <path d="m12 19.875-7.85-7.85L12 4.175l1.2 1.2L7.375 11.2H19.85v1.65H7.375l5.825 5.825Z"></path>
              </svg>
            </Link>
          )}
        </div>
        <div className="mb-2 flex items-center justify-center h-16">
          <Image src="/myjumia-top-logo.png" alt="" width="64" height="64" />
        </div>
        <div className="py-2 px-6 flex flex-1">
          <form action="" className="w-full">
            <div className="text-center w-full">
              <h2 className="font-bold text-black text-xl ">
                Créez votre compte
              </h2>
              <p className="font-normal text-base mt-2 mb-4 text-custom-gray text-center">
                Commençons par créer votre compte. Pour assurer la sécurité de
                votre compte, nous avons besoin d'un mot de passe fort!
              </p>
            </div>
            <div className="pt-4">
              <div className="mt-8 mb-4 p-4 bg-slate-200 flex justify-between">
                <div className="flex-1 flex items-center ">{email}</div>
                <Link
                  href={{ pathname: "/Auth", query: { email: email } }}
                  className="text-custom-orange"
                >
                  modifier
                </Link>
              </div>
              <div className="relative mt-8 flex text-custom-gray">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none peer focus:border-custom-orange focus:border-2 focus:ring-1 focus:ring-custom-orange focus:ring-opacity-50 transition-all duration-200 ease-in-out placeholder-transparent"
                  placeholder="Mot de passe"
                  onChange={(e) => {
                    setpassword(e.target.value);
                    getPasswordStrength(e.target.value);
                  }}
                />
                <label
                  htmlFor="password"
                  className="absolute left-3 -top-2.5 text-xs text-custom-hover-orange bg-white px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-custom-hover-orange peer-focus:bg-white peer-focus:px-1 transition-all duration-200 ease-in-out"
                >
                  Mot de passe
                </label>
                <div
                  className="p-3 absolute right-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    width="24"
                  >
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
               <div className="relative mt-8 flex text-custom-gray">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none peer focus:border-custom-orange focus:border-2 focus:ring-1 focus:ring-custom-orange focus:ring-opacity-50 transition-all duration-200 ease-in-out placeholder-transparent"
                  placeholder="Confirmez le mot de passe"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (e.target.value === password) {
                        setPasswordMatch(true);
                        }
                        else {
                        setPasswordMatch(false);
                        }
                  }}
                />
                <label
                  htmlFor="confirmPassword"
                  className={`absolute left-3 -top-2.5 text-xs
                  ${(password!=='' && !passwordMatch) ?'text-red-700 peer-focus:text-red-700':'text-custom-hover-orange peer-focus:text-custom-hover-orange'} 
                    bg-white px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-focus:-top-2.5 peer-focus:text-xs  peer-focus:bg-white peer-focus:px-1 transition-all duration-200 ease-in-out`}
                >
                  Confirmez le mot de passe
                </label>
                <div
                  className="p-3 absolute right-0"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    width="24"
                  >
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
              <button className="mt-4 rounded bg-custom-orange drop-shadow-lg active:bg-orange-300 text-center text-base w-full text-white h-[48px] font-bold">
                Continuer
              </button>
            </div>
          </form>
        </div>
        <div className=" text-sm  bottom-0">
          <div className="w-full px-6 text-center">
            Si besoin d'aide, merci de vous référer au Centre d'Assistance ou de
            contacter notre service client.
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

export default SignUp;
