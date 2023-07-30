"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Auth.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Auth = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [email, setEmail] = useState("");

  const handleContinue = () => {
    console.log(email);
    //got to /Auth/SignUp and pass email as query param
    router.push({
      pathname: "/Auth/SignUp",
      //   query: { email: 'dd' },
    });
  };
 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };
    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);
    // Initial check on componeStant mount
    handleResize();
    // Clean up the event listener on component unmount
    const isClient = typeof window !== 'undefined';
    if (!isClient) {    
        return null;
    }
  
    const queryParams = new URLSearchParams(window.location.search);
     setEmail(queryParams.get('email') || '');
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  
  }, []);

  return (
    <div className="bg-white">
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
        <div className="h-[2px] w-full overflow-hidden">
          <div className={`${styles.tape}`}></div>
        </div>
        <div className="py-2 px-6 flex flex-1">
          <form action="" className="w-full">
            <div className="text-center w-full">
              <h2 className="font-bold text-black text-xl ">
                Bienvenue chez Jumia
              </h2>
              <p className="font-normal text-base mt-2 mb-4 text-custom-gray text-center">
                Saisissez votre address e-mail ou numéro de téléphone pour vous
                connecter ou créer un compte Jumia .
              </p>
            </div>
            <div className="pt-4">
              <div className="relative text-custom-gray">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none peer focus:border-custom-orange focus:border-2 focus:ring-1 focus:ring-custom-orange focus:ring-opacity-50 transition-all duration-200 ease-in-out placeholder-transparent"
                  placeholder="Adresse email ou numéro de téléphone"
                />
                <label
                  htmlFor="email"
                  className="absolute left-3 -top-2.5 text-xs text-custom-hover-orange bg-white px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-custom-hover-orange peer-focus:bg-white peer-focus:px-1 transition-all duration-200 ease-in-out"
                >
                  Adresse email ou numéro de téléphone
                </label>
              </div>
              <div className="px-4">Erreur de connexion</div>
              <Link
                href={{ pathname: "/Auth/SignUp", query: { email: email } }}
                className="mt-4 flex items-center justify-center rounded bg-custom-orange drop-shadow-lg active:bg-orange-300 text-center text-base w-full text-white h-[48px] font-bold"
              >
                Continuer
              </Link>
              <button className="mt-16  p-4 rounded font-bold text-white bg-[#1877f2] h-12 w-full flex items-center round ">
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.674 0H2.753C1.233 0 0 1.207 0 2.695v14.61C0 18.793 1.232 20 2.753 20h7.359l.012-7.147H8.228a.443.443 0 0 1-.447-.436l-.01-2.304c0-.243.2-.44.448-.44h1.893V7.447c0-2.583 1.611-3.99 3.965-3.99h1.931c.247 0 .448.196.448.438v1.943c0 .242-.2.438-.448.438h-1.185c-1.28 0-1.528.596-1.528 1.47v1.927h2.813c.268 0 .476.23.444.49l-.279 2.304a.444.444 0 0 1-.444.386h-2.521L13.295 20h4.38c1.52 0 2.752-1.207 2.752-2.695V2.695C20.427 1.207 19.194 0 17.674 0z"
                    fill="#FFF"
                    fillule="nonzero"
                  ></path>
                </svg>
                <span className="mx-auto">Connectez-vous avec Facebook</span>
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

export default Auth;
