import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Card2 = ({ product }) => {
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
    <Link href="#" className="m-2 flex flex-col flex-grow-1 w-60 col-span-1">
      <div className=" hover:scale-[102%]  duration-300">
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
        <div className="ml-2 py-3 px-4 cursor-pointer text-white text-sm leading-4 hover:bg-custom-hover-orange shadow-[0_4px_8px_0_rgba(0,0,0,0.2)] felx items-center justify text-center uppercase bg-custom-orange rounded">
          Ajouter au panier
        </div>
      </div>
    </Link>
  );
};
