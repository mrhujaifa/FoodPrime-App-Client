// components/DealsSection.jsx
import React from "react";
import { ArrowRight, Percent } from "lucide-react";

const DealsSection = () => {
  return (
    <section className=" container mx-auto py-14">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          <span className="">Mega Deals</span>
        </h2>
        {/* View All Button */}
        <button className="hidden md:flex items-center gap-2 text-yellow-600 font-semibold hover:gap-3 transition-all">
          See all offers <ArrowRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Big Discount */}
        <div className="relative h-64 rounded-3xl overflow-hidden group cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Pizza"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent p-8 flex flex-col justify-center">
            <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full w-fit mb-3">
              LIMITED TIME
            </span>
            <h3 className="text-3xl font-bold text-white mb-2">Flat 50% OFF</h3>
            <p className="text-gray-200 mb-4">On your first Pizza order</p>
            <button className="bg-white text-black px-6 py-2 rounded-full font-bold w-fit hover:bg-yellow-500 transition-colors">
              Order Now
            </button>
          </div>
        </div>

        {/* Card 2: Free Delivery */}
        <div className="relative h-64 rounded-3xl overflow-hidden group cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Burger"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-transparent p-8 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <Percent className="text-white" />
              <span className="text-white font-bold tracking-wider">
                PROMO: FREEDEL
              </span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">
              Free Delivery
            </h3>
            <p className="text-gray-100 mb-4">On orders above Tk 499</p>
            <button className="bg-white/20 backdrop-blur-md border border-white/40 text-white px-6 py-2 rounded-full font-bold w-fit hover:bg-white hover:text-orange-600 transition-all">
              Claim Now
            </button>
          </div>
        </div>

        {/* Card 3: Dessert Special */}
        <div className="relative h-64 rounded-3xl overflow-hidden group cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Dessert"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 flex flex-col justify-end">
            <h3 className="text-2xl font-bold text-white">Sweet Cravings?</h3>
            <p className="text-gray-300 mb-3">Get free dessert with any meal</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
