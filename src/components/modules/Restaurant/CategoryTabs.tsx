"use client";
import { useState } from "react";

// Interface update koro jate Object accept kore
interface Category {
  id: string;
  name: string;
  image?: string;
}

export const CategoryTabs = ({ categories }: { categories: Category[] }) => {
  // Default active tab prothom category-r name hobe
  const [activeTab, setActiveTab] = useState(categories[0]?.name || "");

  return (
    <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
      {categories?.map((category) => (
        <button
          key={category.id} // Object er ID use koro
          onClick={() => setActiveTab(category.name)}
          className={`py-5 text-sm font-black uppercase tracking-widest relative whitespace-nowrap transition-all ${
            activeTab === category.name
              ? "text-yellow-600"
              : "text-gray-400 hover:text-black"
          }`}
        >
          {/* Ekhane category render na kore category.name dite hobe */}
          {category.name}

          {activeTab === category.name && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400" />
          )}
        </button>
      ))}
    </div>
  );
};
