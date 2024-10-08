"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { CookieConsentProvider } from "@/context/CookieConsentContext";
import { NotificationProvider } from "@/context/NotificationContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CookieConsentProvider>
        <NotificationProvider>{children}</NotificationProvider>
      </CookieConsentProvider>
    </AuthProvider>
  );
}
