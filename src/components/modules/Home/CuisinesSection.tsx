"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import { Category } from "@/types";

export default function CuisinesSlider({
  categories,
}: {
  categories: Category[];
}) {
  const cuisines = categories.slice(0, 10); // Limiting to first 10 categories for the slider
  return (
    <section className="w-full  py-6 md:py-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-[26px] font-bold text-[#1f1f1f] mb-8">Cuisines</h1>

        <div className="relative">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".cuisines-next",
              prevEl: ".cuisines-prev",
            }}
            spaceBetween={18}
            slidesPerView={2.2}
            breakpoints={{
              480: {
                slidesPerView: 3.2,
              },
              640: {
                slidesPerView: 4.2,
              },
              768: {
                slidesPerView: 5.2,
              },
              1024: {
                slidesPerView: 7.2,
              },
              1280: {
                slidesPerView: 8,
              },
            }}
            className="pr-16"
          >
            {cuisines.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="group flex flex-col items-center">
                  <div className="relative h-[96px] w-[96px] overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-[1.03]">
                    <Image
                      src={item.image || "/default-cuisine-image.jpg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>

                  <h3 className="mt-3 text-center text-[18px] font-medium text-gray-700">
                    {item.name}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            className="cuisines-next absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-md transition hover:scale-105"
            aria-label="Next"
          >
            <ArrowRight className="h-5 w-5" />
          </button>

          <button
            type="button"
            className="cuisines-prev absolute left-0 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-md transition hover:scale-105"
            aria-label="Previous"
          >
            <ArrowRight className="h-5 w-5 rotate-180" />
          </button>
        </div>
      </div>
    </section>
  );
}
