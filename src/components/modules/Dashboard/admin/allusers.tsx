"use client";
import React, { useTransition } from "react";
import { Plus, Eye, Pencil, Trash2, Loader2 } from "lucide-react";
import { IUser } from "@/types";
import { adminServices } from "@/services/admin.services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const getStatusStyles = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "border-green-200 bg-green-50 text-green-700";
    case "BLOCKED":
      return "border-red-200 bg-red-50 text-red-700";
    case "INACTIVE":
      return "border-gray-200 bg-gray-50 text-gray-600";
    case "SUSPENDED":
      return "border-orange-200 bg-orange-50 text-orange-700";
    default:
      return "border-gray-200 bg-white text-slate-700";
  }
};

export default function UserTable({ users }: { users: IUser[] }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleStatusUpdate = (userId: string, newStatus: string) => {
    startTransition(async () => {
      try {
        await adminServices.changeUserStatus(userId, newStatus);
        toast.success(`User is now ${newStatus}`);
        router.refresh();
      } catch (error) {
        toast.error("Failed to update status. Please try again.");
      }
    });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans text-slate-700">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">All Users</h1>
        <button className="flex items-center gap-2 bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md transition-all active:scale-95 font-medium shadow-sm">
          <Plus size={18} /> Add New
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex justify-end mb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Search:</label>
          <input
            type="text"
            placeholder="Search users..."
            className="border border-gray-300 rounded-md p-1.5 w-64 outline-none focus:ring-1 focus:ring-orange-400 transition-all text-sm"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-gray-200 text-sm">
              <th className="p-4 font-bold text-slate-800">No.</th>
              <th className="p-4 font-bold text-slate-800">User</th>
              <th className="p-4 font-bold text-slate-800">Name & Email</th>
              <th className="p-4 font-bold text-slate-800">Phone</th>
              <th className="p-4 font-bold text-slate-800">Status</th>
              <th className="p-4 font-bold text-slate-800 text-right pr-8">
                Option
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr
                key={user.id}
                className="border-b border-dashed border-gray-300 hover:bg-gray-50/50 transition-colors group"
              >
                <td className="p-4 font-bold text-slate-800 text-sm">
                  {String(index + 1).padStart(2, "0")}.
                </td>
                <td className="p-4">
                  <img
                    src={user.image || `https://i.pravatar.cc/150?u=${user.id}`}
                    alt={user.name}
                    className="w-12 h-12 rounded-md object-cover bg-gray-100 border border-gray-200 shadow-sm"
                  />
                </td>
                <td className="p-4">
                  <div className="text-sm font-semibold text-slate-800">
                    {user.name}
                  </div>
                  <div className="text-xs text-slate-500">{user.email}</div>
                </td>
                <td className="p-4 text-sm text-slate-600">
                  {user.phone || "Not Provided"}
                </td>

                {/* Status Column */}
                <td className="p-4">
                  <div className="flex items-center gap-2 relative">
                    <select
                      value={user.status}
                      disabled={isPending}
                      onChange={(e) =>
                        handleStatusUpdate(user.id, e.target.value)
                      }
                      className={`text-[11px] font-bold uppercase tracking-wider border rounded-md px-2 py-1 outline-none cursor-pointer transition-all disabled:opacity-50 ${getStatusStyles(user.status)}`}
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive</option>
                      <option value="BLOCKED">Blocked</option>
                      <option value="SUSPENDED">Suspended</option>
                    </select>

                    {isPending && (
                      <Loader2
                        size={14}
                        className="animate-spin text-orange-400"
                      />
                    )}
                  </div>
                </td>

                {/* Options Column */}
                <td className="p-4">
                  <div className="flex justify-end gap-3 pr-4">
                    <button className="text-orange-400 hover:scale-125 transition-transform duration-200">
                      <Eye size={18} strokeWidth={2.5} />
                    </button>
                    <button className="text-green-500 hover:scale-125 transition-transform duration-200">
                      <Pencil size={18} strokeWidth={2.5} />
                    </button>
                    <button className="text-red-500 hover:scale-125 transition-transform duration-200">
                      <Trash2 size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users?.length === 0 && (
          <div className="p-10 text-center text-gray-400 text-sm italic">
            No users found.
          </div>
        )}
      </div>
    </div>
  );
}
