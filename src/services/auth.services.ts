import { authClient } from "@/lib/auth-client";
import { signInInput, signUpInput } from "@/types";

export const authServices = {
  signUp: async (payload: signUpInput) => {
    const { email, password, name } = payload;
    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onRequest: () => {
          console.log("Authentication started...");
        },
        onSuccess: (ctx) => {
          console.log("Welcome!", ctx.data.user.name);
        },
        onError: (ctx) => {
          console.error("Auth Error:", ctx.error.message);
        },
      },
    );

    return { data, error };
  },

  signIn: async (payload: signInInput) => {
    const { email, password } = payload;
    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: () => {
          console.log("Authentication started...");
        },
        onSuccess: (ctx) => {
          console.log("Welcome!", ctx.data.user.name);
        },
        onError: (ctx) => {
          console.error("Auth Error:", ctx.error.message);
        },
      },
    );
    return { data, error };
  },
};
