/* eslint-disable @typescript-eslint/no-explicit-any */
import { providerAPI } from "@/lib/api";
import { CreateMealRequest, IMeal, Meal, UpdateMealPayload } from "@/types";
import { ApiResponse } from "@/types/api/api";
import {
  ICreateProviderProfile,
  IProviderProfile,
  IProviderProfileType,
} from "@/types/provider/providerProfile";
// import { cookies } from "next/headers";

export const providerServices = {
  createMeal: async (payload: CreateMealRequest, cookie: any) => {
    const url = `${providerAPI}/meals`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookie.toString(),
        },
        // credentials: "include",
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.message || "Failed to create meal",
        };
      }

      return {
        success: true,
        data: result.data as Meal,
        message: "Meal created successfully!",
      };
    } catch (error) {
      console.error("CREATE_MEAL_SERVICE_ERROR:", error);
      return {
        success: false,
        message: "Internal server error. Please try again later.",
      };
    }
  },
  createProviderProfile: async (payload: ICreateProviderProfile) => {
    const url = `${providerAPI}/become-a-partner`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.message || "Failed to create Provider PartnerShip",
          errors: result.errors,
        };
      }

      return {
        success: true,
        data: result.data as IProviderProfile,
        message: "Provider Partnership Apply successfully!",
      };
    } catch (error) {
      console.error("CREATE_MEAL_SERVICE_ERROR:", error);
      return {
        success: false,
        message: "Internal server error. Please try again later.",
      };
    }
  },
  getProviderPartnerShipRequest: async () => {
    const url = `${providerAPI}/become-a-partner/request`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message:
            result.message || "Failed to Get Provider PartnerShip request",
          errors: result.errors,
        };
      }

      return {
        success: true,
        data: result.data as IProviderProfile,
        message: "Get Provider Partnership request successfully!",
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Internal server error. Please try again later.",
      };
    }
  },

  getSingleProviderProfile: async (providerId: string) => {
    const url = `${providerAPI}/profile/${providerId}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.message || "Failed to Get Provider profile",
          errors: result.errors,
        };
      }

      return {
        success: true,
        data: result.data as IProviderProfileType,
        message: "Get Provider successfully!",
      };
    } catch (error) {
      console.error("Fetch Error:", error);
      return {
        success: false,
        message: "Internal server error.",
      };
    }
  },
  getProviderOwnMeals: async () => {
    const url = `${providerAPI}/own-meals`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.message || "Failed to Get Provider profile",
          errors: result.errors,
        };
      }

      return {
        success: true,
        data: result.data as IMeal,
        message: "Get Provider successfully!",
      };
    } catch (error) {
      console.error("Fetch Error:", error);
      return {
        success: false,
        message: "Internal server error.",
      };
    }
  },

  updateOwnMeal: async (
    mealId: string,
    payload: UpdateMealPayload,
  ): Promise<ApiResponse<IMeal>> => {
    const url = `${providerAPI}/meals/${mealId}`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.message || "Failed to update meal",
        };
      }

      return {
        success: true,
        data: result.data,
        message: "Meal updated successfully!",
      };
    } catch (error) {
      return {
        success: false,
        message: "Internal server error.",
      };
    }
  },

  getProviderOwnOrders: async () => {
    const url = `${providerAPI}/meal-orders`;

    // ১. সব কুকি স্ট্রিং হিসেবে গেট করা
    // const cookieStore = await cookies();
    // const allCookies = cookieStore.toString();

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // ২. কুকিগুলো হেডার হিসেবে পাঠাতে হবে
          // Cookie: allCookies,
        },
        credentials: "include",
        cache: "no-store",
      });

      if (response.status === 401) {
        return {
          success: false,
          message: "Session expired or unauthorized. Please login again.",
        };
      }

      const result = await response.json();
      if (!response.ok) {
        return {
          success: false,
          message: result.message || "Failed to fetch orders",
        };
      }

      return result;
    } catch (error) {
      console.error("Fetch Error:", error);
      return { success: false, message: "Network error or server is down." };
    }
  },

  deleteOwnMeals: async (mealId: string) => {
    const url = `${providerAPI}/meals/${mealId}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        cache: "no-store",
      });
      const result = await response.json();

      return result;
    } catch (error) {
      console.error("Fetch Error:", error);
      return {
        success: false,
        message: "Internal server error.",
      };
    }
  },
};
