"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Globe,
  ChevronDown,
  Search,
  User as UserIcon,
  LogOut,
  Settings,
  ClipboardList,
  UserRound,
} from "lucide-react";
import logo from "../../../public/logos/logo5.png";
import { getSessionAction, handleSignOutServer } from "@/actions/user.actions";
import CartSidebarCom from "./CartSidebar";
import { cartServices } from "@/services/cart.service";

const SecNavbar = () => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartIsloading, setCartIsloading] = useState(true);
  const [cartData, setCartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await getSessionAction();
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

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0 left-0 border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header Row - Exactly as your original UI */}
        <div className="flex justify-between items-center py-2 gap-4">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer">
            <div className="relative w-10 h-10">
              <Image src={logo} alt="Brand Logo" width={40} height={40} />
            </div>
            <span className="text-xl text-yellow-300 tracking-tight">
              foodprime
            </span>
          </div>

          {/* Search Bar */}
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

          {/* Right Icons Section */}
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
                  <UserRound size={20} />
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
                      href="/settings"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Settings size={16} /> Settings
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={handleSignOutServer}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={16} /> Log out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Language Toggle */}
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

            {/* Cart Icon */}
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
        </div>
      </div>

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

export default SecNavbar;
