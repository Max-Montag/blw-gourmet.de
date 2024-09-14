import type { Metadata } from "next";
import Head from "next/head";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import "./globals.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

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
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Marcellus&family=Teachers:ital,wght@0,400..800;1,400..800&display=swap"
          rel="stylesheet"
        />
        <title>BLW-Gourmet.de</title>
      </Head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center pt-header">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
