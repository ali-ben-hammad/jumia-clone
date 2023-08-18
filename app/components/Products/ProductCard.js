import React from "react";
import Image from "next/image";
import Link from "next/link";

export const ProductCard = ({ props }) => {
  const { id, product_name, image, price, discount, category } = props;
  // remove the public folder from the image path
  const imagePath = image.replace("/public", "/images");
  //cut the product name if it is too long
  const productName =
    product_name.length > 20
      ? product_name.substring(0, 20) + "..."
      : product_name;

  // calculate the discount price and round it to 2 decimal places
  const discountPrice = (price - (price * discount) / 100).toFixed(2);

  return (
    <Link href={"/products" + id}>
      <div className="m-2 duration-300 hover:scale-105">
        <div className="relative">
          <Image
            src={imagePath}
            alt={product_name}
            width={300}
            height={300}
            layout="fixed"
            objectFit="cover"
          />
          <div className="">{productName}</div>
          <div className="">{discountPrice}</div>
          <div className="line-through">{price}</div>
          <div className="absolute bg-orange-100 rounded top-2 right-2 text-custom-orange">
            -{discount}%
          </div>
        </div>
      </div>
    </Link>
  );
};
