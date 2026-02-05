import {
  CreateMealRequest,
  IMeal,
  Meal,
  MealsProviderProfile,
  UpdateMealPayload,
} from "@/types";
import { ApiResponse } from "@/types/api/api";
import {
  ICreateProviderProfile,
  IProviderProfile,
} from "@/types/provider/providerProfile";

export const providerServices = {
  createMeal: async (payload: CreateMealRequest) => {
    const url = `http://localhost:8080/api/provider/meals`;

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
    const url = `http://localhost:8080/api/provider/become-a-partner`;

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
    const url = `http://localhost:8080/api/provider/become-a-partner/request`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
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
    const url = `http://localhost:8080/api/provider/profile/${providerId}`;

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
        data: result.data as MealsProviderProfile,
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
    const url = `http://localhost:8080/api/provider/own-meals`;

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
    const url = `http://localhost:8080/api/provider/meals/${mealId}`;

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
};
