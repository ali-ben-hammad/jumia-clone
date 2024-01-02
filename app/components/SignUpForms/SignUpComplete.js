"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

    export const SignUpComplete = ({name}) => {
  const [countdown, setCountdown] = useState(5); // Initial countdown value
  const router = useRouter();

  useEffect(() => {
    // Decrement the countdown every second
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(timer);
    };
  }, []);
  useEffect(() => {
    // Redirect to the home page when the countdown reaches 0
    if (countdown === 0) {
         router.push('/'); // Replace '/' with the path to your home page
    }
  }, [countdown]);
  return (
    <div className="py-2 px-6 flex flex-col flex-1">
      <div className="py-2 px-6 flex flex-col ">
        <div className="text-center w-full">
          <h2 className="font-bold text-black text-xl ">
           {(name)}, votre compte à été crée!
          </h2>
        </div>
        
      </div>
      <div className="mt-4 w-full text-center">
          Vous serez reirigéd dans
          <span className="text-custom-orange">{countdown} secondes</span>
        </div>
      <button
        onClick={() => router.push("/")}
        className="my-8 rounded bg-custom-orange drop-shadow-lg active:opacity-50 active:drop-shadow-xl hover:opacity-70 text-center text-base w-full text-white h-[48px] font-bold"
      >
        Continuer
      </button>
    </div>
  );
};
