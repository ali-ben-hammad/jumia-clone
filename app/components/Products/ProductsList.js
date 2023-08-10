import React from "react";
import { ProductCard } from "./ProductCard";
import "swiper/css";
//import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// configure Swiper to use modules
//Swiper.use([Navigation, Pagination, Autoplay]);
export const ProductsList = ({ props }) => {
  // get 10 products with top discout

  return (
    <Swiper
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
      }}
      breakpoints={{
        // when window width is >= 640px
        0: {
          slidesPerView: 1.7,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1000: {
          slidesPerView: 6,
          spaceBetween: 30,
        },
      }}
      modules={[Autoplay, Pagination, Navigation]}
    >
      {props.products.map((product) => (
        <SwiperSlide key={product.id} className="overflow-visible">
          <ProductCard props={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
