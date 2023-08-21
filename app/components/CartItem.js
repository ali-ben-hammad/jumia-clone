import React, { useState, useEffect } from "react";
import Image from "next/image";
import PopupModal from "./PopupModal";
import { useAuth } from "@/context/AuthContext";

import {
  doc,
  getDoc,
  getDocs,
  query,
  collection,
  where,
  setDoc,
} from "firebase/firestore";
import { addToCart, removeFromCart, deleteFromCart } from "../functions";
import { db } from "@/firebase";

export const CartItem = ({ product }) => {
  const [showPopup, setShowPopup] = useState(false);
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);
  const pID = parseInt(product.productId);
  const { product_name, image, price, discount, text, id } = data || {};
  const discountPrice = (price - (price * discount) / 100).toFixed(2);
  useEffect(() => {
    const fetchProduct = async () => {
      const pID = parseInt(product.productId);
      const q = query(collection(db, "products"), where("id", "==", pID));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const productDoc = querySnapshot.docs[0];
        setData(productDoc.data());
      }
    };
    fetchProduct();

    const fetchCart = async () => {
      const cartRef = doc(db, "carts", user.uid || "");
      const cartDoc = await getDoc(cartRef);
      const pID = parseInt(product.productId);
      if (cartDoc.exists()) {
        const cartData = cartDoc.data();
        // Check if the product already exists in the cart
        const existingProduct = cartData.products.find(
          (product) => product.productId === pID
        );
        if (existingProduct) {
          //    setInCart(true);
          setCount(existingProduct.quantity);
        } else {
          //  setInCart(false);
          setCount(0);
        }
      }
    };
    fetchCart();
  }, [product]);

  const handleIncrement = () => {
    setCount(count + 1);
    // Call the addToCart function to update the cart
    addToCart(user.uid, product.productId, discountPrice);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
      // Call the removeFromCart function to update the cart
      removeFromCart(user.uid, product.productId, discountPrice);
    }
  };

  const handleDelete = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleConfirmDelete = () => {
    // Call the deleteFromCart function here
    deleteFromCart(user.uid, product.productId, discountPrice);
    setShowPopup(false);
  };

  const addToWishList = async () => {
    const wishListRef = doc(db, "wishlists", user.uid);
    const docSnap = await getDoc(wishListRef);
    const wishList = docSnap.data();

    if (!wishList.products.includes(pID)) {
      const newWishList = {
        ...wishList,
        products: [...wishList.products, pID],
      };

      await setDoc(wishListRef, newWishList);
      //setAdded(true);
      alert("Ajouté à la liste d'envies");
    }
  };

  const handleAddToWishlist = () => {
    // Call the addToWishlist function here
    addToWishList();
    setShowPopup(false);
  };

  return (
    <div className="py-4 border-b border-gray-300">
      <div className="flex text-xl ">
        <div className="p-4">
          <Image alt="" src={image} width={100} height={100} />
        </div>
        <div className="">
          <div>{product_name}</div>
          <div className="w-2/3 text-sm">{text}</div>
        </div>
        <div className="ml-auto">
          <div className="text-2xl whitespace-nowrap">{discountPrice} Dhs</div>
          <div className="flex">
            <div className="text-base text-gray-400 line-through ">{price}</div>
            <div className="ml-auto bg-orange-100 rounded text-custom-orange">
              -{discount}%
            </div>
          </div>
        </div>
      </div>
      <div className="flex px-3">
        <div
          className="flex p-2 mr-auto rounded cursor-pointer text-custom-orange hover:bg-orange-100"
          onClick={() => handleDelete()}
        >
          <svg
            viewBox="0 0 24 24"
            className="ic"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M6 19.6c0 1 .9 2 2 2h8a2 2 0 0 0 2-2v-12H6v12Zm2-10h8v10H8v-10Zm7.5-5-1-1h-5l-1 1H5v2h14v-2h-3.5Z"></path>
          </svg>
          <div className="">Supprimer</div>
        </div>
        {showPopup && (
          <PopupModal
            onClose={handleClosePopup}
            onConfirmDelete={handleConfirmDelete}
            onAddToWishlist={handleAddToWishlist}
          />
        )}
        <div className="ml-auto">
          <div className="flex items-center justify-center w-full">
            <button
              className=" flex items-center px-3 w-8  mx-2 mr-auto py-3 h-8 cursor-pointer text-white  text-2xl hover:bg-custom-hover-orange shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] disabled:opacity-25   text-center uppercase bg-custom-orange rounded"
              onClick={handleDecrement}
              disabled={count === 1}
            >
              -
            </button>
            <span className="px-2">{count}</span>
            <button
              className=" flex items-center px-3 w-8  mx-2 ml-auto py-3 h-8 cursor-pointer text-white  text-2xl hover:bg-custom-hover-orange shadow-[0_4px_8px_0_rgba(0,0,0,0.2)]   text-center uppercase bg-custom-orange rounded"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
