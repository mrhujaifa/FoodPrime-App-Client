"use client";
import { useEffect, useState } from "react";
import { orderServices } from "@/services/order.services";
import { reviewServices } from "@/services/review.services";

import {
  Loader2,
  Package,
  Calendar,
  ChevronDown,
  ChevronUp,
  Receipt,
  Hash,
  Clock,
  Star,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/layouts/Navbar";
import { useUser } from "@/hooks/useSession";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [userId, setUserId] = useState("");
  const [session, setSession] = useState<any>(null);

  // Inline Review States (আইটেম ওয়াইজ ডাটা রাখার জন্য অবজেক্ট ব্যবহার করা হয়েছে)
  const [reviewData, setReviewData] = useState<{
    [key: string]: { rating: number; comment: string };
  }>({});
  const [submittingId, setSubmittingId] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setSession(user);
      setUserId(user.id);
    } else {
      setSession(null);
      setUserId("");
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const data = await orderServices.getMyOrders();
      setOrders(data.orders || []);
    } catch (err) {
      toast.error("Orders load korte somoshya hoyeche");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (mealId: string, field: string, value: any) => {
    setReviewData((prev) => ({
      ...prev,
      [mealId]: {
        ...(prev[mealId] || { rating: 5, comment: "" }),
        [field]: value,
      },
    }));
  };

  const handleReviewSubmit = async (mealId: string) => {
    const data = reviewData[mealId];
    if (!data?.comment?.trim()) return toast.error("Please write a comment");
    if (!userId) return toast.error("User not found!");

    setSubmittingId(mealId);
    try {
      const res = await reviewServices.createReview(
        data.rating || 5,
        data.comment,
        userId,
        mealId,
      );

      if (res.success) {
        toast.success("Review posted!");
        // ক্লিয়ার করে দেওয়া যাতে আবার না পাঠানো যায়
        handleInputChange(mealId, "comment", "");
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to post review");
    } finally {
      setSubmittingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />

      <div className="pb-20 pt-10 px-4 lg:mt-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-black text-gray-900">My Orders</h1>
              <p className="text-gray-500 text-sm tracking-tight">
                Manage your meal history
              </p>
            </div>
          </div>

          {loading ? (
            <div className="space-y-6">
              <OrderSkeleton />
            </div>
          ) : orders.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className={`bg-white rounded-[32px] border transition-all duration-300 ${expandedOrder === order.id ? "border-yellow-400 shadow-xl" : "border-gray-100 shadow-sm"}`}
                >
                  <div
                    className="p-6 cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                    onClick={() =>
                      setExpandedOrder(
                        expandedOrder === order.id ? null : order.id,
                      )
                    }
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-100 p-3 rounded-2xl">
                        <Hash className="text-gray-500" size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          {order.orderNumber}
                        </p>
                        <h3 className="font-bold text-xl text-gray-900">
                          ৳ {order.totalPrice}
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                          <StatusBadge status={order.status} />
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Calendar size={12} />{" "}
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-GB",
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 w-full md:w-auto justify-between">
                      <div className="flex -space-x-3">
                        {order.items.slice(0, 3).map((item: any, i: number) => (
                          <img
                            key={i}
                            src={item.meal.image}
                            className="w-12 h-12 rounded-2xl border-4 border-white object-cover shadow-sm"
                            alt=""
                          />
                        ))}
                      </div>
                      <div className="bg-gray-50 p-2 rounded-full text-gray-400">
                        {expandedOrder === order.id ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </div>
                    </div>
                  </div>

                  {expandedOrder === order.id && (
                    <div className="px-6 pb-8 pt-2 border-t border-gray-50">
                      <div className="grid grid-cols-1 gap-8">
                        <div className="space-y-4">
                          <h4 className="text-sm font-black text-gray-400 uppercase flex items-center gap-2 pt-4">
                            <Receipt size={16} /> Items & Review
                          </h4>
                          <div className="bg-gray-50 rounded-2xl p-4 space-y-6">
                            {order.items.map((item: any, i: number) => (
                              <div
                                key={i}
                                className="flex flex-col border-b border-gray-200 pb-6 last:border-0 last:pb-0"
                              >
                                <div className="flex justify-between items-center mb-3">
                                  <span className="text-sm font-bold text-gray-700">
                                    {item.quantity}x {item.meal.name}
                                  </span>
                                  <span className="text-sm font-black text-gray-900">
                                    ৳{item.price * item.quantity}
                                  </span>
                                </div>

                                {/* --- DIRECT REVIEW INPUT --- */}
                                {order.status === "DELIVERED" && (
                                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                                    <div className="flex items-center justify-between">
                                      <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                          <Star
                                            key={s}
                                            size={16}
                                            onClick={() =>
                                              handleInputChange(
                                                item.mealId,
                                                "rating",
                                                s,
                                              )
                                            }
                                            className={`cursor-pointer transition-all ${s <= (reviewData[item.mealId]?.rating || 5) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
                                          />
                                        ))}
                                      </div>
                                      <p className="text-[10px] font-black text-gray-400 uppercase">
                                        Rate Meal
                                      </p>
                                    </div>
                                    <div className="flex gap-2">
                                      <input
                                        type="text"
                                        placeholder="Add a quick comment..."
                                        value={
                                          reviewData[item.mealId]?.comment || ""
                                        }
                                        onChange={(e) =>
                                          handleInputChange(
                                            item.mealId,
                                            "comment",
                                            e.target.value,
                                          )
                                        }
                                        className="flex-1 text-xs bg-gray-50 border-none rounded-xl px-4 py-2.5 focus:ring-1 focus:ring-yellow-400 outline-none"
                                      />
                                      <button
                                        onClick={() =>
                                          handleReviewSubmit(item.mealId)
                                        }
                                        disabled={submittingId === item.mealId}
                                        className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition-colors disabled:bg-gray-200"
                                      >
                                        {submittingId === item.mealId ? (
                                          <Loader2
                                            className="animate-spin"
                                            size={14}
                                          />
                                        ) : (
                                          <Send size={14} />
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const StatusBadge = ({ status }: { status: string }) => {
  const styles: any = {
    DELIVERED: "bg-green-100 text-green-600",
    PENDING: "bg-orange-100 text-orange-600",
    CANCELLED: "bg-red-100 text-red-600",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1 w-fit ${styles[status] || "bg-blue-100 text-blue-600"}`}
    >
      <Clock size={10} /> {status}
    </span>
  );
};

const OrderSkeleton = () => (
  <div className="bg-white rounded-[32px] border border-gray-100 p-6 animate-pulse shadow-sm h-32" />
);
const EmptyState = () => (
  <div className="text-center py-24 bg-white rounded-[40px] border border-gray-100">
    <Package size={40} className="text-gray-200 mx-auto mb-4" />
    <h2 className="text-xl font-bold">No orders yet!</h2>
  </div>
);
