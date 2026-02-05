"use client";
import { cartServices } from "@/services/cart.service";
import { X, ShoppingBag, Plus, Minus, Trash2, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// --- Skeleton Component ---
const CartSkeleton = () => (
  <div className="animate-pulse flex gap-4 mb-6 border-b pb-4">
    <div className="w-20 h-20 bg-gray-200 rounded-md" />
    <div className="flex-1 space-y-3 py-1">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/4" />
      <div className="flex justify-between items-center pt-2">
        <div className="h-8 bg-gray-200 rounded w-24" />
        <div className="h-8 bg-gray-100 rounded w-8" />
      </div>
    </div>
  </div>
);

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  fetchCartData: () => void;
  data: any;
  isLoading: boolean;
}

const CartSidebarCom = ({
  isOpen,
  onClose,
  fetchCartData,
  data,
  isLoading,
}: CartSidebarProps) => {
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const handleUpdateQuantity = async (
    itemId: string,
    action: "increase" | "decrease",
  ) => {
    if (isUpdating) return;
    try {
      setIsUpdating(itemId);
      await cartServices.updateQuantity(itemId, action);
      await fetchCartData();
    } catch (error) {
      console.error("Failed to update quantity", error);
    } finally {
      setIsUpdating(null);
    }
  };

  useEffect(() => {
    if (isOpen) fetchCartData();
  }, [isOpen]);

  const cartItems = data?.items || [];
  const subtotal = cartItems.reduce(
    (acc: number, item: any) => acc + (item.meal?.price || 0) * item.quantity,
    0,
  );
  // Single Item Delete Handler
  const handleDeleteItem = async (itemId: string) => {
    if (isUpdating) return;
    try {
      setIsUpdating(itemId);
      await cartServices.deleteItem(itemId);

      // Success Toast
      toast.success("Item removed from cart", {
        description: "Your cart has been updated.",
      });

      await fetchCartData();
    } catch (error) {
      console.error("Failed to delete item", error);
      toast.error("Could not delete item", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsUpdating(null);
    }
  };

  // Clear All Cart Handler
  const handleClearCart = async () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      try {
        await cartServices.clearCart();

        // Success Toast
        toast.success("Cart cleared", {
          description: "All items have been removed.",
        });

        await fetchCartData();
      } catch (error) {
        console.error("Failed to clear cart", error);
        toast.error("Failed to clear cart");
      }
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={onClose}
      />

      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        {/* Header section-e update koro */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-yellow-500" />
              <span className="font-bold text-lg">
                My Cart ({cartItems.length})
              </span>
            </div>
            {/* Ekhane Clear All button-ti add koro */}
            {cartItems.length > 0 && (
              <button
                onClick={handleClearCart}
                className="text-xs text-red-500 hover:underline text-left mt-1"
              >
                Clear All
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto p-4 h-[calc(100vh-200px)]">
          {isLoading ? (
            // --- Loading Skeleton ---
            <>
              <CartSkeleton />
              <CartSkeleton />
              <CartSkeleton />
            </>
          ) : cartItems.length > 0 ? (
            cartItems.map((item: any) => (
              <div
                key={item.id}
                className="flex gap-4 mb-6 border-b pb-4 relative"
              >
                <div className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-100">
                  <Image
                    src={item.meal.image || "https://via.placeholder.com/150"}
                    alt={item.meal.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-sm text-gray-800">
                      {item.meal.name}
                    </h3>
                    {isUpdating === item.id && (
                      <Loader2
                        size={14}
                        className="animate-spin text-yellow-500"
                      />
                    )}
                  </div>
                  <p className="text-yellow-600 font-bold mt-1">
                    ৳ {item.meal.price}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button
                        disabled={isUpdating === item.id}
                        onClick={() =>
                          handleUpdateQuantity(item.id, "decrease")
                        }
                        className="p-1 px-2 hover:bg-gray-100 disabled:opacity-50"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-3 text-sm font-medium border-x">
                        {item.quantity}
                      </span>
                      <button
                        disabled={isUpdating === item.id}
                        onClick={() =>
                          handleUpdateQuantity(item.id, "increase")
                        }
                        className="p-1 px-2 hover:bg-gray-100 disabled:opacity-50"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-red-500 hover:bg-red-50 p-1 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 text-gray-500">
              Your cart is empty
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && !isLoading && (
          <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t">
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-bold text-xl">৳ {subtotal.toFixed(2)}</span>
            </div>

            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg transition active:scale-95">
              <Link href={"/orders/checkout"}>Proceed to Checkout</Link>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebarCom;
