"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Edit, Trash2, Plus, Utensils } from "lucide-react";
import { toast } from "sonner";
import { providerServices } from "@/services/provider.services";
import { providerOwnMeal } from "@/types";

interface Props {
  initialMeals: providerOwnMeal[];
}

export default function MealListPage({ initialMeals }: Props) {
  const [meals, setMeals] = useState<providerOwnMeal[]>(initialMeals);

  useEffect(() => {
    setMeals(initialMeals);
  }, [initialMeals]);

  const handleDeleteMenuItem = async (mealId: string) => {
    const isConfirmed = confirm("are you sure delete Meal");
    if (!isConfirmed) return;

    try {
      const result = await providerServices.deleteOwnMeals(mealId);

      if (result.success) {
        setMeals((prev) => prev.filter((meal) => meal.id !== mealId));
        toast.success("Meal Deleted Successfull!");
      } else {
        toast.error(result.message || "এই খাবারটি ডিলিট করা সম্ভব নয়।");
      }
    } catch (error) {
      toast.error("সার্ভার এরর! পরে চেষ্টা করুন।");
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Menu</h1>
            <p className="text-gray-500 text-sm">
              Manage your{" "}
              <span className="font-semibold text-orange-600">
                {meals?.length || 0}
              </span>{" "}
              items
            </p>
          </div>
          <Link
            href="/provider/meals/create"
            className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-sm shadow-orange-200"
          >
            <Plus size={18} />
            Add New Meal
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/50 border-b border-gray-200">
                <tr className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                  <th className="p-4">Item Details</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Availability</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {meals && meals.length > 0 ? (
                  meals.map((meal) => (
                    <tr
                      key={meal.id}
                      className="hover:bg-gray-50/80 transition-colors group"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-14 rounded-xl overflow-hidden bg-gray-100 relative border border-gray-100 shadow-inner">
                            {meal.imageUrl ? (
                              <Image
                                src={meal.imageUrl}
                                alt={meal.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <Utensils size={20} />
                              </div>
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-gray-900 block leading-tight">
                              {meal.name}
                            </span>
                            <span className="text-[10px] text-gray-400 uppercase tracking-tighter">
                              ID: {meal.id.slice(0, 8)}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-gray-600 text-sm bg-gray-100 px-2.5 py-1 rounded-md font-medium border border-gray-200">
                          {meal.category?.name || "Uncategorized"}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-gray-900">
                        {meal.discountPrice ? (
                          <div className="flex flex-col">
                            <span className="text-orange-600 font-extrabold">
                              ৳{Number(meal.discountPrice)}
                            </span>
                            <span className="text-xs text-gray-400 line-through font-normal">
                              ৳{Number(meal.price)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-900 font-extrabold">
                            ৳{Number(meal.price)}
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-bold transition-all border ${
                            meal.isAvailable
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-red-50 text-red-700 border-red-200"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full mr-2 ${meal.isAvailable ? "bg-green-600 animate-pulse" : "bg-red-600"}`}
                          ></span>
                          {meal.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link
                            href={`/dashboard/provider/meals/edit/${meal.id}`}
                            className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all border border-blue-100 shadow-sm"
                            title="Edit Item"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDeleteMenuItem(meal.id)}
                            className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all border border-red-100 shadow-sm"
                            title="Delete Item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-20 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="p-4 bg-gray-100 rounded-full text-gray-300">
                          <Utensils size={40} />
                        </div>
                        <p className="text-gray-500 font-medium italic">
                          No meals found in your menu.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
