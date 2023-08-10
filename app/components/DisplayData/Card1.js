import React from "react";
import Image from "next/image";
import Link from "next/link";
export const Card1 = ({ product }) => {
  const { product_name, image, price, discount, category } = product;
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
    <Link href="#">
      <div className=" hover:scale-105 m-2  duration-300">
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
          <div className="absolute top-2 right-2 bg-orange-100 rounded text-custom-orange">
            -{discount}%
          </div>
        </div>
      </div>
    </Link>
  );
};
