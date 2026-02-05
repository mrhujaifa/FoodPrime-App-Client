"use client";
import { useEffect, useState } from "react";
import { cartServices } from "@/services/cart.service";
import { orderServices } from "@/services/order.services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Loader2,
  MapPin,
  Phone,
  CreditCard,
  Receipt,
  Bike,
  ChevronLeft,
  User,
  Mail,
  ShoppingBag,
} from "lucide-react";
import SecNavbar from "@/components/layouts/HeaderNav";

export default function CheckoutPage() {
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [riderTip, setRiderTip] = useState(20);

  const router = useRouter();

  // Fixed Fees
  const serviceFee = 4;
  const deliveryFee = 0;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await cartServices.getCart();
        setCart(data);

        if (data?.user) {
          setName(data.user.name || "");
          setEmail(data.user.email || "");
          setPhone(data.user.phone || "");
        }
      } catch (err) {
        toast.error("Cart load korte somoshya hoyeche");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Calculation logic
  const subtotal =
    cart?.items?.reduce(
      (acc: number, item: any) => acc + Number(item.meal.price) * item.quantity,
      0,
    ) || 0;

  const total = subtotal + serviceFee + deliveryFee + riderTip;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !address || !phone) {
      return toast.error(
        "Please fill in all required fields (Name, Email, Phone, Address)",
      );
    }

    setIsSubmitting(true);

    const orderData = {
      name,
      email,
      deliveryAddress: address,
      phoneNumber: phone,
      orderNotes: notes,
      riderTip,
      serviceFee,
      deliveryFee,
      paymentMethod: "COD",
    };

    try {
      const result = await orderServices.placeOrder(orderData);

      if (result.success) {
        toast.success("Order Placed Successfully!");
        router.push(`/orders`);
      }
    } catch (err: any) {
      toast.error(err.message || "Order placement failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  //  SKELETON LOADING UI
  if (loading)
    return (
      <div className="min-h-screen bg-[#F9FAFB] pb-20 animate-pulse">
        <div className="bg-white border-b py-4 px-6 sticky top-0 z-20 shadow-sm">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="w-32 h-6 bg-gray-200 rounded-lg"></div>
            <div className="w-10"></div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-4 md:pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                  <div className="w-40 h-5 bg-gray-200 rounded-lg"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-14 bg-gray-100 rounded-2xl w-full"></div>
                  <div className="h-14 bg-gray-100 rounded-2xl w-full"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-50 h-[450px]">
              <div className="w-full h-6 bg-gray-200 rounded-lg mb-8"></div>
              <div className="space-y-4 mb-8">
                <div className="h-4 bg-gray-100 rounded w-full"></div>
                <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                <div className="h-4 bg-gray-100 rounded w-full"></div>
              </div>
              <div className="mt-auto h-16 bg-gray-200 rounded-2xl w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <SecNavbar />
      <div className="min-h-screen bg-[#F9FAFB] pb-20 lg:mt-10">
        <div className="max-w-6xl mx-auto p-4 md:pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT SIDE: Personal & Shipping Details */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600">
                  <User size={20} />
                </div>
                <h2 className="text-lg font-bold">Personal Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name *"
                    className="w-full p-4 pl-12 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                  />
                </div>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address *"
                    className="w-full p-4 pl-12 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-100 p-2 rounded-lg text-green-600">
                  <MapPin size={20} />
                </div>
                <h2 className="text-lg font-bold">Delivery Details</h2>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Phone
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number *"
                    className="w-full p-4 pl-12 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                  />
                </div>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Detailed Delivery Address (Road, House, Flat) *"
                  className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-yellow-400 outline-none min-h-[120px]"
                />
              </div>
            </div>

            {/* Rider Tip */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4 text-blue-600">
                <Bike size={20} />
                <h2 className="text-lg font-bold text-gray-800">
                  Support your rider
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {[0, 20, 50, 100].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setRiderTip(amt)}
                    className={`px-6 py-3 rounded-full font-bold border-2 transition-all
                  ${riderTip === amt ? "bg-yellow-400 border-yellow-400 text-black shadow-md" : "bg-white border-gray-100 text-gray-500 hover:border-gray-200"}`}
                  >
                    {amt === 0 ? "Maybe later" : `৳ ${amt}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between p-5 bg-yellow-50 border border-yellow-200 rounded-2xl">
                <div className="flex items-center gap-3">
                  <CreditCard className="text-yellow-600" />
                  <span className="font-bold text-yellow-900">
                    Cash on Delivery
                  </span>
                </div>
                <div className="w-6 h-6 rounded-full bg-yellow-400 border-4 border-white"></div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-50 sticky top-24">
              <div className="flex items-center gap-2 mb-6 border-b pb-4">
                <ShoppingBag size={20} className="text-gray-400" />
                <h2 className="text-xl font-bold">My Order</h2>
              </div>

              <div className="space-y-4 mb-8 max-h-[250px] overflow-y-auto pr-2">
                {cart?.items.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-gray-600">
                      <b className="text-black">{item.quantity}x</b>{" "}
                      {item.meal.name}
                    </span>
                    <span className="font-bold">
                      ৳{Number(item.meal.price) * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-dashed border-gray-200">
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Subtotal</span>
                  <span>৳{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Service Fee</span>
                  <span>৳{serviceFee}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Rider Tip</span>
                  <span>৳{riderTip}</span>
                </div>
                <div className="flex justify-between text-2xl font-black pt-4 text-gray-900">
                  <span>Total</span>
                  <span className="text-yellow-500">৳{total}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isSubmitting || cart?.items.length === 0}
                className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-200 text-black font-black py-4 rounded-2xl mt-8 transition-all active:scale-95 shadow-lg flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" /> Placing Order...
                  </>
                ) : (
                  "Confirm & Pay"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
