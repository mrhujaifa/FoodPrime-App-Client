"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Globe,
  Menu,
  X,
  ChevronDown,
  Search,
  UtensilsCrossed,
  Store,
  MapPin,
  User as UserIcon,
  LogOut,
  Settings,
  ClipboardList,
  UserRound,
  LayoutDashboardIcon,
} from "lucide-react";
import logo from "../../../public/logos/logo5.png";
import { usePathname } from "next/navigation";
import { getSessionAction, handleSignOutServer } from "@/actions/user.actions";
import CartSidebarCom from "./CartSidebar";
import { cartServices } from "@/services/cart.service";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartIsloading, setCartIsloading] = useState(true);

  const [cartData, setCartData] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data, error } = await getSessionAction();
        if (data) setSession(data);
      } catch (err) {
        console.error("Failed to fetch session:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchCartData = async () => {
    try {
      setCartIsloading(true);
      const res = await cartServices.getCart();
      setCartData(res);
    } catch (error) {
      console.error("Cart fetch error", error);
    } finally {
      setCartIsloading(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchCartData();
    }
  }, [session]);

  console.log(cartData);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0 left-0 border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 gap-4">
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer">
            <div className="relative w-10 h-10">
              <Image src={logo} alt="Brand Logo" width={40} height={40} />
            </div>
            <span className="text-xl text-yellow-300 tracking-tight">
              foodprime
            </span>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-auto">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search food..."
                className="w-full border border-gray-300 bg-gray-50 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-yellow-400 focus:bg-white transition-all"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {!loading && !session?.user ? (
              <>
                <Link
                  href={"/login"}
                  className="text-gray-700 border text-sm rounded-sm border-black px-4 py-1"
                >
                  Log in
                </Link>
                <Link
                  href={"/signup"}
                  className="bg-yellow-300 hover:bg-yellow-400 px-5 text-sm py-1.5 rounded-sm"
                >
                  Sign up for Free Delivery
                </Link>
              </>
            ) : (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 hover:bg-gray-50 p-1 rounded-md transition-all"
                >
                  <div className="">
                    <UserRound size={20} />
                  </div>
                  <span className="text-sm font-bold text-gray-800">
                    {session?.user?.name}
                  </span>
                  <ChevronDown
                    size={24}
                    className={`transition-transform ${isUserMenuOpen ? "rotate-180" : ""} text-yellow-300`}
                  />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-md shadow-xl py-2 z-50 transition-all">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <UserIcon size={16} /> My Profile
                    </Link>
                    <Link
                      href="/orders"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <ClipboardList size={16} /> My Orders
                    </Link>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <LayoutDashboardIcon size={16} /> Dashboard
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Settings size={16} /> Settings
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      <LogOut size={16} />{" "}
                      <span onClick={handleSignOutServer}>Log out</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 text-gray-600 hover:text-black"
              >
                <Globe size={20} />
                <span className="text-sm">EN</span>
                <ChevronDown size={20} className="text-yellow-300" />
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg py-1">
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    English
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Bangla
                  </button>
                </div>
              )}
            </div>

            <div
              onClick={() => setIsCartOpen(true)}
              className="relative cursor-pointer text-gray-600 hover:text-black transition"
            >
              <ShoppingCart size={24} />
              {cartData?.items?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-300 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartData.items.length}
                </span>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-black focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        <div className="hidden md:flex items-center pt-6 pb-3 border-t border-gray-50 justify-between">
          <div className="flex items-center gap-16">
            <Link
              href="/"
              className="flex items-center gap-2 cursor-pointer group relative"
            >
              <UtensilsCrossed
                size={18}
                className={
                  isActive("/prime-meal")
                    ? "text-yellow-500"
                    : "text-gray-500 group-hover:text-yellow-500"
                }
              />
              <span
                className={`text-sm font-bold transition-colors ${isActive("/prime-meal") ? "text-yellow-500" : "text-gray-700 group-hover:text-yellow-500"}`}
              >
                Prime Meal
              </span>
              {isActive("/") && (
                <div className="absolute -bottom-[9px] left-0 w-full h-0.5 bg-yellow-500" />
              )}
            </Link>

            <Link
              href="/prime-shop"
              className="flex items-center gap-2 cursor-pointer group relative"
            >
              <Store
                size={18}
                className={
                  isActive("/prime-shop")
                    ? "text-yellow-500"
                    : "text-gray-500 group-hover:text-yellow-500"
                }
              />
              <span
                className={`text-sm font-bold transition-colors ${isActive("/prime-shop") ? "text-yellow-500" : "text-gray-700 group-hover:text-yellow-500"}`}
              >
                Prime Shop
              </span>
              <span className="absolute -top-3 -right-6 bg-yellow-300 text-[10px] px-1.5 py-0.5 rounded-full animate-pulse">
                New
              </span>
              {isActive("/prime-shop") && (
                <div className="absolute -bottom-[9px] left-0 w-full h-0.5 bg-yellow-500" />
              )}
            </Link>

            <Link
              href="/orders"
              className="flex items-center gap-2 cursor-pointer group relative py-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`size-5 transition-colors ${
                  isActive("/orders")
                    ? "text-green-600"
                    : "text-gray-500 group-hover:text-green-600"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                />
              </svg>
              <span
                className={`text-sm font-bold transition-colors ${
                  isActive("/orders")
                    ? "text-green-600"
                    : "text-gray-700 group-hover:text-green-600"
                }`}
              >
                Track Order
              </span>
              {isActive("/orders") && (
                <div className="absolute -bottom-[9px] left-0 w-full h-0.5 bg-green-600" />
              )}
            </Link>
          </div>

          <div className="flex items-center gap-2 text-gray-500 hover:text-gray-800 cursor-pointer transition-all">
            <MapPin size={16} className="text-yellow-300" />
            <span className="text-xs font-medium">
              Deliver to: <b className="text-gray-800">Your Current Location</b>
            </span>
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 absolute w-full left-0 bg-white">
          <div className="px-4 pt-4 pb-6 space-y-4 flex flex-col">
            <div className="relative w-full mb-2">
              <input
                type="text"
                placeholder="Search food..."
                className="w-full border border-gray-300 bg-gray-50 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-yellow-400"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
            <div className="flex gap-4 py-2 border-b border-gray-50">
              <span className="text-sm font-bold flex items-center gap-2">
                <UtensilsCrossed size={16} /> Prime Meal
              </span>
              <span className="text-sm font-bold flex items-center gap-2">
                <Store size={16} /> Prime Shop
              </span>
            </div>
            <Link
              href="/"
              className="block text-gray-700 hover:text-yellow-500 font-medium py-2"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block text-gray-700 hover:text-yellow-500 font-medium py-2"
            >
              Shop
            </Link>
            <hr className="border-gray-100" />
            {!session?.user ? (
              <>
                <button className="w-full text-center border border-gray-300 py-2 rounded-lg font-semibold text-gray-700">
                  Log in
                </button>
                <button className="w-full text-center bg-yellow-300 text-gray-900 py-3 rounded-lg font-bold">
                  Sign up for Free Delivery
                </button>
              </>
            ) : (
              <div className="py-2">
                <p className="text-sm font-bold text-gray-800 mb-2">
                  Logged in as: {session.user.name}
                </p>
                <Link href="/profile" className="block py-2 text-gray-600">
                  My Profile
                </Link>
                <button className="text-red-600 font-bold mt-2">Log out</button>
              </div>
            )}
          </div>
        </div>
      )}

      <CartSidebarCom
        fetchCartData={fetchCartData}
        data={cartData}
        isOpen={isCartOpen}
        isLoading={cartIsloading}
        onClose={() => setIsCartOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
