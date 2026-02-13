"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface Deal {
  id: number;
  title: string;
  image: string;
  oldPrice: number;
  newPrice: number;
  stock: number;
  totalStock: number;
}

const deals: Deal[] = [
  {
    id: 1,
    title: "Kacchi Biryani Special",
    image: "/biryani.jpg",
    oldPrice: 450,
    newPrice: 299,
    stock: 8,
    totalStock: 20,
  },
  {
    id: 2,
    title: "Chicken Grill Combo",
    image: "/grill.jpg",
    oldPrice: 399,
    newPrice: 249,
    stock: 4,
    totalStock: 15,
  },
];

export default function FlashDealsSection() {
  const [timeLeft, setTimeLeft] = useState(5400);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Glow Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 opacity-20 blur-[120px]"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400 opacity-20 blur-[120px]"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-bold tracking-tight">
              🔥 Flash Deals
            </h2>
            <p className="text-gray-400 mt-3 text-lg">
              Exclusive limited-time offers — Don’t miss out!
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20">
            <Clock size={20} />
            <span className="text-xl font-semibold tracking-widest">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {deals.map((deal) => {
            const discount = Math.round(
              ((deal.oldPrice - deal.newPrice) / deal.oldPrice) * 100,
            );

            const stockPercentage = (deal.stock / deal.totalStock) * 100;

            return (
              <div
                key={deal.id}
                className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:scale-[1.03] transition duration-500"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    {discount}% OFF
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-xl font-semibold mb-4">{deal.title}</h3>

                  {/* Price */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-gray-400 line-through text-lg">
                      ৳{deal.oldPrice}
                    </span>
                    <span className="text-3xl font-bold text-orange-400">
                      ৳{deal.newPrice}
                    </span>
                  </div>

                  {/* Stock Progress */}
                  <div className="mb-6">
                    <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                      <div
                        className="h-3 bg-gradient-to-r from-red-500 to-orange-400 rounded-full transition-all duration-500"
                        style={{ width: `${stockPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                      Only {deal.stock} left — Selling fast
                    </p>
                  </div>

                  {/* Button */}
                  <button className="w-full py-4 rounded-2xl font-semibold text-lg bg-gradient-to-r from-orange-500 to-yellow-400 text-black hover:opacity-90 transition duration-300 shadow-lg">
                    Claim Deal
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
