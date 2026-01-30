"use server";

import { userService } from "@/services/user.services";

export const getSessionAction = async () => {
  const session = await userService.getSession();
  return session;
};
