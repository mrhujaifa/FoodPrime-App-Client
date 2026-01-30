"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
// আইকনের জন্য lucide-react ব্যবহার করতে পারেন (অপশনাল)
// import { Edit, Trash2, Plus } from "lucide-react";

interface Meal {
  id: string;
  name: string;
  price: number;
  category: { name: string }; // রিলেশন থেকে আসবে
  isAvailable: boolean;
  imageUrl: string;
}

export default function MealListPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  // এখানে ডাটা ফেচ করার ফাংশন থাকবে
  useEffect(() => {
    // ডেমো ডাটা (পরে এখানে API কল বসাবেন)
    const fetchMeals = async () => {
      try {
        // const res = await fetch('YOUR_API_URL/provider/meals/PROVIDER_ID');
        // const data = await res.json();
        // setMeals(data);

        // ডেমো ডাটা দেখাচ্ছি ডিজাইনের জন্য
        setMeals([
          {
            id: "1",
            name: "Kacchi Biryani",
            price: 450,
            category: { name: "Rice" },
            isAvailable: true,
            imageUrl: "",
          },
          {
            id: "2",
            name: "Beef Tehari",
            price: 220,
            category: { name: "Rice" },
            isAvailable: false,
            imageUrl: "",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Menu</h1>
          <p className="text-gray-500 text-sm">Manage your meals and pricing</p>
        </div>
        <Link
          href="/provider/meals/create"
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition flex items-center gap-2"
        >
          + Add New Meal
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-600">Image</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Name</th>
              <th className="p-4 text-sm font-semibold text-gray-600">
                Category
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600">Price</th>
              <th className="p-4 text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={6} className="p-4 text-center">
                  Loading menu...
                </td>
              </tr>
            ) : (
              meals.map((meal) => (
                <tr key={meal.id} className="hover:bg-gray-50 transition">
                  <td className="p-4">
                    <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-200 relative">
                      <Image
                        src={meal.imageUrl}
                        alt={meal.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="p-4 font-medium text-gray-800">{meal.name}</td>
                  <td className="p-4 text-gray-600 text-sm">
                    {meal.category.name}
                  </td>
                  <td className="p-4 font-semibold text-orange-600">
                    ৳{meal.price}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        meal.isAvailable
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {meal.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button className="text-gray-500 hover:text-blue-600 font-medium text-sm border border-gray-200 px-3 py-1 rounded hover:bg-blue-50 transition">
                      Edit
                    </button>
                    <button className="text-gray-500 hover:text-red-600 font-medium text-sm border border-gray-200 px-3 py-1 rounded hover:bg-red-50 transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Empty State */}
        {!loading && meals.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            You haven added any meals yet.
          </div>
        )}
      </div>
    </div>
  );
}
