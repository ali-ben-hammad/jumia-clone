"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { Data } from "./Data";
import { Filter } from "./Filter";

const CategoryPage = () => {
  const router = useRouter();
  const params = useParams();
  const [category, setCategory] = useState("");
  useEffect(() => {
    setCategory(params.category);
  }, []);
  const decodedCategory = category ? decodeURIComponent(category) : "";
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      if (decodedCategory) {
        const productsRef = collection(db, "products");
        const q = query(productsRef, where("category", "==", decodedCategory));

        try {
          const querySnapshot = await getDocs(q);
          const productsData = [];
          querySnapshot.forEach((doc) => {
            productsData.push({ id: doc.id, ...doc.data() });
          });
          setProducts(productsData);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div>
      <h1>Products in {decodedCategory}</h1>
      <div className="grid grid-cols-4 gap-4">
        <Filter setFilter={setFilter} className="col-span-1" />
        <Data
          products={products}
          filter={filter}
          category={decodedCategory}
          className="col-span-3"
        />
      </div>
    </div>
  );
};

export default CategoryPage;
