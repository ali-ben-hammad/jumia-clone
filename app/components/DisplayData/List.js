import React, { useState } from "react";
import { Card1 } from "./Card1";
import { Card2 } from "./Card2";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export const List = ({ display, products }) => {
  // set up  pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);

  const numberOfPages = Math.ceil(products.length / productsPerPage);

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {display === 1 ? (
        <div className="">
          {products.map((product) => (
            <Card1 key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {currentProducts.map((product) => (
              <Card2 key={product.id} product={product} className="" />
            ))}
          </div>
          <Pagination
            count={numberOfPages}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
            sx={{
              color: "orange",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          />
        </>
      )}
    </div>
  );
};
