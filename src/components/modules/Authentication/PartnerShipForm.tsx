"use client";

import React, { useState } from "react";
import {
  Store,
  MapPin,
  Utensils,
  Clock,
  DollarSign,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { PartnerShipSchema } from "@/schemas/provider.schema";
import { providerServices } from "@/services/provider.services";
import { ICreateProviderProfile } from "@/types/provider/providerProfile";

export default function ProviderPartnershipForm() {
  const brandColor = "#58ac79";

  const [formData, setFormData] = useState({
    businessName: "",
    description: "",
    cuisineType: "OTHERS",
    deliveryFee: "",
    estimatedDeliveryTime: "",
    address: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const payload = {
      ...formData,
      deliveryFee: parseFloat(formData.deliveryFee) || 0,
    };

    const validation = PartnerShipSchema.safeParse(payload);
    if (!validation.success) {
      const formattedErrors: Record<string, string> = {};
      validation.error.issues.forEach((err) => {
        if (err.path[0]) formattedErrors[err.path[0] as string] = err.message;
      });
      setErrors(formattedErrors);
      toast.error("Please fix the validation errors");
      return;
    }

    setLoading(true);
    try {
      const response = await providerServices.createProviderProfile(
        validation.data as ICreateProviderProfile,
      );

      if (response.success) {
        toast.success(response.message || "Registration successful!");
        setFormData({
          businessName: "",
          description: "",
          cuisineType: "OTHERS",
          deliveryFee: "",
          estimatedDeliveryTime: "",
          address: "",
        });
      } else {
        toast.error(response.message || "Something went wrong");
        if (response.errors) {
          setErrors(response.errors as Record<string, string[]>);
        }
      }
    } catch (error) {
      toast.error("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-3xl w-full bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
        <div className="p-8 border-b border-gray-100 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Become a Partner</h2>
          <p className="text-gray-500 mt-2">
            Register your restaurant profile.
          </p>
        </div>

        <form
          onSubmit={handleCompleteRegistration}
          className="p-8 md:p-10 space-y-8"
        >
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-4">
              <Store size={20} style={{ color: brandColor }} />
              <h3 className="text-lg font-semibold text-gray-700">
                Business Information
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  Business Name
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Enter restaurant name"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none ${errors.businessName ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.businessName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.businessName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe your kitchen..."
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none ${errors.description ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-4">
              <Utensils size={20} style={{ color: brandColor }} />
              <h3 className="text-lg font-semibold text-gray-700">
                Cuisine & Delivery
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  Cuisine Type
                </label>
                <select
                  name="cuisineType"
                  value={formData.cuisineType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:outline-none cursor-pointer"
                >
                  <option value="BENGALI">Bengali</option>
                  <option value="INDIAN">Indian</option>
                  <option value="ITALIAN">Italian</option>
                  <option value="CHINESE">Chinese</option>
                  <option value="OTHERS">Others</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  Delivery Fee (USD)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="deliveryFee"
                    value={formData.deliveryFee}
                    onChange={handleChange}
                    step="0.01"
                    placeholder="0.00"
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none"
                  />
                  <DollarSign
                    className="absolute left-3 top-3 text-gray-400"
                    size={16}
                  />
                </div>
                {errors.deliveryFee && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.deliveryFee}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  Delivery Time
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="estimatedDeliveryTime"
                    value={formData.estimatedDeliveryTime}
                    onChange={handleChange}
                    placeholder="e.g. 20-30 mins"
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none"
                  />
                  <Clock
                    className="absolute left-3 top-3 text-gray-400"
                    size={16}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  Business Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street, City, Zip"
                    className={`w-full pl-9 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none ${errors.address ? "border-red-500" : "border-gray-300"}`}
                  />
                  <MapPin
                    className="absolute left-3 top-3 text-gray-400"
                    size={16}
                  />
                </div>
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg text-white font-bold text-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2 shadow-md hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ backgroundColor: brandColor }}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Processing...
                </>
              ) : (
                <>
                  Complete Registration <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
