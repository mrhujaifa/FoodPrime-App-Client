import { mealAPI } from "@/lib/api";
import { Meal } from "@/types";

export const mealServices = {
  getAllMeals: async () => {
    const url = `${mealAPI}`;

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
          message: result.message || "Failed to Get All meals",
          errors: result.errors,
        };
      }

      return result.data;
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Internal server error. Please try again later.",
      };
    }
  },
  getMealCategories: async () => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const url = `${mealAPI}/categories`;

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
          message: result.message || "Failed to Get All meals categories ",
          errors: result.errors,
        };
      }

      return result.data;
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Internal server error. Please try again later.",
      };
    }
  },
};
