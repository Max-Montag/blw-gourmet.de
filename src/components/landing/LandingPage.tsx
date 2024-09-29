import React from "react";
import Image from "next/image";
import CategoryList from "@/components/recipe/categories/CategoryList";
import "./gradient-animation.css";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "900"],
});

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center text-center py-6">
      <Image
        src="/vegetables.webp"
        alt=""
        fill={true}
        className="absolute object-cover w-full top-0 left-0 -z-30"
      />
      <div className="absolute w-full h-full bg-gradient-to-b from-cyan-950 to-transparent to-90% top-0 left-0 -z-20"></div>
      <div className="absolute w-full h-full bg-gradient-to-b from-transparent to-zinc-50 from-60% top-1 left-0 -z-10"></div>
      <section
        className={`my-8 mx-8 lg:mt-12 px-4 w-10/12 lg:w-7/12 ${lato.className}`}
      >
        <h1 className="animated-gradient text-start text-3xl xxs:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold bg-clip-text text-transparent">
          Leckere Rezepte für euer Baby-led Weaning Abenteuer
        </h1>

        <p className="w-2/3 xxs:text-lg md:text-xl lg:text-2xl xl:text-3xl text-start text-cyan-50 font-light mt-2 xxs:mt-6">
          Weitere Catchy Information, warum BLW nice ist.
        </p>
      </section>

      <section className="max-w-4xl mx-auto">
        <CategoryList />
      </section>
    </div>
  );
};

export default LandingPage;
