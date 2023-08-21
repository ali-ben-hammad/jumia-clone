import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

export const addToCart = async (userUid, productId, productPrice) => {
  console.log(userUid, productId, productPrice);
  const cartRef = doc(db, "carts", userUid);

  // Check if the user's cart exists
  const cartDoc = await getDoc(cartRef);
  if (cartDoc.exists()) {
    const cartData = cartDoc.data();

    // Check if the product already exists in the cart
    const existingProductIndex = cartData.products.findIndex(
      (product) => product.productId === productId
    );

    if (existingProductIndex !== -1) {
      // Update existing product's quantity
      cartData.products[existingProductIndex].quantity += 1;
    } else {
      // Add new product to the cart
      cartData.products.push({
        productId,
        quantity: 1,
      });
    }

    // Update cart's total and count

    const numericProductPrice = parseFloat(productPrice);

    // Convert totalPrice to a number before updating
    const numericTotalPrice = parseFloat(cartData.totalPrice);

    // Calculate the new total price
    const updatedTotalPrice = numericTotalPrice + numericProductPrice;

    // Update the total price with formatted 2 decimal places
    cartData.totalPrice = updatedTotalPrice.toFixed(2);
    console.log("total  : : " + cartData.totalPrice);
    cartData.totalProductsCount += 1;

    // Update the cart document
    await updateDoc(cartRef, cartData);
  } else {
    // Create new cart
    const newCart = {
      products: [
        {
          productId,
          quantity: 1,
        },
      ],
      totalPrice: productPrice,
      totalProductsCount: 1,
    };
    await setDoc(cartRef, newCart);
  }
};

export const removeFromCart = async (userUid, productId, productPrice) => {
  const cartRef = doc(db, "carts", userUid);

  // Check if the user's cart exists
  const cartDoc = await getDoc(cartRef);
  if (cartDoc.exists()) {
    const cartData = cartDoc.data();
    // Check if the product already exists in the cart
    const existingProductIndex = cartData.products.findIndex(
      (product) => product.productId === productId
    );
    if (existingProductIndex !== -1) {
      // Update existing product's quantity
      cartData.products[existingProductIndex].quantity -= 1;

      // Remove the product from the array if quantity reaches 0
      if (cartData.products[existingProductIndex].quantity === 0) {
        cartData.products.splice(existingProductIndex, 1);
      }
    }
    // Update cart's total and count

    const numericProductPrice = parseFloat(productPrice);

    // Convert totalPrice to a number before updating
    const numericTotalPrice = parseFloat(cartData.totalPrice);

    // Calculate the new total price
    const updatedTotalPrice = numericTotalPrice - numericProductPrice;

    // Update the total price with formatted 2 decimal places
    cartData.totalPrice = updatedTotalPrice.toFixed(2);
    cartData.totalProductsCount -= 1;
    console.log("after remove => " + cartData.totalPrice);
    // Update the cart document
    await updateDoc(cartRef, cartData);
  }
};
export const deleteFromCart = async (userUid, productId, productPrice) => {
  const cartRef = doc(db, "carts", userUid);

  // Check if the user's cart exists
  const cartDoc = await getDoc(cartRef);
  if (cartDoc.exists()) {
    const cartData = cartDoc.data();
    // Check if the product already exists in the cart
    const existingProductIndex = cartData.products.findIndex(
      (product) => product.productId === productId
    );
    if (existingProductIndex !== -1) {
      // Get the quantity of the product to be removed
      const productToRemove = cartData.products[existingProductIndex].quantity;

      // Remove the product from the array
      cartData.products.splice(existingProductIndex, 1);

      // Update cart's total price and total count*
      const numericProductPrice = parseFloat(productPrice);
      cartData.totalPrice -= numericProductPrice * productToRemove;
      cartData.totalProductsCount -= productToRemove;

      // Update the cart document
      await updateDoc(cartRef, cartData);
    }
  }
};
