import React from "react";
import Link from "next/link";
import { shuffle } from "@/utils/arrayUtils";
import { RecipePreview } from "@/types/recipeTypes";
import RecipeListCard from "@/components/recipe/RecipeListCard";

interface RecipeSliderProps {
  recipes: RecipePreview[];
  name?: string;
}

const RecipeSlider: React.FC<RecipeSliderProps> = ({ recipes, name }) => {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        Keine Rezepte gefunden.
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-100 pt-4 px-4">
      {name && (
        <Link
          href={`/rezepte/${name}`}
          className="text-xl sm:text-2xl text-cyan-900 hover:text-cyan-700 font-bold md:ml-8 mb-2 underline underline-offset-[3px]"
        >
          {`${name.charAt(0).toUpperCase() + name.slice(1)}`}
        </Link>
      )}
      <div className="overflow-x-auto snap-x snap-mandatory scroll-pl-6 scroll-pr-6 scrollbar-hide">
        <div className="flex pt-4 pb-8">
          {shuffle(recipes).map((recipe) => (
            <div key={recipe.name} className="snap-center shrink-0 w-72 mx-4">
              <RecipeListCard recipe={recipe} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeSlider;
