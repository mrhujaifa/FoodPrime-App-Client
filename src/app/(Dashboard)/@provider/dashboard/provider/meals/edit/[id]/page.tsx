"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { Save, Loader2, ArrowLeft, RefreshCcw } from "lucide-react";
import { IMeal, Spicy } from "@/types";
import { providerServices } from "@/services/provider.services";
import {
  getProviderOwnMealAction,
  updateProviderOwnMealAction,
} from "@/actions/provider.action";

export default function EditMealForm() {
  const router = useRouter();
  const params = useParams();
  const mealId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [meal, setMeal] = useState<IMeal | null>(null);

  const [isVeg, setIsVeg] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isBestseller, setIsBestseller] = useState(false);

  useEffect(() => {
    const loadMealData = async () => {
      try {
        setFetching(true);
        const result = await getProviderOwnMealAction();
        if (result.success && result.data) {
          const currentMeal = (result.data as unknown as IMeal[]).find(
            (m) => m.id === mealId,
          );
          if (currentMeal) {
            setMeal(currentMeal);
            setIsVeg(currentMeal.isVeg);
            setIsAvailable(currentMeal.isAvailable);
            setIsBestseller(currentMeal.isBestseller);
          } else {
            toast.error("Meal not found");
          }
        }
      } catch (error) {
        toast.error("Failed to fetch meal details");
      } finally {
        setFetching(false);
      }
    };
    if (mealId) loadMealData();
  }, [mealId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!meal) return;
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      discountPrice: formData.get("discountPrice")
        ? Number(formData.get("discountPrice"))
        : null,
      prepTime: Number(formData.get("prepTime")),
      calories: Number(formData.get("calories")),
      spiciness: formData.get("spiciness") as Spicy,
      isVeg: isVeg,
      isAvailable: isAvailable,
      isBestseller: isBestseller,
    };

    try {
      const result = await updateProviderOwnMealAction(mealId, payload);
      if (result.success) {
        toast.success("Dish updated successfully!");
        router.refresh();
      } else {
        toast.error(result.message || "Update failed");
      }
    } catch (error) {
      toast.error("An error occurred during update");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex h-96 items-center justify-center">
        <RefreshCcw className="animate-spin text-gray-400" size={32} />
      </div>
    );
  }

  if (!meal)
    return <div className="p-10 text-center text-red-500">Meal not found!</div>;

  return (
    <div className="mx-auto max-w-3xl p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <button
            onClick={() => router.back()}
            className="mb-2 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Edit Meal</h1>
          <p className="text-sm text-gray-500">
            Update your dish information and availability.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Meal Name */}
            <div className="col-span-2 space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Meal Name
              </label>
              <input
                name="name"
                defaultValue={meal.name}
                required
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-orange-500 focus:outline-none"
              />
            </div>

            {/* Price */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Price (৳)
              </label>
              <input
                name="price"
                type="number"
                defaultValue={Number(meal.price)}
                required
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-orange-500 focus:outline-none"
              />
            </div>

            {/* Spicy Level */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Spiciness
              </label>
              <select
                name="spiciness"
                defaultValue={meal.spiciness}
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-orange-500 focus:outline-none"
              >
                {Object.values(Spicy).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Prep Time */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Prep Time (Min)
              </label>
              <input
                name="prepTime"
                type="number"
                defaultValue={meal.prepTime || 0}
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-orange-500 focus:outline-none"
              />
            </div>

            {/* Calories */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Calories
              </label>
              <input
                name="calories"
                type="number"
                defaultValue={meal.calories || 0}
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-orange-500 focus:outline-none"
              />
            </div>

            {/* Description */}
            <div className="col-span-2 space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                defaultValue={meal.description}
                rows={4}
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Options / Toggles */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
            Meal Settings
          </h3>
          <div className="flex flex-wrap gap-6">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={isVeg}
                onChange={() => setIsVeg(!isVeg)}
                className="h-4 w-4 accent-orange-600"
              />
              <span className="text-sm text-gray-700">Vegetarian</span>
            </label>

            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={isBestseller}
                onChange={() => setIsBestseller(!isBestseller)}
                className="h-4 w-4 accent-orange-600"
              />
              <span className="text-sm text-gray-700">Bestseller</span>
            </label>

            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={isAvailable}
                onChange={() => setIsAvailable(!isAvailable)}
                className="h-4 w-4 accent-orange-600"
              />
              <span className="text-sm text-gray-700">Available in Stock</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-md border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-md bg-orange-600 px-8 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
