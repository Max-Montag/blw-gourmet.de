import React from "react";
import Link from "next/link";
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
    <>
      {name && (
        <Link
          href={`/rezepte/${name}`}
          className="text-xl sm:text-2xl text-cyan-900 hover:text-cyan-700 font-bold md:ml-8 mb-2 underline underline-offset-[3px]"
        >
          {`${name.charAt(0).toUpperCase() + name.slice(1)}`}
        </Link>
      )}
      <div className="overflow-x-auto snap-x snap-mandatory scroll-pl-6 scroll-pr-6 scrollbar-hide">
        <div className="flex space-x-4 py-4 pl-2">
          {recipes.map((recipe) => (
            <div key={recipe.name} className="snap-center shrink-0 w-72">
              <RecipeListCard recipe={recipe} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecipeSlider;
