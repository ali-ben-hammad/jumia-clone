import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

const addToCart = async (userUid, productId, productPrice) => {
  const cartRef = doc(db, "carts", userUid);

  // Check if the user's cart exists
  const cartDoc = await cartRef.get();
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
    cartData.totalPrice += productPrice;
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

export default addToCart;
