import React from "react";
import Image from "next/image";
import Link from "next/link";
import Rating from "@mui/material/Rating";
import AddToCart from "../AddToCart";
import { useRouter } from "next/navigation";

export const Card2 = ({ product }) => {
  const { product_name, image, price, discount, stock, category, rating, id } =
    product;
  const router = useRouter();
  // remove the public folder from the image path
  const imagePath = image.replace("/public", "/images");
  //cut the product name if it is too long
  const productName =
    product_name.length > 20
      ? product_name.substring(0, 20) + "..."
      : product_name;

  // calculate the discount price and round it to 2 decimal places
  const discountPrice = (price - (price * discount) / 100).toFixed(2);

  // got to the product page when the user clicks on the card
  const handleClick = () => {
    router.push(`/products/${id}`);
  };

  return (
    <div
      className="flex flex-col justify-center col-span-1 m-2 -z-0 flex-grow-1"
      onClick={() => handleClick()}
    >
      <div className=" hover:scale-[102%] p-2 box-border hover:drop-shadow-xl group  duration-300">
        <div className="relative">
          <Image
            src={imagePath}
            alt={product_name}
            width={200}
            height={200}
            layout="fixed"
            objectFit="cover"
          />
          <div className="">{productName}</div>
          <div className="">{discountPrice}</div>
          <div className="flex">
            <div className="text-sm text-gray-700 line-through ">{price}</div>
            <div className="ml-2 rounded bg-orange-50-100 text-custom-orange">
              -{discount}%
            </div>
          </div>
          <Rating
            name="read-only"
            size="small"
            value={rating}
            precision={0.1}
            readOnly
          />
        </div>
        <div
          className="w-full h-10 "
          onClick={
            // do not go to the product page if the user clicks on the add to cart button
            (e) => {
              e.stopPropagation();
            }
          }
        >
          <div className="hidden group-hover:flex">
            <AddToCart productId={id} productPrice={discountPrice} stock={stock} />
          </div>
        </div>
      </div>
    </div>
  );
};
