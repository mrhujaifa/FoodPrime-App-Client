/* eslint-disable @typescript-eslint/no-explicit-any */
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
  X,
} from "lucide-react";
import logo from "../../../public/logos/logo5.png";
import CartSidebarCom from "./CartSidebar";
import { authClient } from "@/lib/auth-client";
import { getCartItemAction } from "@/actions/cart.action";
import { getSessionAction } from "@/actions/user.action";

const SecNavbar = () => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false); // Mobile sidebar state
  const [session, setSession] = useState<any>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartIsloading, setCartIsloading] = useState(true);
  const [cartData, setCartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        setLoading(true);
        const user = await getSessionAction();
        setSession(user.data || null);
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserSession();
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
      const res = await getCartItemAction();
      setCartData(res);
    } catch (error) {
      console.error("Cart fetch error", error);
    } finally {
      setCartIsloading(false);
    }
  };

  useEffect(() => {
    if (session?.user) fetchCartData();
  }, [session]);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      setIsMobileSidebarOpen(false);
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0 left-0 border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-3 md:px-6 lg:px-8">
        {/* --- Main Row --- */}
        <div className="flex justify-between items-center py-2 gap-2 md:gap-4">
          {/* MOBILE: Left User Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <UserRound size={24} className="text-gray-700" />
            </button>
          </div>

          {/* Logo - Center on Mobile, Left on Desktop */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <div className="relative w-8 h-8 md:w-10 md:h-10">
              <Image src={logo} alt="Brand Logo" width={40} height={40} />
            </div>
            <span className="text-lg md:text-xl font-bold text-gray-800 tracking-tight italic">
              food<span className="text-yellow-400">prime</span>
            </span>
          </Link>

          {/* Search Bar - Hidden on small mobile, visible on MD up */}
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

          {/* Right Section (Auth, Lang, Cart) */}
          <div className="flex items-center space-x-2 md:space-x-6">
            {/* PC Desktop Auth Section */}
            <div className="hidden md:flex items-center space-x-6">
              {!loading && !session?.user ? (
                <>
                  <Link
                    href="/login"
                    className="text-gray-700 border text-sm rounded-sm border-black px-4 py-1"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-yellow-300 hover:bg-yellow-400 px-5 text-sm py-1.5 rounded-sm"
                  >
                    Sign up
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
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-md shadow-xl py-2 z-50">
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
                      <hr className="my-1 border-gray-100" />
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut size={16} /> Log out
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Language (PC Only) */}
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
            </div>

            {/* Cart Icon - Always Visible */}
            <div
              onClick={() => setIsCartOpen(true)}
              className="relative cursor-pointer text-gray-600 hover:text-black transition p-2"
            >
              <ShoppingCart size={24} />
              {cartData?.items?.length > 0 && (
                <span className="absolute top-0 right-0 bg-[#e21b70] md:bg-yellow-300 text-white md:text-black text-[10px] md:text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                  {cartData.items.length}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* MOBILE ONLY: Search Bar Below Logo */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for restaurants, cuisine..."
              className="w-full bg-[#F7F7F7] border border-transparent text-gray-800 text-sm rounded-lg py-3 pl-4 pr-12 focus:outline-none focus:bg-white focus:border-gray-200 transition-all"
            />
            <div className="absolute right-4 top-0 h-full flex items-center pointer-events-none">
              <Search size={20} className="text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* --- MOBILE SIDEBAR DRAWER --- */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <div
            className="w-[280px] h-full bg-white shadow-2xl py-6 px-4 flex flex-col animate-in slide-in-from-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-gray-900">Account</h2>
              <button onClick={() => setIsMobileSidebarOpen(false)}>
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            {!loading && !session?.user ? (
              <div className="space-y-4">
                <Link
                  href="/login"
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="block w-full text-center py-3 border border-gray-900 rounded-lg font-bold"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="block w-full text-center py-3 bg-yellow-300 text-gray-900 rounded-lg font-bold"
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="bg-gray-50 p-4 rounded-xl mb-6">
                  <p className="text-xs text-gray-400 font-bold uppercase mb-1">
                    Logged in as
                  </p>
                  <p className="font-bold text-gray-800 text-lg">
                    {session?.user?.name}
                  </p>
                </div>
                <div className="space-y-1">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    <UserIcon size={20} /> Profile
                  </Link>
                  <Link
                    href="/orders"
                    className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    <ClipboardList size={20} /> My Orders
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    <Settings size={20} /> Settings
                  </Link>
                </div>
                <button
                  onClick={handleSignOut}
                  className="mt-auto flex items-center gap-3 p-3 text-red-600 font-bold border-t border-gray-100 pt-4"
                >
                  <LogOut size={20} /> Log out
                </button>
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

export default SecNavbar;
