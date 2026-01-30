import React from "react";
import { ArrowLeft, Camera, CheckCircle2, Info, Save, X } from "lucide-react";

const MealForm = () => {
  return (
    <div className="max-w-9xl mx-auto px-6 bg-slate-50 ">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm px-8 py-4 mb-8">
        <div className="max-w-7xl mx-auto">
          {/* Top Row: Breadcrumbs & Meta */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2">
            <span className="hover:text-slate-800 cursor-pointer transition-colors">
              Dashboard
            </span>
            <span className="text-slate-300">/</span>
            <span className="hover:text-slate-800 cursor-pointer transition-colors">
              Menu Management
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-800 font-semibold">New Item</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Left: Title & Back Navigation */}
            <div className="flex items-center gap-4">
              <button className="group p-2 -ml-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
                <ArrowLeft
                  size={20}
                  className="group-hover:-translate-x-1 transition-transform"
                />
              </button>

              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-slate-900 leading-none">
                    Add New Meal
                  </h1>
                  {/* Status Badge */}
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-700 text-[11px] font-bold uppercase tracking-wide">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                    Unpublished
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Actions & Auto-save Status */}
            <div className="flex items-center gap-6">
              {/* Auto-save Indicator (Real world touch) */}
              <span className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <CheckCircle2 size={14} />
                All changes saved
              </span>

              <div className="h-8  bg-slate-200 hidden lg:block"></div>

              <div className="flex items-center gap-3">
                <button className="px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-slate-800 transition shadow-sm">
                  Cancel
                </button>
                <button className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition shadow-md shadow-orange-200">
                  <Save size={16} />
                  Save Meal
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Basic Info & Media */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section: General Info */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">
              General Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Meal Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Spicy Grilled Chicken Pasta"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none border-slate-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe the ingredients, taste, and preparation..."
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none border-slate-300"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Section: Pricing & Inventory */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">
              Pricing & Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Base Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none border-slate-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Discount Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Optional"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none border-slate-300"
                />
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg bg-slate-50">
                <input
                  type="checkbox"
                  id="available"
                  className="w-5 h-5 accent-orange-600"
                  defaultChecked
                />
                <label
                  htmlFor="available"
                  className="text-sm font-medium text-slate-700"
                >
                  Currently Available
                </label>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg bg-slate-50">
                <input
                  type="checkbox"
                  id="bestseller"
                  className="w-5 h-5 accent-orange-600"
                />
                <label
                  htmlFor="bestseller"
                  className="text-sm font-medium text-slate-700"
                >
                  Mark as Bestseller
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Meta Data & Categories */}
        <div className="space-y-6">
          {/* Image Upload Placeholder */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold mb-4">Meal Image</h2>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 hover:border-orange-400 transition cursor-pointer">
              <Camera size={40} className="mb-2 text-slate-400" />
              <p className="text-xs text-center">
                Click to upload or drag and drop JPG, PNG (Max 5MB)
              </p>
            </div>
          </div>

          {/* Classification */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold mb-4">Categorization</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Category
                </label>
                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none border-slate-300">
                  <option>Select Category</option>
                  <option>Main Course</option>
                  <option>Appetizers</option>
                  <option>Desserts</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Spiciness Level
                </label>
                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none border-slate-300">
                  <option value="NONE">None</option>
                  <option value="MILD">Mild</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HOT">Hot</option>
                  <option value="EXTRA_HOT">Extra Hot</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm font-medium text-slate-700">
                  Vegetarian?
                </span>
                <button className="w-12 h-6 bg-slate-200 rounded-full relative shadow-inner">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition shadow-sm"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Nutrition & Prep */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold mb-4">Logistics</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Prep Time (min)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border rounded-lg mt-1"
                    placeholder="20"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Calories
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border rounded-lg mt-1"
                    placeholder="450"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealForm;
