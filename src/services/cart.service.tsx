import { toast } from "sonner";

const apiURl = "http://localhost:8080/api";

export const cartServices = {
  async addToCart(mealId: string, quantity: number = 1) {
    try {
      const api = "http://localhost:8080/api";
      const response = await fetch(`${api}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mealId, quantity }),
        credentials: "include",
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to add to cart");
      }

      toast.success(result.message || "Added to cart!");
      return result.data;
    } catch (error) {
      throw error;
    }
  },
  async getCart() {
    try {
      const response = await fetch(`${apiURl}/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) return null;
      return result.data;
    } catch (error) {
      console.error("Cart fetch error:", error);
      return null;
    }
  },
  async updateQuantity(itemId: string, action: "increase" | "decrease") {
    try {
      const response = await fetch(
        "http://localhost:8080/api/cart/update-quantity",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemId, action }),
          credentials: "include",
          cache: "no-store",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update quantity");
      }

      // Backend theke jodi item delete hoye jay (quantity < 1)
      if (action === "decrease" && result.message.includes("deleted")) {
        toast.success("Item removed from cart");
      }

      return result.data;
    } catch (error) {
      throw error;
    }
  },

  // Single Item Delete
  async deleteItem(itemId: string) {
    try {
      const response = await fetch(`${apiURl}/cart/item/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Cookie ba Session-er jonno eita MUST
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete item");
      }

      return result;
    } catch (error) {
      throw error;
    }
  },

  // Clear Full Cart
  async clearCart() {
    try {
      const response = await fetch(`${apiURl}/cart/clear`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to clear cart");
      }

      return result;
    } catch (error) {
      throw error;
    }
  },
};
