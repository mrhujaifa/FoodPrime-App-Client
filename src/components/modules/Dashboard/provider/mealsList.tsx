"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Edit, Trash2, Plus, Utensils, RefreshCcw } from "lucide-react";
import { toast } from "sonner"; // অথবা আপনার পছন্দের টোস্ট লাইব্রেরি

// আপনার মডেল অনুযায়ী ইন্টারফেস
interface Meal {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  category: { name: string };
  isAvailable: boolean;
  imageUrl: string | null;
  providerId: string;
}

export default function MealListPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  // ১. এপিআই ফেচ ফাংশন
  const fetchProviderMeals = async () => {
    setLoading(true);
    try {
      const url = `http://localhost:8080/api/provider/own-meals`;
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        cache: "no-store",
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMeals(result.data); // result.data এখন আপনার Meal[]
      } else {
        toast.error(result.message || "Failed to load meals");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Internal server error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviderMeals();
  }, []);

  // ২. স্ট্যাটাস আপডেট লজিক (রিয়েল এপিআই কল এখানে করবেন)
  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      // এপিআই কল দিয়ে সার্ভারে স্ট্যাটাস আপডেট করবেন (প্যাচ/পুট মেথড)
      // আপাতত লোকাল স্টেট আপডেট দেখাচ্ছি:
      setMeals((prev) =>
        prev.map((meal) =>
          meal.id === id ? { ...meal, isAvailable: !currentStatus } : meal,
        ),
      );
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Menu</h1>
            <p className="text-gray-500 text-sm">
              Manage your {meals.length} delicious items
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

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/50 border-b border-gray-200">
                <tr>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Item Details
                  </th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Category
                  </th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Price
                  </th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Availability
                  </th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  // সিম্পল লোডিং স্টেট
                  <tr>
                    <td colSpan={5} className="p-20 text-center text-gray-400">
                      <div className="flex flex-col items-center gap-2">
                        <RefreshCcw className="animate-spin text-orange-500" />
                        Fetching your menu...
                      </div>
                    </td>
                  </tr>
                ) : meals.length > 0 ? (
                  meals.map((meal) => (
                    <tr
                      key={meal.id}
                      className="hover:bg-gray-50/80 transition-colors group"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-14 rounded-xl overflow-hidden bg-gray-100 relative border border-gray-100">
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
                        <button
                          onClick={() =>
                            toggleStatus(meal.id, meal.isAvailable)
                          }
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-bold transition-all border ${
                            meal.isAvailable
                              ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                              : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full mr-2 ${meal.isAvailable ? "bg-green-600 animate-pulse" : "bg-red-600"}`}
                          ></span>
                          {meal.isAvailable ? "Available" : "Unavailable"}
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-3">
                          <Link
                            href={`/provider/meals/edit/${meal.id}`}
                            className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all border border-blue-100 shadow-sm"
                            title="Edit Item"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all border border-red-100 shadow-sm"
                            title="Delete Item"
                            onClick={() => alert("Confirm Delete?")}
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
                      <div className="flex flex-col items-center justify-center">
                        <Utensils size={40} className="text-gray-200 mb-2" />
                        <p className="text-gray-500 font-medium">
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
