"use client";

import { useState } from "react";

interface Category {
  id: string;
  name: string;
  image?: string;
}

interface CategoryTabsProps {
  categories?: Category[];
}

export const CategoryTabs = ({ categories = [] }: CategoryTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(categories[0]?.name || "");

  if (!categories.length) {
    return null;
  }

  return (
    <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setActiveTab(category.name)}
          className={`py-5 text-sm font-black uppercase tracking-widest relative whitespace-nowrap transition-all ${
            activeTab === category.name
              ? "text-yellow-600"
              : "text-gray-400 hover:text-black"
          }`}
        >
          {category.name}

          {activeTab === category.name && (
            <div className="absolute bottom-0 left-0 h-1 w-full bg-yellow-400" />
          )}
        </button>
      ))}
    </div>
  );
};
