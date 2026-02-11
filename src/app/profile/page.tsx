"use client";
import { useEffect, useState } from "react";

import {
  Mail,
  Phone,
  Lock,
  Save,
  Loader2,
  CheckCircle,
  Camera,
  Shield,
} from "lucide-react";
import { toast } from "sonner";
import SecNavbar from "@/components/layouts/HeaderNav";
import { useUser } from "@/hooks/useSession";

export default function ManageProfile() {
  const [updating, setUpdating] = useState(false);
  const [user, setUser] = useState<any>(null);

  // loading variable-ti ekhane 'sessionLoading' name rename kora hoyeche duplicate avoid korte
  const { user: currentUser, isLoading: sessionLoading } = useUser();

  // Local state for UI loading control
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    if (!sessionLoading) {
      if (currentUser) {
        setUser(currentUser);
      }
      setIsInitialLoading(false);
    }
  }, [currentUser, sessionLoading]);

  // --- Skeleton Loading UI ---
  if (isInitialLoading)
    return (
      <div className="min-h-screen bg-[#FAFAFA]">
        <SecNavbar />
        <div className="max-w-4xl mx-auto px-4 py-12 mt-6 lg:mt-7 animate-pulse">
          <div className="h-8 w-40 bg-gray-200 rounded-lg mb-2" />
          <div className="h-4 w-64 bg-gray-100 rounded-lg mb-10" />

          <div className="space-y-6">
            <div className="h-32 bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gray-200" />
              <div className="space-y-2">
                <div className="h-5 w-32 bg-gray-200 rounded" />
                <div className="h-4 w-24 bg-gray-100 rounded" />
              </div>
            </div>
            <div className="h-64 bg-white border border-gray-200 rounded-2xl p-8" />
            <div className="h-64 bg-white border border-gray-200 rounded-2xl p-8" />
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-900">
      <SecNavbar />

      <div className="max-w-4xl mx-auto px-4 py-12 mt-6 lg:mt-7">
        <div className="mb-10">
          <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
          <p className="text-gray-500 text-sm">
            Manage your account settings and security
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* --- Profile Image Section --- */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
                <img
                  src={
                    user?.image ||
                    `https://ui-avatars.com/api/?name=${user?.name || "User"}`
                  }
                  className="w-full h-full object-cover"
                  alt="avatar"
                />
              </div>
              <button className="absolute -bottom-1 -right-1 bg-white border border-gray-200 p-1.5 rounded-full shadow-sm hover:bg-gray-50 transition-colors">
                <Camera size={14} className="text-gray-600" />
              </button>
            </div>
            <div>
              <h2 className="font-semibold text-lg">
                {user?.name || "User Name"}
              </h2>
              <p className="text-gray-500 text-sm">Personal Customer</p>
            </div>
          </div>

          <form className="space-y-6">
            {/* --- Personal Information Card --- */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8 space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-gray-50">
                <Shield size={18} className="text-gray-400" />
                <h3 className="font-semibold">General Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-600">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.name?.split(" ")[0]}
                    placeholder="First Name"
                    className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 focus:border-gray-900 outline-none transition-all text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-600">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.name?.split(" ")[1]}
                    placeholder="Last Name"
                    className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 focus:border-gray-900 outline-none transition-all text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-600">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="+880"
                      className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-11 pr-4 focus:border-gray-900 outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-600">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <input
                      type="email"
                      defaultValue={user?.email}
                      disabled
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-11 pr-24 text-sm text-gray-500 cursor-not-allowed"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded-md border border-green-100">
                      <CheckCircle size={10} />
                      <span className="text-[9px] font-bold uppercase">
                        Verified
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- Security Card --- */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8 space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-gray-50">
                <Lock size={18} className="text-gray-400" />
                <h3 className="font-semibold">Security & Password</h3>
              </div>

              <div className="grid grid-cols-1 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-600">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 focus:border-gray-900 outline-none transition-all text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-600">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 focus:border-gray-900 outline-none transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-600">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 focus:border-gray-900 outline-none transition-all text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* --- Action Button --- */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setUpdating(true);
                  setTimeout(() => {
                    setUpdating(false);
                    toast.success("Changes saved");
                  }, 1000);
                }}
                disabled={updating}
                className="bg-yellow-300 text-black/80 px-8 py-2.5 w-full rounded-xl font-medium text-sm hover:bg-black hover:text-white transition-all flex items-center gap-2 justify-center disabled:bg-gray-400"
              >
                {updating ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <Save size={16} />
                )}
                {updating ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
