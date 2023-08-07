"use client";
import React from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import productsData from "/public/productsData.json";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
// fetch dummy data
/*
fetch("https://dummyjson.com/products/category/mens-shoes")
  .then((res) => res.json())
  .then(console.log);
  */

const insertData = async () => {
  /*
  try {
    const productsCollectionRef = collection(db, "products");
    // Loop through the products data from your JSON file
    for (const productId of Object.keys(productsData)) {
      // Get the product data using the current productId
      const productData = productsData[productId];
      // Use productData.id as the document ID, or Firestore will auto-generate one
      await addDoc(productsCollectionRef, {
        ...productData,
        id: productId,
      });
    }
    console.log("Products data added to Firestore successfully!");
  } catch (error) {
    console.error("Error adding products data to Firestore:", error);
  }
  */
};

export default function Home() {
  return (
    <div className="bg-blue-200">
      <Header />
      <div className="container mx-auto max-w-[1184px] text-custom-gray h-screen">
        <div className="">
          <HeroSection />
          <button onClick={() => insertData()}>yoo</button>
        </div>
      </div>
    </div>
  );
}
