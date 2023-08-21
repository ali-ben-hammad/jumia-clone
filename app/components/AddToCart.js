import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { addToCart, removeFromCart } from "../functions";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
const AddToCart = ({ productId, productPrice, stock }) => {
  const { user } = useAuth();
  const [count, setCount] = useState(0); // Initialize count to 0
  const [inCart, setInCart] = useState(false); // Initialize inCart to false
  const router = useRouter();
  var cartRef = 0;

  const handleAddToCart = async () => {
    if (user) {
      if (count >= stock) {
        alert("Stock insuffisant");
        return;
      }
      await addToCart(user.uid, productId, productPrice);
      alert("Ajouté au panier");
      setInCart(true);
      setCount(count + 1);
    }
  };

  const handleIncrement = () => {
    handleAddToCart();
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    } else {
      setInCart(false);
      setCount(0);
    }
    removeFromCart(user.uid, productId, productPrice);
    alert("Retiré du panier");
  };

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) {
        // back to login
        router.push("/login");
      }
      cartRef = doc(db, "carts", user.uid || "");
      const cartDoc = await getDoc(cartRef);
      if (cartDoc.exists()) {
        const cartData = cartDoc.data();
        // Check if the product already exists in the cart
        const existingProduct = cartData.products.find(
          (product) => product.productId === productId
        );
        if (existingProduct) {
          setInCart(true);
          setCount(existingProduct.quantity);
        } else {
          setInCart(false);
          setCount(0);
        }
      } else {
        setInCart(false);
        setCount(0);
      }
    };
    fetchCart();
  }, [user, productId, cartRef]);

  return (
    <div className="flex items-center w-full">
      {!inCart ? (
        <button
          onClick={() => handleAddToCart()}
          className="w-full flex items-center px-3 group-hover:flex mx-2 py-3 h-12 cursor-pointer text-white  leading-4 hover:bg-custom-hover-orange shadow-[0_4px_8px_0_rgba(0,0,0,0.2)]   text-center uppercase bg-custom-orange rounded"
        >
          <svg
            viewBox="0 0 24 24"
            className="ic -f-or5"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-9.8-3.3.9-1.7h7.5a2 2 0 0 0 1.7-1l3.9-7-1.8-1-1 2-2.8 5h-7l-.2-.3L6.2 6l-1-2-1-2H1v2h2l3.6 7.6L5.2 14A2 2 0 0 0 7 17h12v-2H7.4a.3.3 0 0 1-.2-.3z"></path>
          </svg>
          <span className="mx-auto">J'Achète</span>
        </button>
      ) : (
        <div className="flex items-center justify-center w-full">
          <button
            className=" flex items-center px-3 w-12  mx-2 mr-auto py-3 h-12 cursor-pointer text-white  text-4xl hover:bg-custom-hover-orange shadow-[0_4px_8px_0_rgba(0,0,0,0.2)]   text-center uppercase bg-custom-orange rounded"
            onClick={handleDecrement}
          >
            -
          </button>
          <span className="px-2">{count}</span>
          <button
            className=" flex items-center px-3 w-12  mx-2 ml-auto py-3 h-12 cursor-pointer text-white  text-4xl hover:bg-custom-hover-orange shadow-[0_4px_8px_0_rgba(0,0,0,0.2)]   text-center uppercase bg-custom-orange rounded"
            onClick={handleIncrement}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
