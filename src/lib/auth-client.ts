// import { env } from "@/env";
// import { createAuthClient } from "better-auth/react";

// export const authClient = createAuthClient({
//   baseURL: env.NEXT_PUBLIC_APP_URL,
//   fetchOptions: {
//     credentials: "include",
//   },
// });

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
  basePath: "/api/auth",
  fetchOptions: {
    credentials: "include",
  },
});
