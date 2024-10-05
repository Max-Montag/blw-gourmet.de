import type { Metadata } from "next";
import { noto } from "@/styles/fonts";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import CookieBanner from "@/components/cookieBanner/CookieBanner";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "BLW-gourmet.de",
  description:
    "Entdecke köstliche und einfache BLW-Rezepte für die kleinen und die ganze Familie.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body
        className={`flex flex-col min-h-screen break-words ${noto.className}`}
      >
        <Providers>
          <Header />
          <main className="flex flex-grow items-center justify-center pt-[var(--header-height)]">
            {children}
          </main>
          <CookieBanner />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
