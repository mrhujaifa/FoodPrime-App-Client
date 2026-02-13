"use server";

import { adminServices } from "@/services/admin.services";
import { cookies } from "next/headers";

export const updateUserStatusAction = async (
  userId: string,
  status: string,
) => {
  try {
    const cookieStore = (await cookies()).toString();
    const result = await adminServices.changeUserStatus(
      userId,
      status,
      cookieStore,
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};
