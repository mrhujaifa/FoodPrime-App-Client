"use client";

import { useState, useEffect } from "react";
import { getSessionAction } from "@/actions/user.actions";

// Typescript thakle interface add kora bhalo, na thakle any thakuk
export const useSession = () => {
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSession = async () => {
    try {
      setIsLoading(true);
      const { data, error: sessionError } = await getSessionAction();

      if (sessionError) {
        setError(sessionError.message);
        setSession(null);
      } else {
        setSession(data);
        setError(null);
      }
    } catch (err) {
      setError("Failed to fetch session");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return {
    session,
    isLoading,
    error,
    user: session?.user || null,
    providerId: session?.user?.id || null,
    isAuthenticated: !!session?.user,
    refreshSession: fetchSession, // Jate dorkar hole manual refresh kora jay
  };
};
