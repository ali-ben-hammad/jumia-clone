"use client";
import { useContext, useState, useEffect, createContext } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const createUser = async (email, password, displayName) => {
    try {
      // Create the user using email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get the user object from the userCredential
      const user = userCredential.user;

      // Update the user's displayName
      await updateProfile(user, { displayName });

      // Create a new wishlist for the user

      const uid = user.uid;
      const wishlistRef = doc(db, "wishlists", uid);
      const initialWishlistData = {
        products: [],
      };
      await setDoc(wishlistRef, initialWishlistData);

      // create a new cart for the user
      const cartRef = doc(db, "carts", uid);
      const initialCartData = {
        products: [],
        totalPrice: 0,
        totalProductsCount : 0
      };
      await setDoc(cartRef, initialCartData);

      // User registration is complete with displayName set
      console.log(
        "User registered successfully with displayName:",
        displayName
      );

      return user;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error; // Propagate the error for handling in the calling component
    }
  };

  const exist = (email) => {
    console.log("exists " + email);
    return fetchSignInMethodsForEmail(auth, email);
  };

  const value = { user, login, logout, createUser, exist };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
