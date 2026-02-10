import React from "react";
import { Eye, MoreVertical, Calendar, User, CreditCard } from "lucide-react";
import { Order, OrderItem } from "@/types/provider/order";

const OrderTable = ({ orders }: { orders: Order[] }) => {
  return (
    <div className="w-full p-4">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header Section */}
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">Recent Orders</h2>
          <button className="text-sm font-medium text-blue-600 hover:underline">
            View All
          </button>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold tracking-wider">
                <th className="px-6 py-4">Order Info</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4 text-right">Amount</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  {/* Order Number & Date */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-700">
                        {order.orderNumber}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                        <Calendar size={12} />{" "}
                        {order.createdAt.toString().slice(0, 10)}
                      </span>
                    </div>
                  </td>

                  {/* Customer Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                        {order.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-700 leading-none">
                          {order.name}
                        </span>
                        <span className="text-xs text-slate-400 mt-1">
                          {order.phoneNumber}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Order Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                      ${order.status === "REJECTED" ? "bg-red-50 text-red-600 border-red-100" : "bg-green-50 text-green-600 border-green-100"}
                    `}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${order.status === "REJECTED" ? "bg-red-500" : "bg-green-500"}`}
                      ></span>
                      {order.status}
                    </span>
                  </td>

                  {/* Payment Info */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-600 flex items-center gap-1 uppercase font-semibold">
                        {order.paymentMethod}
                      </span>
                      <span className="text-[10px] text-orange-500 font-bold tracking-tighter uppercase">
                        {order.paymentStatus}
                      </span>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-bold text-slate-800">
                      ৳{order.totalPrice}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button className="p-1.5 hover:bg-white border border-transparent hover:border-slate-200 rounded-lg transition-all text-slate-400 hover:text-blue-600">
                        <Eye size={18} />
                      </button>
                      <button className="p-1.5 hover:bg-white border border-transparent hover:border-slate-200 rounded-lg transition-all text-slate-400 hover:text-slate-600">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
