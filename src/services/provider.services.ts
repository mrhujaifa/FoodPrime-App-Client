import { env } from "@/env";
import { ApiResponse, CreateMealRequest, Meal } from "@/types";

export const providerServices = {
  createMeal: async (
    payload: CreateMealRequest,
  ): Promise<ApiResponse<Meal>> => {
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
          errors: result.errors,
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
};
