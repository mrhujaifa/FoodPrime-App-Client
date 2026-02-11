"use client";
import Link from "next/link";
import {
  UserRound,
  ChevronDown,
  Globe,
  LogOut,
  ClipboardList,
  LayoutDashboardIcon,
} from "lucide-react";

export const DesktopAuthSection = ({
  loading,
  session,
  isUserMenuOpen,
  setIsUserMenuOpen,
  userMenuRef,
  handleSignOut,
}: any) => {
  if (loading) return null;
  if (!session?.user) {
    return (
      <div className="hidden md:flex items-center space-x-6">
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
          Sign up for Free Delivery
        </Link>
      </div>
    );
  }
  return (
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
          <UserMenuItem
            href="/profile"
            label="My Profile"
            icon={<UserRound size={16} />}
          />
          <UserMenuItem
            href="/orders"
            label="My Orders"
            icon={<ClipboardList size={16} />}
          />
          <UserMenuItem
            href="/dashboard"
            label="Dashboard"
            icon={<LayoutDashboardIcon size={16} />}
          />
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
  );
};

export const LanguageSelector = ({ isLangOpen, setIsLangOpen }: any) => (
  <div className="relative hidden md:block">
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
);

const UserMenuItem = ({ href, label, icon }: any) => (
  <Link
    href={href}
    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
  >
    {icon} {label}
  </Link>
);
