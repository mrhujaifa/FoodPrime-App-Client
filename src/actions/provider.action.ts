/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { providerAPI } from "@/lib/api";
import { providerServices } from "@/services/provider.services";
import { CreateMealRequest, UpdateMealPayload } from "@/types";
import { cookies } from "next/headers";

export const getProviderOwnOrdersAction = async () => {
  const url = `${providerAPI}/meal-orders`;

  try {
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: allCookies,
      },
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "অর্ডারগুলো পাওয়া যায়নি।",
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error("Action Error:", error);
    return {
      success: false,
      message: "সার্ভারের সাথে যোগাযোগ করা সম্ভব হচ্ছে না।",
    };
  }
};

export const providerCreateMealAction = async (payload: CreateMealRequest) => {
  const cookieStore = await cookies();
  const creatMeal = await providerServices.createMeal(payload, cookieStore);
  return creatMeal;
};

export const getProviderOwnMealAction = async () => {
  const cookeStore = await cookies();
  const getMeals = await providerServices.getProviderOwnMeals(cookeStore);
  return {
    data: getMeals.data,
    success: getMeals.success,
    error: getMeals.errors,
  };
};

export const updateProviderOwnMealAction = async (
  mealId: string,
  payload: UpdateMealPayload,
) => {
  const cookieStore = await cookies();
  const updateMeal = await providerServices.updateOwnMeal(
    mealId,
    payload,
    cookieStore,
  );

  return {
    data: updateMeal.data,
    error: updateMeal.errors,
    message: updateMeal.message,
    success: updateMeal.success,
  };
};
