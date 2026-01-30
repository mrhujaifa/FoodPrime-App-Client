"use client";

import { useEffect, useState } from "react";
import { Save, Loader2, Utensils, Clock, Flame } from "lucide-react";
import { toast } from "sonner";

import { mealSchema } from "@/schemas/meal.schema";
import { providerServices } from "@/services/provider.services";
import { MealFormData, Spicy } from "@/types";
import { getSessionAction } from "@/actions/user.actions";

const MealForm = () => {
  const [loading, setLoading] = useState(false);
  const [isSessionLoading, setIsSessionLoading] = useState(true); // সেশন লোডিং স্টেট
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<MealFormData>({
    name: "",
    description: "",
    price: 0,
    discountPrice: null,
    imageUrl: "https://example.com/default.jpg",
    isAvailable: true,
    isVeg: false,
    spiciness: Spicy.MEDIUM,
    isBestseller: false,
    prepTime: null,
    calories: null,
    categoryId: "",
    providerId: "", // এটি আসলে userId হিসেবে কাজ করবে
  });

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const result = await getSessionAction();
        // আপনার অবজেক্ট স্ট্রাকচার অনুযায়ী: result.data.session.userId
        const userId = result?.data?.session?.userId || result?.data?.user?.id;

        if (userId) {
          setFormData((prev) => ({ ...prev, providerId: userId }));
        } else {
          toast.error("You must be logged in to create a meal.");
        }
      } catch (err) {
        toast.error("Failed to load session.");
      } finally {
        setIsSessionLoading(false); // লোডিং শেষ
      }
    };
    fetchSession();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === "number" ? (value === "" ? null : parseFloat(value)) : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.providerId) {
      toast.error("Identity not verified. Please refresh.");
      return;
    }

    setLoading(true);
    setErrors({});

    const result = mealSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    try {
      const res = await providerServices.createMeal(result.data);
      if (res.success) {
        toast.success("Meal created successfully!");

        e.currentTarget.dispatchEvent(new Event("reset"));
      } else {
        toast.error(res.message || "Failed to create meal");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto p-6 space-y-8 bg-white shadow-md rounded-xl"
    >
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
          <Utensils className="text-orange-500" /> Create New Meal
        </h2>
        <button
          type="submit"
          disabled={loading || isSessionLoading}
          className="flex items-center gap-2 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 disabled:bg-orange-300 transition-all"
        >
          {isSessionLoading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : loading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Save size={18} />
          )}
          {isSessionLoading
            ? "Authenticating..."
            : loading
              ? "Saving..."
              : "Save Meal"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Meal Name *
            </label>
            <input
              name="name"
              placeholder="e.g. Pasta Carbonara"
              onChange={handleChange}
              className={`w-full p-2 border rounded-md outline-none focus:ring-2 ${errors.name ? "border-red-500 focus:ring-red-200" : "focus:ring-orange-200"}`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Description *
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="Detailed description..."
              onChange={handleChange}
              className={`w-full p-2 border rounded-md outline-none focus:ring-2 ${errors.description ? "border-red-500 focus:ring-red-200" : "focus:ring-orange-200"}`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                step="0.01"
                onChange={handleChange}
                className={`w-full p-2 border rounded-md outline-none focus:ring-2 ${errors.price ? "border-red-500" : "focus:ring-orange-200"}`}
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">{errors.price}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Discount Price
              </label>
              <input
                type="number"
                name="discountPrice"
                step="0.01"
                onChange={handleChange}
                className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-200"
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1 flex items-center gap-1">
                <Clock size={14} /> Prep (min)
              </label>
              <input
                type="number"
                name="prepTime"
                onChange={handleChange}
                className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-200"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Calories
              </label>
              <input
                type="number"
                name="calories"
                onChange={handleChange}
                className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 flex items-center gap-1">
              <Flame size={14} className="text-red-500" /> Spiciness
            </label>
            <select
              name="spiciness"
              value={formData.spiciness}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-white outline-none focus:ring-2 focus:ring-orange-200"
            >
              {Object.values(Spicy).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Category ID *
            </label>
            <input
              name="categoryId"
              placeholder="UUID of Category"
              onChange={handleChange}
              className={`w-full p-2 border rounded-md outline-none focus:ring-2 ${errors.categoryId ? "border-red-500" : "focus:ring-orange-200"}`}
            />
            {errors.categoryId && (
              <p className="text-red-500 text-xs mt-1">{errors.categoryId}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {(["isVeg", "isBestseller", "isAvailable"] as const).map((key) => (
              <label
                key={key}
                className={`flex items-center gap-2 cursor-pointer px-4 py-1.5 rounded-full border transition-all ${formData[key] ? "bg-orange-50 border-orange-500 text-orange-700" : "bg-gray-50 border-gray-200 text-gray-600"}`}
              >
                <input
                  type="checkbox"
                  checked={formData[key]}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [key]: e.target.checked,
                    }))
                  }
                  className="hidden"
                />
                <span className="text-sm font-medium">
                  {key === "isVeg"
                    ? "Veg"
                    : key === "isBestseller"
                      ? "Bestseller"
                      : "Available"}
                </span>
              </label>
            ))}
          </div>
        </section>
      </div>
    </form>
  );
};

export default MealForm;
