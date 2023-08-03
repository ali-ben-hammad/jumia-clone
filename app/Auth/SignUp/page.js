"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { GenderAndBirthdayForm } from "@/app/components/SignUpForms/GenderAndBirthdayForm";
import NameAndPhoneForm from "@/app/components/SignUpForms/NameAndPhoneForm";
import { EmailAndPasswordForm } from "@/app/components/SignUpForms/EmailAndPasswordForm";

import { useAuth } from "@/context/AuthContext";

const SignUp = () => {
  //resolving winidow is not defined error
  const [isMobile, setIsMobile] = useState(false);
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(3);
  const [userData, setUserData] = useState({});
  const { user, createUser } = useAuth();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const emailParam = queryParams.get("email") || "";
    setEmail(emailParam);
  }, []);

  const handleEmailAndPasswordSubmit = (data) => {
    setUserData({ ...userData, ...data });
    setStep(2);
  };

  const handlePhoneAndNameSubmit = (data) => {
    setUserData({ ...userData, ...data });
    setStep(3);
  };

  const handleGenderAndBirthdaySubmit = (data) => {
    setUserData({ ...userData, ...data });
    // Now you have all the user data collected from all the forms
    console.log(userData);
    // Submit the data to create the user record or handle it accordingly
    /* createUser(userData.email, userData.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
        */
  };

  return (
    <div className="bg-white overflow-y-auto h-screen ">
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
          {step === 1 && (
            <EmailAndPasswordForm onSubmit={handleEmailAndPasswordSubmit} email={email} />
          )}
          {step === 2 && (
            <NameAndPhoneForm onSubmit={handlePhoneAndNameSubmit} />
          )}
          {step === 3 && (
            <GenderAndBirthdayForm onSubmit={handleGenderAndBirthdaySubmit} />
          )}
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