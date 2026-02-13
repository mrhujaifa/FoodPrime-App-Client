"use server";

import { reviewServices } from "@/services/review.services";
import { cookies } from "next/headers";

export const createReviewsAction = async (
  rating: number,
  comment: string,
  customerId: string,
  mealId: string,
) => {
  try {
    const cookieStore = (await cookies()).toString();
    const result = await reviewServices.createReview(
      rating,
      comment,
      customerId,
      mealId,
      cookieStore,
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};
