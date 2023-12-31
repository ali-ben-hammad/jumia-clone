"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setpassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();
  const params = useSearchParams();
  const { login } = useAuth();

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
    setEmail(params.get("email"));
  }, []);

  const handlePasswordChange = (e) => {
    setpassword(e.target.value);
    if (e.target.value.length == 0) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password != "") {
      setLoading(true);
      await login(email, password)
        .then((res) => {
          console.log(res);
          setLoading(false);
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError(" Mot de passe incorrect. Réessayez");
        });
    }
  };
  return (
    <div className="bg-white overflow-y-auto h-screen ">
      <div className="flex  flex-col  h-screen w-[480px] max-w-full min-h-[500px] relative bg-white text-custom-gray my-0 mx-auto">
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
        <div
          className={`h-[2px] w-full overflow-hidden ${
            loading ? "" : "hidden"
          }`}
        >
          <div className="tape"></div>
        </div>

        <div className="py-2 px-6 flex flex-1">
          <form onSubmit={handleSubmit} action="" className="w-full">
            <div className="text-center w-full">
              <h2 className="font-bold text-black text-xl ">Bienvenue!!</h2>
              <p className="font-normal text-base mt-2 mb-4 text-custom-gray text-center">
                Reconnectez-vous à votre compte Jumia .
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
                  className={`w-full border  border-gray-300 rounded px-3 py-2 outline-none peer  focus:border-1 hover:border-black focus:border-custom-orange focus:ring-custom-orange focus:ring-opacity-50 transition-all duration-200 ease-in-out placeholder-transparent
            ${
              error
                ? "focus:border-2 border-red-700 hover:border-red-700 focus:border-red-700"
                : "borer-gray-300 hover:border-black focus:border-custom-orange"
            }`}
                  placeholder="Mot de passe"
                  onChange={(e) => {
                    handlePasswordChange(e);
                  }}
                />
                <label
                  htmlFor="password"
                  className={`absolute left-3 -top-2.5 text-xs
                ${
                  error
                    ? "text-red-700 font-bold peer-focus:text-red-700"
                    : "text-gray-400 focus:text-custom-hover-orange peer-focus:text-custom-hover-orange"
                } 
                  bg-white px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-focus:-top-2.5 peer-focus:text-xs  peer-focus:bg-white peer-focus:px-1 transition-all duration-200 ease-in-out`}
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
              <div className="text-red-700 px-4 text-xs font-bold pt-1">
                {password !== "" && error ? error : ""}
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
      </div>
    </div>
  );
};

export default Login;
