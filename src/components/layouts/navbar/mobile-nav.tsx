"use client";
import Link from "next/link";
import { Search, UtensilsCrossed, Store, Bike } from "lucide-react";

export const MobileSearch = () => (
  <div className="relative flex items-center w-full group">
    <input
      type="text"
      placeholder="Search for restaurants, cuisine..."
      className="w-full bg-[#F7F7F7] border border-transparent text-gray-800 text-sm rounded-full py-2.25 pl-4 pr-12 placeholder:text-gray-500 focus:outline-none focus:bg-white focus:border-gray-200 focus:shadow-sm transition-all duration-200"
    />
    <div className="absolute right-0 top-0 h-full flex items-center pr-4 pointer-events-none">
      <Search
        size={20}
        className="text-gray-500 group-focus-within:text-yellow-500 transition-colors duration-200"
      />
    </div>
  </div>
);

export const MobileBottomNav = ({
  isActive,
}: {
  isActive: (p: string) => boolean;
}) => (
  <div className="md:hidden mt-2 border-gray-100">
    <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-3.5 scroll-smooth">
      <BottomNavItem
        href="/"
        icon={<UtensilsCrossed size={18} />}
        label="Prime Meal"
        active={isActive("/")}
      />
      <BottomNavItem
        href="/prime-shop"
        icon={<Store size={18} />}
        label="Prime Shop"
        active={isActive("/prime-shop")}
        isNew
      />
      <BottomNavItem
        href="/orders"
        icon={<Bike size={20} />}
        label="Track Order"
        active={isActive("/orders")}
        isGreen
      />
    </div>
  </div>
);

const BottomNavItem = ({ href, icon, label, active, isNew, isGreen }: any) => (
  <Link
    href={href}
    className="flex items-center gap-2 flex-shrink-0 relative whitespace-nowrap"
  >
    <span
      className={
        active
          ? isGreen
            ? "text-green-600"
            : "text-yellow-500"
          : "text-gray-500"
      }
    >
      {icon}
    </span>
    <span
      className={`text-sm font-bold ${active ? (isGreen ? "text-green-600" : "text-yellow-500") : "text-gray-700"}`}
    >
      {label}
    </span>
    {isNew && (
      <span className="bg-yellow-300 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
        New
      </span>
    )}
    {active && (
      <div className="absolute -bottom-[13px] left-0 w-full h-[3px] rounded-full bg-gray-900" />
    )}
  </Link>
);
