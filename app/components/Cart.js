import React, { useState, useEffect } from "react";
import Badge from "@mui/material/Badge";
import { db } from "@/firebase";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";

export const Cart = () => {
  const { user } = useAuth();
  const router = useRouter();
  var cartRef = 0;

  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("user", user);
    if (!user) {
      // back to login
      
    
      setCount(0);
      return;
      
    }
    const fetchCart = async () => {
    
      cartRef = doc(db, "carts", user.uid || "");
   //   console.log(cartRef);

      const cartDoc = await getDoc(cartRef);
      if (cartDoc.exists()) {
        const cartData = cartDoc.data();
        setCount(cartData.totalProductsCount);
      }
    };
    fetchCart();
    // call the function each time the cart changes
    const unsubscribe = onSnapshot(cartRef, (doc) => {
      const cartData = doc.data();
      if(cartData)
      setCount(cartData.totalProductsCount);
      else
      setCount(0)
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  const handleCartClick = () => {
    if (!user) {
      router.push("/Auth");

      return;
    }
    router.push("/Cart");
  };

  return (
    <div onClick={() => handleCartClick()}>
      <div className="relative flex items-center justify-center p-2 rounded cursor-pointer hover:text-custom-hover-orange">
        <Badge
          badgeContent={count}
          color="primary"
          sx={{
            "& .MuiBadge-badge": {
              color: "white",
              backgroundColor: "orange",
              right: 10,
            },
          }}
        >
          <svg
            viewBox="0 0 24 24"
            className="flex-shrink-0 mr-2"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M15.55 13a2 2 0 0 0 1.75-1.03l3.58-6.49A1 1 0 0 0 20.01 4H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44A2 2 0 0 0 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18a2 2 0 1 0 .01 4A2 2 0 0 0 7 18zm10 0a2 2 0 1 0 .01 4 2 2 0 0 0-.01-4z"></path>{" "}
          </svg>
        </Badge>

        <span className="whitespace-nowrap">Panier</span>
      </div>
    </div>
  );
};
