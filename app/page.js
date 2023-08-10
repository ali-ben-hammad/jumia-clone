"use client";
import React from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { TopDeals } from "./components/HomeFilters/TopDeals";
import productsData from "/public/productsData.json";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  writeBatch,
  doc,
} from "firebase/firestore";
// fetch dummy data
/*
fetch("https://dummyjson.com/products/category/mens-shoes")
  .then((res) => res.json())
  .then(console.log);
  */

const insertData = async () => {
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
};
/*
const insertDataInBatches = async () => {
  try {
    const productsCollectionRef = collection(db, "products");
    const batchSize = 50; // Adjust the batch size as needed
    const productIds = Object.keys(productsData);

    for (let i = 0; i < productIds.length; i += batchSize) {
      const batch = writeBatch(db);
      const batchProductIds = productIds.slice(i, i + batchSize);

      batchProductIds.forEach((productId) => {
        const productData = productsData[productId];
        const productDocRef = doc(productsCollectionRef, productId);
        batch.set(productDocRef, productData);
      });

      await batch.commit();
      console.log(`Batch ${i / batchSize + 1} inserted successfully.`);

      // Add a delay between batches to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the delay as needed
    }

    console.log("All records inserted.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
<button onClick={() => insertDataInBatches()}>yoo</button>;
*/

const countProducts = async () => {
  const productsCollection = collection(db, "products");
  const productsSnapshot = await getDocs(productsCollection);
  const numProducts = productsSnapshot.size;

  console.log(`Number of products: ${numProducts}`);
};

countProducts();

export default function Home() {
  return (
    <div className="bg-blue-200">
      <Header />
      <div className="container mx-auto max-w-[1184px] text-custom-gray h-screen">
        <div className="">
          <HeroSection />

          <TopDeals />
        </div>
      </div>
    </div>
  );
}
