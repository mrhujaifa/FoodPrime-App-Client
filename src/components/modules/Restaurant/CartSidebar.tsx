import { ShoppingBag } from "lucide-react";

export const CartSidebar = () => (
  <div className="bg-white border border-gray-100 rounded-xl shadow-sm sticky top-24">
    <div className="p-6 border-b border-gray-50 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <ShoppingBag className="text-yellow-500" />
        <h3 className="font-black text-xl">Your Order</h3>
      </div>
    </div>
    <div className="p-6 space-y-4">
      <div className="flex justify-between text-xl font-black text-gray-900 pt-4 border-t border-gray-200">
        <span>Total</span>
        <span>৳ 945</span>
      </div>
      <button className="w-full py-4 bg-yellow-300 text-black rounded-xl font-black uppercase tracking-widest hover:bg-yellow-400 transition-all">
        Process Order
      </button>
    </div>
  </div>
);
