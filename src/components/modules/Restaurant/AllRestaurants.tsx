"use client";

import React, { useState } from "react";
import { Star, Bike, Tag, Clock, Flame } from "lucide-react";
import { MealsProviderProfile } from "@/types";
import Link from "next/link";

interface AllRestaurantsProps {
  mealsData: MealsProviderProfile[];
}
const AllRestaurants = ({ mealsData }: AllRestaurantsProps) => {
  const [meals, setMeals] = useState(mealsData);

  const getDiscountPercent = (
    price: string | number,
    discountPrice?: string | number,
  ) => {
    if (!discountPrice) return null;
    const p = Number(price);
    const d = Number(discountPrice);
    if (p <= d) return null;
    return Math.round(((p - d) / p) * 100);
  };

  if (!mealsData || mealsData.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
        <h3 className="text-lg font-bold text-gray-700">
          No Restaurants Available
        </h3>
        <p className="text-gray-500">
          We couldnt find any meals in your area right now.
        </p>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="text-center py-20">
  //       <p className="text-red-500 font-semibold">{error}</p>
  //       <button
  //         onClick={() => window.location.reload()}
  //         className="mt-4 px-4 py-2 bg-[#D70F64] text-white rounded-lg"
  //       >
  //         Try Again
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans bg-white">
      <h1 className="text-[26px] font-bold text-[#1f1f1f] mb-8">
        All restaurants
      </h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {meals.map((meal) => {
          const discountPercent = getDiscountPercent(meal.price);

          return (
            <Link key={meal.id} href={`/restaurant/${meal.providerId}`}>
              <div className="group cursor-pointer flex flex-col">
                {/* Image Container */}
                <div className="relative h-[200px] w-full rounded-2xl overflow-hidden shadow-sm">
                  <img
                    src={meal.imageUrl}
                    alt={meal.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Pink Discount Badge */}
                  {discountPercent && (
                    <div className="absolute top-4 left-0 bg-[#D70F64] text-white text-[12px] font-bold px-3 py-1 rounded-r-full flex items-center gap-1 shadow-md">
                      <Tag size={13} fill="white" />
                      {discountPercent}% OFF
                    </div>
                  )}

                  {/* Bestseller/Hot Badge */}
                  {meal.isBestseller && (
                    <div className="absolute top-4 right-3 bg-yellow-300 text-gray-600 text-[10px]  px-2 py-1 rounded-md flex items-center gap-1">
                      <Flame size={12} className="text-gray-600" />
                      BESTSELLER
                    </div>
                  )}

                  {/* Provider Logo / HomeChef Style Badge */}
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg border border-gray-100 flex items-center gap-1">
                    <span className="text-yellow-300 font-black text-[10px] tracking-tighter italic">
                      HomeChef
                    </span>
                  </div>
                </div>

                {/* Info Section */}
                <div className="mt-3">
                  {/* Restaurant Name & Rating */}
                  <div className="flex justify-between items-start">
                    <h3 className="text-[17px] font-bold text-[#1f1f1f] leading-tight truncate pr-2">
                      {meal.provider.businessName}
                    </h3>
                    <div className="flex items-center gap-1 shrink-0 bg-gray-50 px-1.5 py-0.5 rounded">
                      <Star
                        size={14}
                        fill="#ff8a00"
                        className="text-[#ff8a00]"
                      />
                      <span className="font-bold text-sm text-[#1f1f1f]">
                        {meal.provider.rating > 0
                          ? meal.provider.rating
                          : "New"}
                      </span>
                      <span className="text-gray-400 text-xs font-normal">
                        (50+)
                      </span>
                    </div>
                  </div>

                  {/* Delivery Time & Category */}
                  <div className="text-[#707070] text-[14px] mt-1 flex items-center gap-1 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {meal.provider.estimatedDeliveryTime}
                    </span>
                    <span>•</span>
                    <span className="font-medium tracking-tight">
                      ৳ {meal.discountPrice || meal.price}
                    </span>
                    <span>•</span>
                    <span className="truncate">Local Cuisine</span>
                  </div>

                  {/* Delivery Fee Section */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="p-1 bg-yellow-300/10 rounded-full">
                      <Bike size={14} className="text-yellow-300" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">
                      Tk 45{" "}
                      <span className="text-gray-400 font-normal">
                        delivery fee
                      </span>
                    </span>
                  </div>

                  {/* Meal Name (Subtitle) */}
                  <p className="mt-2 text-xs text-gray-400 font-medium italic truncate">
                    Featured: {meal.name}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AllRestaurants;
