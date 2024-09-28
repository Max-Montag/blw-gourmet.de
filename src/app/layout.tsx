import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import "./globals.css";
import { Providers } from "./providers";

const noto = Noto_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

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
      <body className={`flex flex-col min-h-screen ${noto.className}`}>
        <Providers>
          <Header />
          <main className="flex flex-grow items-center justify-center pt-[var(--header-height)]">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
