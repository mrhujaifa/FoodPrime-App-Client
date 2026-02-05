"use client";

import React, { useState, useEffect } from "react";
import { Check, RotateCcw } from "lucide-react";

export type FilterState = {
  cuisines: string[];
  dietary: string[];
  price: string | null;
};

interface FilterSidebarProps {
  onApply: (filters: FilterState) => void;
}

export function FilterSidebarUI({ onApply }: FilterSidebarProps) {
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  // ✅ অটোমেটিক ফিল্টার লজিক: যখনই কোনো স্টেট চেঞ্জ হবে, তখনই onApply কল হবে
  useEffect(() => {
    onApply({
      cuisines: selectedCuisines,
      dietary: selectedDietary,
      price: selectedPrice,
    });
  }, [selectedCuisines, selectedDietary, selectedPrice]); // Dependency array

  const handleCheckboxChange = (
    value: string,
    state: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (state.includes(value)) {
      setter(state.filter((item) => item !== value));
    } else {
      setter([...state, value]);
    }
  };

  const handleReset = () => {
    setSelectedCuisines([]);
    setSelectedDietary([]);
    setSelectedPrice(null);
    // useEffect অটোমেটিক খালি ফিল্টার পাঠিয়ে দেবে
  };

  return (
    <aside className="w-full md:w-72 border-r bg-white p-6 sticky top-40 h-[calc(100vh-160px)] overflow-y-auto scrollbar-hide shadow-sm rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Filter</h2>
        <button
          onClick={handleReset}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      {/* Cuisine Section */}
      <div className="mb-8">
        <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-4">
          Cuisine
        </h3>
        <div className="space-y-3">
          {[
            "Bengali",
            "Indian",
            "Italian",
            "Chinese",
            "Fast Food",
            "Thai",
            "Mexican",
            "Arabic",
            "Continental",
            "Dessert",
          ].map((c) => (
            <label key={c} className="flex items-center group cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCuisines.includes(c)}
                onChange={() =>
                  handleCheckboxChange(c, selectedCuisines, setSelectedCuisines)
                }
                className="peer h-5 w-5 appearance-none rounded border-2 border-gray-200 checked:bg-yellow-300 checked:border-yellow-300 transition-all cursor-pointer"
              />
              <span className="ml-3 text-sm font-medium text-gray-600 group-hover:text-gray-900">
                {c}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Dietary Section */}
      <div className="mb-8">
        <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-4">
          Dietary
        </h3>
        <div className="space-y-3">
          {["Vegetarian", "Vegan", "Halal", "Gluten Free"].map((d) => (
            <label key={d} className="flex items-center group cursor-pointer">
              <input
                type="checkbox"
                checked={selectedDietary.includes(d)}
                onChange={() =>
                  handleCheckboxChange(d, selectedDietary, setSelectedDietary)
                }
                className="peer h-5 w-5 appearance-none rounded border-2 border-gray-200 checked:bg-yellow-300 checked:border-yellow-300 transition-all cursor-pointer"
              />
              <span className="ml-3 text-sm font-medium text-gray-600 group-hover:text-gray-900">
                {d}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Section */}
      <div className="mb-6">
        <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-4">
          Price
        </h3>
        <div className="space-y-3">
          {[
            { label: "Low", value: "Low" },
            { label: "Medium", value: "Medium" },
            { label: "High", value: "High" },
          ].map((p) => (
            <label
              key={p.label}
              className="flex items-center group cursor-pointer"
            >
              <input
                type="radio"
                name="price"
                checked={selectedPrice === p.value}
                onChange={() => setSelectedPrice(p.value)}
                className="peer h-5 w-5 appearance-none rounded-full border-2 border-gray-200 checked:border-yellow-400 checked:bg-yellow-300 cursor-pointer"
              />
              <span className="ml-3 text-sm font-medium text-gray-600 group-hover:text-gray-900">
                {p.label}
              </span>
            </label>
          ))}
        </div>
        <button
          onClick={() => setSelectedPrice(null)}
          className="text-xs font-bold text-yellow-600 mt-4 hover:underline"
        >
          Clear price filter
        </button>
      </div>

      {/* ✅ Apply button আর প্রয়োজন নেই, তাই রিমুভ করে দিয়েছি */}
    </aside>
  );
}
