"use server";

import { cartServices } from "@/services/cart.service";
import { cookies } from "next/headers";

export const addToCartAction = async (mealId: string, quantity: number = 1) => {
  const cookieStore = (await cookies()).toString();
  try {
    const addtocart = await cartServices.addToCart(
      mealId,
      quantity,
      cookieStore,
    );

    return addtocart;
  } catch (error) {
    console.log(error);
  }
};

export const getCartItemAction = async () => {
  try {
    const cookieStore = (await cookies()).toString();
    const getcart = await cartServices.getCart(cookieStore);

    return getcart;
  } catch (error) {
    console.log(error);
  }
};
