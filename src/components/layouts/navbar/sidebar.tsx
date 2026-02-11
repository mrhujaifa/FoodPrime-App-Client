"use client";
import Link from "next/link";
import {
  X,
  UserRound,
  ClipboardList,
  LayoutDashboardIcon,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

export const MobileSidebar = ({
  isOpen,
  onClose,
  session,
  loading,
  handleSignOut,
}: any) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[60] md:hidden"
      onClick={onClose}
    >
      <div
        className="w-[280px] h-full bg-white shadow-2xl py-6 px-4 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-gray-900">Account</h2>
          <button onClick={onClose}>
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {!loading && !session?.user ? (
          <div className="space-y-4">
            <Link
              href="/login"
              className="block w-full text-center py-3 border border-gray-900 rounded-lg font-bold"
              onClick={onClose}
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="block w-full text-center py-3 bg-yellow-300 text-gray-900 rounded-lg font-bold"
              onClick={onClose}
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
                icon={<UserRound size={20} />}
                label="Profile"
                href="/profile"
                onClick={onClose}
              />
              <SidebarItem
                icon={<ClipboardList size={20} />}
                label="My Orders"
                href="/orders"
                onClick={onClose}
              />
              <SidebarItem
                icon={<LayoutDashboardIcon size={20} />}
                label="Dashboard"
                href="/dashboard"
                onClick={onClose}
              />
              <SidebarItem
                icon={<Settings size={20} />}
                label="Settings"
                href="/settings"
                onClick={onClose}
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
  );
};

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
