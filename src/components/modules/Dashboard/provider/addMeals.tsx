"use client";

import { useEffect, useState } from "react";
import { Save, Loader2, Utensils, Clock, Flame } from "lucide-react";
import { toast } from "sonner";

import { mealSchema } from "@/schemas/meal.schema";
import { providerServices } from "@/services/provider.services";
import { MealFormData, Spicy } from "@/types";
import { useUser } from "@/hooks/useSession";

const MealForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { user, isLoading: sessionLoading } = useUser();

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
    providerId: "",
  });

  // User session pawa gele providerId set kora
  useEffect(() => {
    if (user?.id) {
      setFormData((prev) => ({ ...prev, providerId: user.id }));
    }
  }, [user]);

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
        // Form reset logic
        setFormData({
          ...formData,
          name: "",
          description: "",
          price: 0,
          categoryId: "",
        });
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
    <div className="max-w-2xl mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-lg p-6 space-y-6 shadow-sm"
      >
        <div className="border-b pb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Utensils size={20} className="text-orange-500" /> Create New Meal
          </h2>
        </div>

        {/* Meal Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Meal Name *</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter meal name"
            className={`w-full p-2 border rounded focus:ring-1 focus:ring-orange-500 outline-none ${errors.name ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Describe the meal..."
            className={`w-full p-2 border rounded focus:ring-1 focus:ring-orange-500 outline-none ${errors.description ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description}</p>
          )}
        </div>

        {/* Price Section */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Price ($) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Discount Price ($)</label>
            <input
              type="number"
              name="discountPrice"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Category ID */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Category ID *</label>
          <input
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            placeholder="Paste Category UUID"
            className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>

        {/* Spiciness & Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium flex items-center gap-1">
              <Flame size={14} /> Spiciness
            </label>
            <select
              name="spiciness"
              value={formData.spiciness}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded bg-white outline-none focus:ring-1 focus:ring-orange-500"
            >
              {Object.values(Spicy).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium flex items-center gap-1">
              <Clock size={14} /> Prep Time (min)
            </label>
            <input
              type="number"
              name="prepTime"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div className="flex items-center gap-6 pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isVeg}
              onChange={(e) =>
                setFormData({ ...formData, isVeg: e.target.checked })
              }
            />
            <span className="text-sm">Vegetarian</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isBestseller}
              onChange={(e) =>
                setFormData({ ...formData, isBestseller: e.target.checked })
              }
            />
            <span className="text-sm">Bestseller</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || sessionLoading}
          className="w-full bg-orange-600 text-white py-3 rounded font-bold hover:bg-orange-700 disabled:bg-orange-300 transition-colors flex justify-center items-center gap-2"
        >
          {loading || sessionLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Save size={20} />
          )}
          {sessionLoading
            ? "Authenticating..."
            : loading
              ? "Saving..."
              : "Create Meal"}
        </button>
      </form>
    </div>
  );
};

export default MealForm;
