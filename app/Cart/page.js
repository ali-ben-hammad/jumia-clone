"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  collection,
  query,
  where,
  getDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase";
import { CartItem } from "../components/CartItem";

import { CartResume } from "../components/CartResume";
const CartPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  var cartRef = 0;

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) {
        // back to login
        setCount(0);
      }
      cartRef = doc(db, "carts", user.uid || "");
      const cartDoc = await getDoc(cartRef);
      if (cartDoc.exists()) {
        const cartData = cartDoc.data();
        setCount(cartData.totalProductsCount);
        setCartProducts(cartData.products);
      }
    };
    fetchCart();
    // snapshot listener
    const unsubscribe = onSnapshot(cartRef, (doc) => {
      if (doc.exists()) {
        const cartData = doc.data();
        setTotal(cartData.totalPrice);
        setCount(cartData.totalProductsCount);
        setCartProducts(cartData.products);
      }
    });
    return unsubscribe;
  }, [user]);

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3 p-2 bg-white">
        <div className="w-full border-b border-gray-400">
          <div className="text-xl">Panier ( {count} )</div>
        </div>
        <div>
          {cartProducts.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className="col-span-1">
        <CartResume total={total} />
      </div>
    </div>
  );
};
export default CartPage;
