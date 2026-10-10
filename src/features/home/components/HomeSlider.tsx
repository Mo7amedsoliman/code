"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import slider_1 from "../../../assets/images/home-slider-1.png";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

export default function HomeSlider() {
  return (
    <div className="relative">
      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".nxt-btn",
          prevEl: ".prev-btn",
        }}
        loop={true}
        modules={[Pagination, Navigation]}
      >
        <SwiperSlide>
          <div
            className={`py-32 text-white `}
            style={{
              backgroundImage: `linear-gradient(to bottom right,#4ade8099,#14532d99),url("${slider_1.src}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="container space-y-4">
              {" "}
              <h3 className="text-3xl font-bold max-w-96">
                Fresh Products Delivered to your Door
              </h3>
              <p className="text-lg font-bold">Get 20% off your first order</p>
              <div className="mt-4 text-2xl space-x-3">
                <button className="btn  text-primary-500 font-bold  border-2 border-white bg-white">
                  Shop Now
                </button>
                <button className="btn bg-transparent  border-2 text-white border-white">
                  View Deals
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className={`py-32 text-white `}
            style={{
              backgroundImage: `linear-gradient(to bottom right,#4ade8099,#14532d99),url("${slider_1.src}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="container space-y-4">
              {" "}
              <h3 className="text-3xl font-bold max-w-96">
                Premium Quality Guaranteed
              </h3>
              <p className="text-lg font-bold">Fresh from farm to your table</p>
              <div className="mt-4 text-2xl space-x-3">
                <button className="btn  text-primary-500 font-bold  border-2 border-white bg-white">
                  Shop Now
                </button>
                <button className="btn bg-transparent  border-2 text-white border-white">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className={`py-32 text-white `}
            style={{
              backgroundImage: `linear-gradient(to bottom right,#4ade8099,#14532d99),url("${slider_1.src}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="container space-y-4">
              {" "}
              <h3 className="text-3xl font-bold max-w-96">
                Fast & Free Delivery
              </h3>
              <p className="text-lg font-bold">Same day delivery available</p>
              <div className="mt-4 text-2xl space-x-3">
                <button className="btn  text-primary-500 font-bold  border-2 border-white bg-white">
                  Order Now
                </button>
                <button className="btn bg-transparent  border-2 text-white border-white">
                  Delivery Info
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <button className="absolute z-50 left-5 top-1/2 -translate-y-1/2 size-10 flex justify-center items-center prev-btn btn rounded-full text-gray-500  group:">
        {" "}
        <IconChevronLeft
          stroke={2}
          className=" group-hover:text-primary-500 group-haver:scale-105 transition:[color,transform] duration-200 "
        />
      </button>
      <button className="absolute z-50 right-5 top-1/2 -translate-y-1/2 size-10 flex justify-center items-center nxt-btn btn rounded-full text-gray-500  group:">
        {" "}
        <IconChevronRight
          stroke={2}
          className=" group-hover:text-primary-500 group-hover:scale-105 transition:[color,transform] duration-200 "
        />
      </button>
    </div>
  );
}
