"use client";

import React, { useState } from "react";
import { MealsProviderProfile } from "@/types";
import {
  FilterSidebarUI,
  FilterState,
} from "@/components/layouts/FilterSidebar";
import AllRestaurants from "@/components/modules/Restaurant/AllRestaurants";
import SignUpBanner from "@/components/layouts/signUpBanner";
import { Filter, X, SlidersHorizontal } from "lucide-react";
import { FilterSidebarUIMobile } from "./filter-mobile-sidebar";

interface MealPageContainerProps {
  initialMeals: MealsProviderProfile[];
}

// Loading Skeleton Component
const RightSideSkeleton = () => (
  <div className="animate-pulse w-full">
    <div className="flex justify-between items-center mb-6">
      <div className="space-y-2">
        <div className="h-8 bg-gray-200 rounded-md w-48" />
        <div className="h-4 bg-gray-100 rounded-md w-32" />
      </div>
      <div className="h-6 bg-gray-200 rounded-full w-24" />
    </div>
    <div className="w-full h-32 bg-gray-200 rounded-2xl mb-8" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
        >
          <div className="w-full h-40 bg-gray-200 rounded-xl mb-4" />
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
          <div className="h-4 bg-gray-100 rounded w-1/2 mb-4" />
        </div>
      ))}
    </div>
  </div>
);

export default function MealPageContainer({
  initialMeals,
}: MealPageContainerProps) {
  // --- States ---
  const [filteredMeals, setFilteredMeals] =
    useState<MealsProviderProfile[]>(initialMeals);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false); // Mobile Drawer State

  // --- Filter Logic ---
  const handleFilterApply = (filters: FilterState) => {
    setIsFiltering(true);
    setIsMobileFilterOpen(false); // Filter apply korle Drawer bondho hobe

    setTimeout(() => {
      let result = [...initialMeals];

      // 1. Cuisine Filter
      if (filters.cuisines.length > 0) {
        result = result.filter((meal) => {
          const mealCategory = meal.category?.name || "";
          return filters.cuisines.some(
            (selected) =>
              selected.trim().toLowerCase() ===
              mealCategory.trim().toLowerCase(),
          );
        });
      }

      // 2. Price Filter
      if (filters.price) {
        result = result.filter((meal) => {
          const currentPrice = Number(meal.discountPrice || meal.price);
          if (filters.price === "Low") return currentPrice < 200;
          if (filters.price === "Medium")
            return currentPrice >= 200 && currentPrice <= 500;
          if (filters.price === "High") return currentPrice > 500;
          return true;
        });
      }

      // 3. Dietary Filter
      if (filters.dietary.length > 0) {
        result = result.filter((meal) => {
          if (filters.dietary.includes("Vegetarian") && !meal.isVeg)
            return false;
          return true;
        });
      }

      setFilteredMeals(result);
      setIsFiltering(false);
    }, 450);
  };

  return (
    <div className="max-w-[1400px] mx-auto relative min-h-screen pt-10 lg:pt-0">
      {/* 1. MOBILE STICKY HEADER (With Filter Button) */}

      <div className="md:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3 shadow-sm flex justify-between items-center transition-all">
        <div>
          <h2 className="text-lg font-bold text-gray-800 leading-tight">
            Meals
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            {filteredMeals.length} results
          </p>
        </div>

        {/* Filter Trigger Button */}
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-800 transition active:scale-95 shadow-lg shadow-gray-200"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:mt-6 lg:px-4 md:p-0">
        {/* 2. DESKTOP SIDEBAR (Left Side - Hidden on Mobile) */}

        <div className="hidden md:block w-72 flex-shrink-0 sticky top-24 h-fit">
          <FilterSidebarUI onApply={handleFilterApply} />
        </div>

        {/* 3. MAIN CONTENT AREA (Meals List) */}
        <div className="flex-1">
          {isFiltering ? (
            <RightSideSkeleton />
          ) : (
            <>
              {/* Desktop Header */}
              <div className="hidden md:flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    Available Meals
                  </h1>
                  <p className="text-sm text-gray-500">
                    Discover your favorite food
                  </p>
                </div>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">
                  {filteredMeals.length} Items Found
                </span>
              </div>

              <SignUpBanner />

              <div className="mt-6 md:mt-8">
                {filteredMeals.length > 0 ? (
                  <AllRestaurants mealsData={filteredMeals} />
                ) : (
                  <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
                    <p className="text-gray-400">
                      No meals found matching your filters.
                    </p>
                    <button
                      onClick={() => setFilteredMeals(initialMeals)}
                      className="text-yellow-600 font-bold mt-2 underline"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ========================================= */}
      {/* 4. MOBILE FILTER SIDEBAR DRAWER (Right Side) */}
      {/* ========================================= */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop (Dark Overlay) */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          {/* Drawer Content (Slide from Right) */}
          <div className="absolute inset-y-0 right-0 w-[85%] max-w-[320px] bg-white shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-white">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Filter size={18} className="text-yellow-500 fill-yellow-500" />
                Filter Meals
              </h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 bg-gray-50 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-500 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50">
              {/* Reusing the EXACT SAME Component */}
              <FilterSidebarUIMobile onApply={handleFilterApply} />
            </div>

            {/* Bottom Safe Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold text-sm"
              >
                Close Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
