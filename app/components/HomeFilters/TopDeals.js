"use client";
import React from "react";
import Link from "next/link";
import { TopBar } from "../Products/TopBar";
import { ProductsList } from "../Products/ProductsList";
import { db } from "/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { useState, useEffect } from "react";
export const TopDeals = () => {
  const [products, setProducts] = useState([]);

  // get all products from db and sort by discount and store in an array
  const getDiscountedProducts = async () => {
    try {
      const q = query(
        collection(db, "products"),
        orderBy("discount", "desc"),
        limit(10)
      );
      const querySnapshot = await getDocs(q);
      const fetchedProducts = [];
      querySnapshot.forEach((doc) => {
        fetchedProducts.push({ id: doc.id, ...doc.data() });
      });
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error retrieving discounted products:", error);
    }
  };
  //useEffect to call the function
  useEffect(() => {
    getDiscountedProducts();
  }, []);

  return (
    <div className="p-4 ">
      <div className=" bg-white rounded-md overflow-hidden ">
        <TopBar props={{ title: "Top Deals" }} />
        <ProductsList props={{ products }} />
      </div>
    </div>
  );
};
