"use server";

import { providerAPI } from "@/lib/api";
import { providerServices } from "@/services/provider.services";
import { CreateMealRequest } from "@/types";
import { cookies } from "next/headers";

export const getProviderOwnOrdersAction = async () => {
  const url = `${providerAPI}/meal-orders`;

  try {
    // ১. সার্ভার সাইড থেকে কুকি সংগ্রহ করা
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();

    // ২. ব্যাকেন্ড এপিআই-তে রিকোয়েস্ট পাঠানো
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: allCookies, // ম্যানুয়ালি কুকি পাস করা হচ্ছে
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
