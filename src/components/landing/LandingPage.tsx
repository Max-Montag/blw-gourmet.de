import React from "react";
import Link from "next/link";
import Image from "next/image";
import CategoryList from "@/components/recipe/categories/CategoryList";
import { lato } from "@/styles/fonts";
import "@/app/globals.css";
import "@/styles/gradient-animation.css";
import RecipeSlider from "../recipe/RecipeSlider";
import { getRecipesByCategory, getAllArticlesData } from "@/utils/apiUtils";
import WhatIsBlw from "@/components/what-is-blw/WhatIsBlw";
import ArticleList from "../article/ArticleList";

const categories = [
  "Frühstück",
  "tiefkühlgeeignet",
  "schnell",
  "vegetarisch",
  "vegan",
  "Mittagessen",
  "Abendessen",
  "Snack",
  "Frühstück",
  "Mittagessen",
  "Abendessen",
  // "Snack",
];

export default async function LandingPage() {
  const category = await Promise.all(
    categories.map(async (category) => {
      return await getRecipesByCategory(category);
    }),
  );

  const articles = await getAllArticlesData();
  return (
    <div className={`w-full overflow-x-clip py-6 ${lato.className}`}>
      <Image
        src="/bg.webp"
        alt=""
        fill={true}
        className="absolute object-cover w-full h-full top-0 left-0 -z-30 transform -translate-y-[1px]"
        priority
      />
      <div className="absolute object-cover w-full h-full bg-gradient-to-b from-cyan-950 to-transparent to-90% top-0 left-0 -z-20"></div>
      <div className="absolute object-cover w-full h-full bg-gradient-to-b from-transparent to-white from-60% top-0 left-0 -z-10"></div>

      <section className="w-full min-h-screen -mt-[var(--header-height)] flex justify-center items-center">
        <div className="w-full min-h-fit py-4 flex flex-wrap justify-center items-center">
          <div className="mx-8 mt-2 px-4 w-10/12 lg:w-7/12 text-center lg:text-start">
            <h1 className="animated-gradient py-4 font-bold xxs:font-black text-4xl xxs:text-5xl xs:text-6xl lg:text-7xl 2xl:text-8xl text-transparent">
              Leckere Rezepte für euer Baby-led Weaning Abenteuer
            </h1>
            <p className="xxs:mx-6 sm:mx-16 lg:mx-0 lg:w-8/12 mt-2 xxs:mt-6 py-4 px-8 text-cyan-950 bg-cyan-50 bg-opacity-60 backdrop-blur-sm rounded-lg lg:rounded-r-full font-bold text-xl md:text-2xl lg:text-3xl">
              Fördere die Selbstständigkeit eures Babys von Anfang an
            </p>
          </div>
          <div className="w-full md:w-7/12 lg:w-4/12 my-4 xs:px-16 md:px-0 ">
            <div className="hidden lg:block py-4">
              <CategoryList amount={4} />
            </div>
            <div className="w-full py-4 flex justify-center items-center group">
              <Link
                href="/rezepte"
                className="w-fit bg-cyan-100 group-hover:bg-cyan-50 text-cyan-950 text-xl xs:text-2xl font-bold py-6 lg:px-8 px-6 lg:px-8 rounded-full flex justify-center items-center"
              >
                <p>Rezepte entdecken</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {category && category.length > 0 && (
        <section
          id="rezepte-entdecken"
          className="w-full flex justify-center py-8"
        >
          <div className="w-svw text-center md:text-start">
            {category.map(
              (recipes, index) =>
                recipes &&
                recipes.length > 0 && (
                  <div className="mb-8 mb:mt-12" key={"recipe_slider_" + index}>
                    <RecipeSlider name={categories[index]} recipes={recipes} />
                  </div>
                ),
            )}
          </div>
        </section>
      )}

      <section className="w-full flex justify-center">
        <WhatIsBlw />
      </section>

      <section className="w-full flex flex-col text-center justify-center pb-8 px-8 lg:px-16">
        <h1 className="w-full text-center text-3xl xxs:text-4xl md:text-5xl lg:text-6xl lg:text-7xl 2lg:text-8xl text-cyan-950 font-bold mb-12">
          Tipps zum Beikoststart
        </h1>
        <ArticleList articles={articles} />
      </section>
    </div>
  );
}
