
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./globals.css";
import { Roboto } from "next/font/google";
import { Header } from "./components/Header";
import Head from "next/head";
import { AuthContextProvider } from "@/context/AuthContext";


const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <style>{roboto.styles}</style>
      </Head>
      <body>
        <AuthContextProvider>
      
            <Header />
            <main>{children}</main>
        
        </AuthContextProvider>
      </body>
    </html>
  );
}
