"use client";

import React, { useState, useEffect } from "react";
import { MealsProviderProfile } from "@/types";
import {
  FilterSidebarUI,
  FilterState,
} from "@/components/layouts/FilterSidebar";
import AllRestaurants from "@/components/modules/Restaurant/AllRestaurants";
import SignUpBanner from "@/components/layouts/signUpBanner";

interface MealPageContainerProps {
  initialMeals: MealsProviderProfile[];
}

const RightSideSkeleton = () => (
  <div className="animate-pulse w-full">
    {/* Header Placeholder */}
    <div className="flex justify-between items-center mb-6">
      <div className="space-y-2">
        <div className="h-8 bg-gray-200 rounded-md w-48" />
        <div className="h-4 bg-gray-100 rounded-md w-32" />
      </div>
      <div className="h-6 bg-gray-200 rounded-full w-24" />
    </div>

    {/* Banner Placeholder */}
    <div className="w-full h-32 bg-gray-200 rounded-2xl mb-8" />

    {/* Grid Placeholder for Meal Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
        >
          <div className="w-full h-40 bg-gray-200 rounded-xl mb-4" />
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
          <div className="h-4 bg-gray-100 rounded w-1/2 mb-4" />
          <div className="flex justify-between items-center">
            <div className="h-6 bg-gray-200 rounded w-16" />
            <div className="h-8 bg-gray-200 rounded w-20" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function MealPageContainer({
  initialMeals,
}: MealPageContainerProps) {
  // States for managing filtered data and loading status
  const [filteredMeals, setFilteredMeals] =
    useState<MealsProviderProfile[]>(initialMeals);
  const [isFiltering, setIsFiltering] = useState(false);

  /**
   * Core filtering function that processes cuisine, price, and dietary logic
   */
  const handleFilterApply = (filters: FilterState) => {
    setIsFiltering(true); // Trigger skeleton loading

    setTimeout(() => {
      let result = [...initialMeals];

      // 1. Filter by Cuisine/Category name
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

      // 2. Filter by Price Ranges (Low, Medium, High)
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

      // 3. Filter by Dietary preferences (e.g., Vegetarian)
      if (filters.dietary.length > 0) {
        result = result.filter((meal) => {
          if (filters.dietary.includes("Vegetarian") && !meal.isVeg)
            return false;
          return true;
        });
      }

      setFilteredMeals(result);
      setIsFiltering(false); // Disable loading state
    }, 450);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-[1400px] mx-auto">
      {/* Sidebar Section for user inputs */}
      <div className="w-full md:w-72 flex-shrink-0">
        <FilterSidebarUI onApply={handleFilterApply} />
      </div>

      {/* Main Display Area */}
      <div className="flex-1 min-h-[600px]">
        {isFiltering ? (
          <RightSideSkeleton /> // Display placeholders during filter processing
        ) : (
          <>
            {/* Header section with result count */}
            <div className="flex justify-between items-center mb-6">
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

            {/* List of meals or empty state message */}
            <div className="mt-8">
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
  );
}
