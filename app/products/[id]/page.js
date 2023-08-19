"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  doc,
  getDoc,
  query,
  where,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "@/firebase";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Rating from "@mui/material/Rating";
import AddToCart from "@/app/components/AddToCart";

const Product = () => {
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);
  var discountPrice = 0;
  if (product)
    discountPrice = (
      product.price -
      (product.price * product.discount) / 100
    ).toFixed(2);
  const { user } = useAuth();

  const { id } = useParams();
  // console.log(id);
  const router = useRouter();

  useEffect(() => {
    const getProduct = async () => {
      // Create a query to find the product with the matching "id" field
      // The "id" field is a custom field we created for each product
      // convert the id to a number

      const pID = parseInt(id);

      const q = query(collection(db, "products"), where("id", "==", pID));
      const querySnapshot = await getDocs(q);

      // Check if a matching product was found
      if (!querySnapshot.empty) {
        // Get the first document from the query results
        const productDoc = querySnapshot.docs[0];

        // Set the product state using the document data
        setProduct(productDoc.data());
      } else {
        // Handle case when product with the specified ID was not found
        console.error(`Product with ID "${id}" not found`);
      }
    };

    const checkWishList = async () => {
      if (user) {
        const wishListRef = doc(db, "wishlists", user.uid);
        const docSnap = await getDoc(wishListRef);
        const wishList = docSnap.data();
        if (wishList.products.includes(parseInt(id))) {
          setAdded(true);
        }
      }
    };

    checkWishList();

    getProduct();
  }, [id]);

  const handleWishList = async () => {
    if (user) {
      if (added) {
        removeFromWishList();
      } else {
        addToWishList();
      }
    } else {
      router.push("/login");
    }
  };

  const addToWishList = async () => {
    const wishListRef = doc(db, "wishlists", user.uid);
    const docSnap = await getDoc(wishListRef);
    const wishList = docSnap.data();

    if (!wishList.products.includes(product.id)) {
      const newWishList = {
        ...wishList,
        products: [...wishList.products, product.id],
      };

      await setDoc(wishListRef, newWishList);
      setAdded(true);
      alert("Ajouté à la liste d'envies");
    }
  };

  const removeFromWishList = async () => {
    const wishListRef = doc(db, "wishlists", user.uid);
    const docSnap = await getDoc(wishListRef);
    const wishList = docSnap.data();

    if (wishList.products.includes(product.id)) {
      const newWishList = {
        ...wishList,
        products: wishList.products.filter(
          (productId) => productId !== product.id
        ),
      };

      await setDoc(wishListRef, newWishList);
      setAdded(false);
      alert("Suprimé de la liste d'envies");
    }
  };

  const handleAddToCart = async () => {
    if (user) {
      await addToCart(user.uid, product.id, product.price);
      alert("Ajouté au panier");
    } else {
      router.push("/login");
    }
  };
  return (
    <div className="bg-white ">
      {product && (
        <div className="grid grid-cols-4 gap-4">
          <div className="grid grid-cols-8 col-span-4 p-4">
            <div className="col-span-3 p-4">
              <Image src={product.image} alt="d" width={300} height={300} />
            </div>
            <div className="col-span-5">
              <div className="flex">
                <h1 className="my-4 text-xl font-bold">
                  {product.product_name}
                </h1>
                <button
                  className="items-center p-2 m-2 ml-auto rounded-full outline-none cursor-pointer text-custom-orange lex hover:bg-orange-400 hover:bg-opacity-20"
                  onClick={() => handleWishList()}
                >
                  <svg
                    aria-label="Ajouter à la liste d'envies"
                    viewBox="0 0 24 24"
                    className="ic -f-or5"
                    width="24"
                    height="24"
                    fill="currentColor"
                  >
                    {!added ? (
                      <path d="M16.5 3c-1.74 0-3.41.8-4.5 2.05A6.04 6.04 0 0 0 7.5 3 5.4 5.4 0 0 0 2 8.4c0 3.7 3.4 6.72 8.55 11.31L12 21l1.45-1.3C18.6 15.13 22 12.1 22 8.4A5.4 5.4 0 0 0 16.5 3zm-4.4 15.25-.1.1-.1-.1C7.14 14.03 4 11.23 4 8.4c0-1.97 1.5-3.44 3.5-3.44a3.9 3.9 0 0 1 3.57 2.32h1.87a3.89 3.89 0 0 1 3.56-2.32c2 0 3.5 1.47 3.5 3.44 0 2.83-3.14 5.63-7.9 9.85z"></path>
                    ) : (
                      <path d="m12 21-1.45-1.3C5.4 15.13 2 12.1 2 8.4A5.4 5.4 0 0 1 7.5 3c1.74 0 3.41.8 4.5 2.05A6.04 6.04 0 0 1 16.5 3 5.4 5.4 0 0 1 22 8.4c0 3.7-3.4 6.72-8.55 11.31L12 21z"></path>
                    )}
                  </svg>
                </button>
              </div>
              <div>
                Marque :<span className="font-bold"> {product.brand}</span>
              </div>
              <div className="flex gap-4 pt-2 my-4 border-t border-gray-300">
                <div className="text-xl font-extrabold">
                  {discountPrice} Dhs
                </div>
                <div className="text-gray-700 line-through">
                  {product.price}
                </div>
                <div className="ml-2 bg-orange-100 rounded text-custom-orange">
                  -{product.discount}%
                </div>
              </div>
              <div className="my-4">
                <Rating
                  name="read-only"
                  size="medium"
                  value={product.rating}
                  precision={0.1}
                  readOnly
                />
              </div>
              <AddToCart
                productId={product.id}
                productPrice={product.price}
                stock={product.stock}
              />
              <div className="py-2 my-4 border-t border-gray-300 ">
                {product.text}
              </div>
            </div>
          </div>

          <div className="col-span-1"></div>
        </div>
      )}
    </div>
  );
};

export default Product;
