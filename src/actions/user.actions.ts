"use server";

import { userService } from "@/services/user.services";

export const getSessionAction = async () => {
  const session = await userService.getSession();

  const data = session.data;
  const error = session.error;
  return { data, error };
};
