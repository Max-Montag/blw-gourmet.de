import { Noto_Sans, Lato } from "next/font/google";

export const noto = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});
