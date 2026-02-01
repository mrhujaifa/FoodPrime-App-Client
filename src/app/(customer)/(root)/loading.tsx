// src/app/(customer)/(root)/loading.tsx
import React from "react";

export default function Loading() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-35">
      <div className="flex flex-col md:flex-row gap-8">
        {/* বাম পাশে ফিল্টার সাইডবার স্কেলিটন */}
        <div className="w-full md:w-72 flex-shrink-0 space-y-8">
          <div className="h-8 w-24 bg-gray-200 animate-pulse rounded" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="h-5 w-20 bg-gray-100 animate-pulse rounded" />
              {[...Array(4)].map((_, j) => (
                <div key={j} className="flex items-center gap-3">
                  <div className="h-4 w-4 bg-gray-100 animate-pulse rounded" />
                  <div className="h-4 w-32 bg-gray-50 animate-pulse rounded" />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ডান পাশে মেইন কন্টেন্ট স্কেলিটন */}
        <div className="flex-1 space-y-10">
          {/* হেডার স্কেলিটন */}
          <div className="flex justify-between items-center">
            <div className="h-8 w-48 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-24 bg-gray-100 animate-pulse rounded" />
          </div>

          {/* সাইনআপ ব্যানার স্কেলিটন */}
          <div className="w-full h-[200px] bg-gray-200 animate-pulse rounded-3xl" />

          {/* অল রেস্টুরেন্ট টাইটেল */}
          <div className="h-7 w-40 bg-gray-200 animate-pulse rounded" />

          {/* মিল কার্ড গ্রিড স্কেলিটন */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                {/* ইমেজ কন্টেইনার */}
                <div className="h-[200px] w-full bg-gray-200 animate-pulse rounded-2xl shadow-sm" />

                {/* টেক্সট কন্টেন্ট */}
                <div className="space-y-3 px-1">
                  <div className="flex justify-between">
                    <div className="h-5 w-32 bg-gray-200 animate-pulse rounded" />
                    <div className="h-5 w-12 bg-gray-100 animate-pulse rounded" />
                  </div>
                  <div className="h-4 w-48 bg-gray-100 animate-pulse rounded" />
                  <div className="h-4 w-32 bg-gray-50 animate-pulse rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
