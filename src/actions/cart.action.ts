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
export const updateCartQuantityAction = async (
  itemId: string,
  action: "increase" | "decrease",
) => {
  try {
    const cookieStore = (await cookies()).toString();
    const result = await cartServices.updateQuantity(
      itemId,
      action,
      cookieStore,
    );

    return result;
  } catch (error) {
    console.log(error);
  }
};
export const deleteCartItemAction = async (itemId: string) => {
  try {
    const cookieStore = (await cookies()).toString();
    const result = await cartServices.deleteItem(itemId, cookieStore);

    return result;
  } catch (error) {
    console.log(error);
  }
};
export const deleteCartAllItemsAction = async () => {
  try {
    const cookieStore = (await cookies()).toString();
    const result = await cartServices.clearCart(cookieStore);

    return result;
  } catch (error) {
    console.log(error);
  }
};
