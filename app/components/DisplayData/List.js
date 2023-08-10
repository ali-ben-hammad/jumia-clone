import React from "react";
import { Card1 } from "./Card1";
import { Card2 } from "./Card2";

export const List = ({ display, products }) => {
  return (
    <div>
      {display === 1 ? (
        <div className="">
          {products.map((product) => (
            <Card1 key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4">
          {products.map((product) => (
            <Card2 key={product.id} product={product} className="" />
          ))}
        </div>
      )}
    </div>
  );
};
