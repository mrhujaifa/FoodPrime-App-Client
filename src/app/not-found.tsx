"use client";
import Link from "next/link";
import { Utensils, Home, ArrowLeft, Search } from "lucide-react";
import SecNavbar from "@/components/layouts/HeaderNav";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-900 flex flex-col">
      <SecNavbar />

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full text-center">
          {/* Visual Element */}
          <div className="relative mb-8 flex justify-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-50" />
            <div className="relative">
              <h1 className="text-[150px] font-black text-gray-100 leading-none select-none">
                404
              </h1>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 rotate-12 hover:rotate-0 transition-transform duration-500">
                  <Utensils size={64} className="text-yellow-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <h2 className="text-3xl font-bold mb-4 tracking-tight">
            Oops! This plate is empty.
          </h2>
          <p className="text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
            The page you are looking for has been moved, deleted, or perhaps it
            was so delicious that someone ate it!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto bg-yellow-300 text-black/80 px-8 py-3.5 rounded-xl font-medium text-sm hover:bg-yellow-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/5"
            >
              <Home size={18} />
              Back to Home
            </Link>

            <Link
              href="/menu"
              className="w-full sm:w-auto bg-yellow-300 border border-gray-200 text-gray-700 px-8 py-3.5 rounded-xl font-medium text-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              <Search size={18} />
              Browse Menu
            </Link>
          </div>

          {/* Quick Support Link */}
          <p className="mt-12 text-sm text-gray-400">
            Need help?{" "}
            <Link
              href="/contact"
              className="text-yellow-600 font-semibold hover:underline"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>

      {/* Decorative Food Icons (Optional) */}
      <div className="hidden lg:block">
        <div className="absolute top-40 left-20 animate-bounce transition-all duration-1000 opacity-20 text-gray-400">
          🍕
        </div>
        <div className="absolute bottom-40 right-20 animate-pulse opacity-20 text-gray-400">
          🍔
        </div>
        <div className="absolute top-60 right-40 rotate-45 opacity-20 text-gray-400">
          🥗
        </div>
      </div>
    </div>
  );
}
