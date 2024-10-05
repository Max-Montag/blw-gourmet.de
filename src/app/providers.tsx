"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { CookieConsentProvider } from "@/context/CookieConsentContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CookieConsentProvider>{children}</CookieConsentProvider>
    </AuthProvider>
  );
}
