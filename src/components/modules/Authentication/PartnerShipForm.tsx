"use client";

import React from "react";
import {
  Store,
  MapPin,
  Utensils,
  Clock,
  DollarSign,
  Image as ImageIcon,
  Camera,
  ArrowRight,
} from "lucide-react";

export default function ProviderPartnershipForm() {
  const brandColor = "#58ac79";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-3xl w-full bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="p-8 border-b border-gray-100 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Become a Partner</h2>
          <p className="text-gray-500 mt-2">
            Fill in the details below to register your restaurant profile.
          </p>
        </div>

        <form className="p-8 md:p-10 space-y-8">
          {/* Section: Basic Information (Prisma: businessName, description) */}
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
                  placeholder="Enter restaurant name"
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  Description (Short Bio)
                </label>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Describe your kitchen and specialties..."
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Section: Logistics (Prisma: cuisineType, deliveryFee, estimatedDeliveryTime, address) */}
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
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:outline-none cursor-pointer"
                >
                  <option value="OTHERS">Select Cuisine</option>
                  <option value="BENGALI">Bengali</option>
                  <option value="INDIAN">Indian</option>
                  <option value="ITALIAN">Italian</option>
                  <option value="CHINESE">Chinese</option>
                  <option value="FAST_FOOD">Fast Food</option>
                  <option value="THAI">Thai</option>
                  <option value="MEXICAN">Mexican</option>
                  <option value="ARABIC">Arabic</option>
                  <option value="CONTINENTAL">Continental</option>
                  <option value="DESSERT">Dessert</option>
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
                    step="0.01"
                    placeholder="0.00"
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:outline-none"
                  />
                  <DollarSign
                    className="absolute left-3 top-3 text-gray-400"
                    size={16}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  Estimated Delivery Time
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="estimatedDeliveryTime"
                    placeholder="e.g. 20-30 mins"
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:outline-none"
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
                    placeholder="Street, City, Zip"
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:outline-none"
                  />
                  <MapPin
                    className="absolute left-3 top-3 text-gray-400"
                    size={16}
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Section: Media (Prisma: logoUrl, coverUrl) */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-4">
              <ImageIcon size={20} style={{ color: brandColor }} />
              <h3 className="text-lg font-semibold text-gray-700">
                Media Assets
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                <Camera className="text-gray-400 mb-2" size={24} />
                <span className="text-sm text-gray-600">Upload Logo</span>
                <p className="text-[10px] text-gray-400 mt-1">
                  Logo URL mapping
                </p>
              </div>
              <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                <ImageIcon className="text-gray-400 mb-2" size={24} />
                <span className="text-sm text-gray-600">Upload Cover</span>
                <p className="text-[10px] text-gray-400 mt-1">
                  Cover URL mapping
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3.5 rounded-lg text-white font-bold text-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2 shadow-md"
              style={{ backgroundColor: brandColor }}
            >
              Complete Registration <ArrowRight size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
