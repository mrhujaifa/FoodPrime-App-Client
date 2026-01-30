import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    BACKEND_API_URL: z.string().url(),
    AUTH_URL: z.string().url(),
  },

  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },

  runtimeEnv: {
    BACKEND_API_URL: process.env.BACKEND_API_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    AUTH_URL: process.env.AUTH_URL,
  },

  //* Treat empty strings as undefined
  emptyStringAsUndefined: true,
});
