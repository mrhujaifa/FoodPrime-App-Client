import React from "react";
import { Plus, Eye, Pencil, Trash2, Search } from "lucide-react";
import { IUser } from "@/types";

export default function UserTable({ users }: { users: IUser[] }) {
  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans text-slate-700">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">All Users</h1>
        <button className="flex items-center gap-2 bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md transition-colors font-medium">
          <Plus size={18} /> Add New
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex justify-end mb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Search:</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-1.5 w-64 outline-none focus:ring-1 focus:ring-orange-400"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-gray-200">
              <th className="p-4 font-bold text-slate-800">No.</th>
              <th className="p-4 font-bold text-slate-800">User</th>
              <th className="p-4 font-bold text-slate-800">Name</th>
              <th className="p-4 font-bold text-slate-800">Phone</th>
              <th className="p-4 font-bold text-slate-800">Email</th>
              <th className="p-4 font-bold text-slate-800 text-right pr-8">
                Option
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className="border-b border-dashed border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <td className="p-4 font-bold text-slate-800">{user.id}</td>
                <td className="p-4">
                  <img
                    src={user.image || `https://i.pravatar.cc/150?u=${user.id}`}
                    alt="profile"
                    className="w-12 h-12 rounded-md object-cover bg-gray-200"
                  />
                </td>
                <td className="p-4 text-slate-600 font-medium">{user.name}</td>
                <td className="p-4 text-slate-600">{user.phone || "N/A"}</td>
                <td className="p-4 font-bold text-slate-800">{user.email}</td>
                <td className="p-4">
                  <div className="flex justify-end gap-4 pr-4">
                    <button className="text-orange-400 hover:scale-110 transition-transform">
                      <Eye size={18} strokeWidth={2.5} />
                    </button>
                    <button className="text-green-500 hover:scale-110 transition-transform">
                      <Pencil size={18} strokeWidth={2.5} />
                    </button>
                    <button className="text-red-500 hover:scale-110 transition-transform">
                      <Trash2 size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
