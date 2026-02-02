"use client";
import { cartServices } from "@/services/cart.service";
import { Meal } from "@/types";
import { Plus, Star, ShoppingBag, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface MenuCardProps {
  meal: Meal;
}

export const MenuCard = ({ meal }: MenuCardProps) => {
  const [loading, setLoading] = useState(false);
  const item = meal;

  const id = meal.id;

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      // Amader banano fetch service call
      await cartServices.addToCart(id, 1);

      // Icche korle ekhane Cart Sidebar-ke auto open korar logic dewa jay
    } catch (error) {
      console.error("Cart error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="group relative bg-white hover:bg-[#FDFDFD] rounded-[24px] p-3 border border-gray-100 hover:border-yellow-200 transition-all duration-500 flex items-center gap-5 w-full max-w-lg h-40 shadow-sm hover:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.08)]">
      {/* 1. Enhanced Image Section */}
      <div className="relative w-36 h-32 shrink-0 rounded-[20px] overflow-hidden shadow-sm">
        <Image
          src={
            item?.imageUrl ||
            "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=1000"
          }
          alt="food dish"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Subtle Dark Gradient for text overlay compatibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* 2. Content Section with Better Spacing */}
      <div className="flex-1 flex flex-col justify-between py-1 h-full pr-1">
        <div className="space-y-1.5">
          <div className="flex justify-between items-start">
            <h4 className="text-base font-black text-gray-800 line-clamp-1 group-hover:text-yellow-600 transition-colors tracking-tight">
              {item?.name || "Basmati Mutton Kacchi"}
            </h4>
          </div>
          <p className="text-[11px] font-medium text-gray-500 line-clamp-3 leading-relaxed">
            {item?.description ||
              "Slow-cooked aromatic basmati rice with tender mutton pieces and our signature secret spices blend."}
          </p>
        </div>

        {/* 3. Pricing & Rating Footer */}
        <div className="flex items-end justify-between mt-auto">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 bg-gray-50 w-fit px-2 py-0.5 rounded-full border border-gray-100">
              <Star size={10} fill="#FACC15" className="text-yellow-500" />
              <span className="text-[10px] font-black text-gray-600">4.8</span>
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-xs font-bold text-yellow-600">৳</span>
              <span className="text-xl font-black text-gray-900 tracking-tighter">
                {item?.price || "450"}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleAddToCart}
            disabled={loading}
            className={`group/btn h-10 w-10 bg-yellow-400 text-black rounded-xl flex items-center justify-center shadow-[0_4px_12px_rgba(250,204,21,0.3)] 
        ${!loading ? "hover:bg-black hover:text-yellow-400 transform hover:scale-105 active:scale-95" : "opacity-70 cursor-not-allowed"} 
        transition-all duration-300`}
          >
            {loading ? (
              <Loader2
                size={18}
                strokeWidth={3}
                className="animate-spin text-black"
              />
            ) : (
              <Plus
                size={20}
                strokeWidth={3}
                className="group-hover/btn:rotate-90 transition-transform duration-300"
              />
            )}
          </button>
        </div>
      </div>

      {/* Floating Badge */}
      <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
        {
          <div className="bg-yellow-300 text-gray-600 text-[9px] font-black px-2.5 py-1 rounded-full shadow-lg">
            NEW
          </div>
        }
      </div>
    </div>
  );
};
