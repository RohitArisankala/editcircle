"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "./supabase/client";
import { ADMIN_EMAIL } from "./supabase/config";

export interface AdminAuthState {
  loading: boolean;
  user: User | null;
  /** True when signed in AND (no allowlist set OR email matches it). */
  isAdmin: boolean;
}

export function useAdminAuth(): AdminAuthState {
  const [state, setState] = useState<AdminAuthState>({
    loading: true,
    user: null,
    isAdmin: false,
  });

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setState({ loading: false, user: null, isAdmin: false });
      return;
    }

    const evaluate = (user: User | null) => {
      const isAdmin =
        !!user && (!ADMIN_EMAIL || user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase());
      setState({ loading: false, user, isAdmin });
    };

    supabase.auth.getUser().then(({ data }) => evaluate(data.user));

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      evaluate(session?.user ?? null);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  return state;
}
