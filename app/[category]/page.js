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
  const [filter, setFilter] = useState({
    selectedBrands: [],
    rating: 0,
    minPrice: 0,
    maxPrice: 100000,
  });
  const [brands, setBrands] = useState([]);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

  useEffect(() => {
    const fetchProducts = async () => {
      if (decodedCategory) {
        const productsRef = collection(db, "products");

        // add limit 10
        /*
        const q = query(
          productsRef,
          where("category", "==", decodedCategory),
          where("brand", "in", filter.selectedBrands || []),
          where("rating", ">=", filter.rating || 0),
          where("price", ">=", filter.minPrice || 0),
          where("price", "<=", filter.maxPrice || 100000)
        );
        */

        // fill brands
        const q = query(productsRef, where("category", "==", decodedCategory));

        //    const q = query(productsRef, where("category", "==", decodedCategory));

        try {
          const querySnapshot = await getDocs(q);
          const productsData = [];
          querySnapshot.forEach((doc) => {
            productsData.push({ id: doc.id, ...doc.data() });
            // set prices
            setMinPrice(Math.min(...productsData.map((p) => p.price)));
            setMaxPrice(Math.max(...productsData.map((p) => p.price)));

            brands.push(doc.data().brand);
          });
          setProducts(productsData);
        } catch (error) {
          console.error("Error fetching products:", error);
        }

        // make brands unique
        const uniqueBrands = [...new Set(brands)];
        setBrands(uniqueBrands);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        <Filter
          setFilter={setFilter}
          brands={brands}
          minPrice={minPrice}
          maxPrice={maxPrice}
          filter={filter}
          className="col-span-1"
        />
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
