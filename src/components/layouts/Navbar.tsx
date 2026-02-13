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
  UserRound as UserIcon,
  LogOut,
  Settings,
  ClipboardList,
  UserRound,
  LayoutDashboardIcon,
  GitPullRequestCreateIcon,
  ChevronRight,
  Bike,
  ShoppingBag,
} from "lucide-react";
import logo from "../../../public/logos/logo5.png";
import { usePathname, useRouter } from "next/navigation";
import CartSidebarCom from "./CartSidebar";
import { cartServices } from "@/services/cart.service";
import { authClient } from "@/lib/auth-client";
import { getCartItemAction } from "@/actions/cart.action";

const Navbar = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartIsloading, setCartIsloading] = useState(true);
  const [cartData, setCartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const isActive = (path: string) => pathname === path;
  const { data } = authClient.useSession();

  useEffect(() => {
    if (data) setSession(data);
    else setSession(null);
    setLoading(false);
  }, [data]);

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
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  const role = session?.user?.role;

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0 left-0 border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-3  lg:px-0">
        {/* --- MAIN TOP NAV --- */}
        <div className="flex justify-between items-center py-2 gap-4">
          {/* MOBILE: Left Side User Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <UserIcon size={24} className="text-gray-700" />
            </button>
          </div>

          {/* BRAND LOGO: (Original styling) */}
          <div className="flex-shrink-0 flex items-center gap-1 lg:gap-2 cursor-pointer">
            <div className="relative w-8 h-auto lg:w-10 lg:h-10 ">
              <Image src={logo} alt="Brand Logo" width={40} height={40} />
            </div>
            <span className="text-[20px] lg:text-xl font-black text-gray-800 tracking-tighter italic">
              food<span className="text-yellow-300">prime</span>
            </span>
          </div>

          {/* PC SEARCH: (Original UI hidden on mobile) */}
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

          {/* PC AUTH & LANG: (Original UI hidden on mobile) */}
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
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <LayoutDashboardIcon size={16} /> Dashboard
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

          {/* CART ICON: (Visible on both, styled for mobile alignment) */}
          <div
            onClick={() => setIsCartOpen(true)}
            className="relative cursor-pointer text-gray-600 hover:text-black transition"
          >
            <ShoppingCart size={24} />
            {cartData?.items?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#e21b70] md:bg-yellow-300 text-white md:text-black text-[10px] md:text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartData.items.length}
              </span>
            )}
          </div>
        </div>

        {/* MOBILE ONLY: Search Bar (Address-style layout) */}
        <div className="md:hidden ">
          <div className="relative flex items-center w-full group">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search for restaurants, cuisine..."
              className="w-full bg-[#F7F7F7] border border-transparent text-gray-800 text-sm rounded-lg py-3 pl-4 pr-12
               placeholder:text-gray-500
               focus:outline-none focus:bg-white focus:border-gray-200 focus:shadow-sm
               transition-all duration-200"
            />

            {/* Search Icon on the Right */}
            <div className="absolute right-0 top-0 h-full flex items-center pr-4 pointer-events-none">
              <Search
                size={20}
                className="text-gray-500 group-focus-within:text-yellow-500 transition-colors duration-200"
              />
            </div>
          </div>

          {/* --- MOBILE ONLY: BOTTOM NAV --- */}
          <div className="md:hidden mt-2 border-gray-100">
            <div className="flex items-center gap-5 overflow-x-auto no-scrollbar py-3.5 px- scroll-smooth">
              {/* Prime Meal */}
              <Link
                href="/"
                className="flex items-center gap-2 flex-shrink-0 relative whitespace-nowrap"
              >
                <UtensilsCrossed
                  size={18}
                  className={
                    isActive("/") ? "text-yellow-500" : "text-gray-500"
                  }
                />
                <span
                  className={`text-sm font-bold ${isActive("/") ? "text-yellow-500" : "text-gray-700"}`}
                >
                  Prime Meal
                </span>
                {isActive("/") && (
                  <div className="absolute -bottom-[13px] left-0 w-full h-0.5 bg-gray-900" />
                )}
              </Link>

              {/* Prime Shop */}
              <Link
                href="/prime-shop"
                className="flex items-center gap-2 flex-shrink-0 relative whitespace-nowrap"
              >
                <Store
                  size={18}
                  className={
                    isActive("/prime-shop")
                      ? "text-yellow-500"
                      : "text-gray-500"
                  }
                />
                <span
                  className={`text-sm font-bold ${isActive("/prime-shop") ? "text-yellow-500" : "text-gray-700"}`}
                >
                  Prime Shop
                </span>
                <span className="bg-yellow-300 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  New
                </span>
              </Link>

              {/* Track Order */}
              <Link
                href="/orders"
                className="flex items-center gap-2 flex-shrink-0 relative whitespace-nowrap"
              >
                <Bike
                  size={20}
                  className={
                    isActive("/orders") ? "text-green-600" : "text-gray-500"
                  }
                />
                <span
                  className={`text-sm font-bold ${isActive("/orders") ? "text-green-600" : "text-gray-700"}`}
                >
                  Track Order
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* PC SECONDARY NAV: (Original UI - visible on MD screens) */}
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
            </Link>

            <Link
              href="/orders"
              className="flex items-center gap-2 cursor-pointer group relative py-1"
            >
              <Bike
                size={20}
                className={
                  isActive("/orders")
                    ? "text-green-600"
                    : "text-gray-500 group-hover:text-green-600"
                }
              />
              <span
                className={`text-sm font-bold transition-colors ${isActive("/orders") ? "text-green-600" : "text-gray-700 group-hover:text-green-600"}`}
              >
                Track Order
              </span>
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

      {/* MOBILE SIDEBAR OVERLAY */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <div
            className="w-[280px] h-full bg-white shadow-2xl transition-transform duration-300 py-6 px-4 flex flex-col"
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
                <p className="text-sm text-gray-500 mb-4">
                  Join foodprime to start ordering your favorite meals.
                </p>
                <Link
                  href="/login"
                  className="block w-full text-center py-3 border border-gray-900 rounded-lg font-bold"
                  onClick={() => setIsMobileSidebarOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="block w-full text-center py-3 bg-yellow-300 text-gray-900 rounded-lg font-bold"
                  onClick={() => setIsMobileSidebarOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="bg-gray-50 p-4 rounded-xl mb-6">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
                    Logged in as
                  </p>
                  <p className="font-bold text-gray-800 text-lg">
                    {session?.user?.name}
                  </p>
                </div>

                <div className="space-y-1">
                  <SidebarItem
                    icon={<UserIcon size={20} />}
                    label="Profile"
                    href="/profile"
                    onClick={() => setIsMobileSidebarOpen(false)}
                  />
                  <SidebarItem
                    icon={<ClipboardList size={20} />}
                    label="My Orders"
                    href="/orders"
                    onClick={() => setIsMobileSidebarOpen(false)}
                  />
                  <SidebarItem
                    icon={<LayoutDashboardIcon size={20} />}
                    label="Dashboard"
                    href="/dashboard"
                    onClick={() => setIsMobileSidebarOpen(false)}
                  />
                  <SidebarItem
                    icon={<Settings size={20} />}
                    label="Settings"
                    href="/settings"
                    onClick={() => setIsMobileSidebarOpen(false)}
                  />
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

// Sub-component for Mobile Sidebar Links
const SidebarItem = ({ icon, label, href, onClick }: any) => (
  <Link
    href={href}
    onClick={onClick}
    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-all"
  >
    <div className="flex items-center gap-3 text-gray-700">
      {icon}
      <span className="font-medium">{label}</span>
    </div>
    <ChevronRight size={16} className="text-gray-400" />
  </Link>
);

export default Navbar;
