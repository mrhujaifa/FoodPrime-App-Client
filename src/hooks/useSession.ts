import { authClient } from "@/lib/auth-client";
import { useMemo } from "react";

export const useUser = () => {
  const { data: session, isPending, error, refetch } = authClient.useSession();

  // User details ke simplify kora
  const user = useMemo(() => session?.user ?? null, [session]);

  return {
    user,
    session,
    isLoading: isPending,
    isAuthenticated: !!session,
    error,
    refreshUser: refetch,
  };
};
