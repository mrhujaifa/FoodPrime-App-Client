"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Search,
  UtensilsCrossed,
  Store,
  MapPin,
  UserRound,
  ChevronDown,
  Bike,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import logo from "../../../../public/logos/logo5.png";
import { cartServices } from "@/services/cart.service";
import { authClient } from "@/lib/auth-client";

// Modular Components
import { DesktopAuthSection, LanguageSelector } from "./desktop-nav";
import { MobileSearch, MobileBottomNav } from "./mobile-nav";
import { MobileSidebar } from "./sidebar";
import CartSidebarCom from "../CartSidebar";

const NavbarMain = () => {
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
    setSession(data || null);
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
      const res = await cartServices.getCart();
      setCartData(res);
    } catch (error) {
      console.error(error);
    } finally {
      setCartIsloading(false);
    }
  };

  useEffect(() => {
    if (session?.user) fetchCartData();
  }, [session]);

  const handleSignOut = async () => {
    await authClient.signOut();
    setIsMobileSidebarOpen(false);
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0 left-0 border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-3 lg:px-0">
        <div className="flex justify-between items-center py-2 gap-4">
          {/* Mobile User Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <UserRound size={24} className="text-gray-700" />
            </button>
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center gap-1 lg:gap-2"
          >
            <div className="relative w-8 h-auto lg:w-10 lg:h-10">
              <Image src={logo} alt="Brand Logo" width={40} height={40} />
            </div>
            <span className="text-[20px] lg:text-xl font-black text-gray-800 tracking-tighter italic">
              food<span className="text-yellow-300">prime</span>
            </span>
          </Link>

          {/* PC Search */}
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
            <DesktopAuthSection
              loading={loading}
              session={session}
              isUserMenuOpen={isUserMenuOpen}
              setIsUserMenuOpen={setIsUserMenuOpen}
              userMenuRef={userMenuRef}
              handleSignOut={handleSignOut}
            />
            <LanguageSelector
              isLangOpen={isLangOpen}
              setIsLangOpen={setIsLangOpen}
            />
          </div>

          {/* Cart Icon */}
          <div
            onClick={() => setIsCartOpen(true)}
            className="relative cursor-pointer text-gray-600 hover:text-black transition"
          >
            <ShoppingCart size={24} />
            {cartData?.items?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-300 md:bg-yellow-300 text-black md:text-black text-[10px] md:text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartData.items.length}
              </span>
            )}
          </div>
        </div>

        {/* Mobile Search & Nav */}
        <div className="md:hidden">
          <div className="py-1">
            <MobileSearch />
          </div>
          <MobileBottomNav isActive={isActive} />
        </div>

        {/* PC Secondary Nav */}
        <div className="hidden md:flex items-center pt-6 pb-3 border-t border-gray-50 justify-between">
          <div className="flex items-center gap-16">
            <DesktopNavItem
              href="/"
              label="Prime Meal"
              icon={<UtensilsCrossed size={18} />}
              active={isActive("/")}
            />
            <DesktopNavItem
              href="/prime-shop"
              label="Prime Shop"
              icon={<Store size={18} />}
              active={isActive("/prime-shop")}
              isNew
            />
            <DesktopNavItem
              href="/orders"
              label="Track Order"
              icon={<Bike size={20} />}
              active={isActive("/orders")}
              isGreen
            />
          </div>
          <div className="flex items-center gap-2 text-gray-500 hover:text-gray-800 cursor-pointer">
            <MapPin size={16} className="text-yellow-300" />
            <span className="text-xs font-medium">
              Deliver to: <b className="text-gray-800">Your Current Location</b>
            </span>
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        session={session}
        loading={loading}
        handleSignOut={handleSignOut}
      />

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

// Internal Helper for Desktop Links
const DesktopNavItem = ({ href, label, icon, active, isNew, isGreen }: any) => (
  <Link
    href={href}
    className="flex items-center gap-2 cursor-pointer group relative"
  >
    <span
      className={
        active
          ? isGreen
            ? "text-green-600"
            : "text-yellow-500"
          : `text-gray-500 group-hover:${isGreen ? "text-green-600" : "text-yellow-500"}`
      }
    >
      {icon}
    </span>
    <span
      className={`text-sm font-bold transition-colors ${active ? (isGreen ? "text-green-600" : "text-yellow-500") : `text-gray-700 group-hover:${isGreen ? "text-green-600" : "text-yellow-500"}`}`}
    >
      {label}
    </span>
    {isNew && (
      <span className="absolute -top-3 -right-6 bg-yellow-300 text-[10px] px-1.5 py-0.5 rounded-full animate-pulse">
        New
      </span>
    )}
    {active && (
      <div
        className={`absolute -bottom-[9px] left-0 w-full h-0.5 ${isGreen ? "bg-green-600" : "bg-yellow-500"}`}
      />
    )}
  </Link>
);

export default NavbarMain;
