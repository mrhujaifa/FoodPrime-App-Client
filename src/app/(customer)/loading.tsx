// src/app/(customer)/(root)/loading.tsx
import React from "react";

export default function Loading() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-35 bg-white min-h-screen">
      <div className="flex flex-col md:flex-row gap-8">
        {/* বাম পাশে ফিল্টার সাইডবার স্কেলিটন (আপনার ইমেজ অনুযায়ী) */}
        <div className="w-full md:w-72 flex-shrink-0 border-r border-gray-100 pr-6 space-y-8">
          {/* Filter Title */}
          <div className="h-7 w-20 bg-gray-200 animate-pulse rounded-md" />

          {/* Cuisine, Dietary, Price sections */}
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4 pt-4">
              <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />{" "}
              {/* Section Title */}
              <div className="space-y-3">
                {[...Array(i === 0 ? 6 : 4)].map((_, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className="h-5 w-5 bg-gray-100 animate-pulse rounded border border-gray-200" />{" "}
                    {/* Checkbox */}
                    <div className="h-4 w-32 bg-gray-50 animate-pulse rounded" />{" "}
                    {/* Label */}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ডান পাশে মেইন কন্টেন্ট স্কেলিটন */}
        <div className="flex-1 space-y-8">
          {/* Header Skeleton (Available Meals) */}
          <div className="flex justify-between items-center border-b border-gray-50 pb-4">
            <div className="h-8 w-44 bg-gray-200 animate-pulse rounded-lg" />
            <div className="h-4 w-28 bg-gray-100 animate-pulse rounded" />
          </div>

          {/* বড় সাইনআপ ব্যানার স্কেলিটন */}
          <div className="w-full h-[220px] bg-gray-200 animate-pulse rounded-[2rem] relative overflow-hidden shadow-sm">
            {/* ব্যানার টেক্সট সিমুলেশন */}
            <div className="absolute inset-0 p-10 flex flex-col justify-center space-y-4">
              <div className="h-6 w-1/2 bg-gray-300/50 rounded" />
              <div className="h-6 w-1/3 bg-gray-300/50 rounded" />
              <div className="h-10 w-32 bg-gray-300/80 rounded-full mt-2" />
            </div>
          </div>

          {/* All Restaurants Title */}
          <div className="h-7 w-48 bg-gray-200 animate-pulse rounded-md mt-10" />

          {/* ৩টি কলামের মিল কার্ড গ্রিড (আপনার ইমেজের কার্ড স্টাইল) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                {/* ইমেজ কন্টেইনার স্কেলিটন */}
                <div className="relative h-[200px] w-full bg-gray-200 animate-pulse rounded-[1.5rem] shadow-sm overflow-hidden">
                  {/* ছোট হোমশেফ ব্যাজ স্কেলিটন */}
                  <div className="absolute bottom-3 right-3 h-6 w-16 bg-gray-300 rounded-lg" />
                </div>

                {/* ইনফো সেকশন */}
                <div className="space-y-3 px-1">
                  <div className="flex justify-between items-start">
                    <div className="h-5 w-40 bg-gray-200 animate-pulse rounded" />{" "}
                    {/* Title */}
                    <div className="h-5 w-14 bg-gray-100 animate-pulse rounded-md" />{" "}
                    {/* Rating */}
                  </div>

                  <div className="flex gap-2 items-center">
                    <div className="h-4 w-20 bg-gray-100 animate-pulse rounded" />{" "}
                    {/* Time */}
                    <div className="h-4 w-4 bg-gray-50 rounded-full" />
                    <div className="h-4 w-16 bg-gray-100 animate-pulse rounded" />{" "}
                    {/* Category */}
                  </div>

                  {/* ডেলিভারি ফি লাইন */}
                  <div className="flex items-center gap-2 pt-1">
                    <div className="h-6 w-6 bg-gray-100 animate-pulse rounded-full" />
                    <div className="h-4 w-32 bg-gray-50 animate-pulse rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
