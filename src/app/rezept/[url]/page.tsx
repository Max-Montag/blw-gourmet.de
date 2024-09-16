import React from "react";
import { RecipeData } from "@/types/recipeTypes";
import RecipeDisplay from "@/components/recipe/RecipeDisplay";
import NoRecipesAvailable from "@/components/error/NoRecipesAvailable";

interface RecipePageProps {
  params: { url: string };
}

async function getRecipeData(url: string): Promise<RecipeData | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recipes/recipe/recipe-detail/${url}/`,
    {
      cache: 'force-cache',
    },
  );
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recipes/all-recipes/`,
    {
      cache: 'force-cache',
    },
  );
  if (!res.ok) {
    return [];
  }
  const recipes: RecipeData[] = await res.json();
  return recipes.map((recipe) => ({
    url: recipe.url,
  }));
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = await getRecipeData(params.url);

  if (!recipe) {
    return <NoRecipesAvailable />;
  }

  return <RecipeDisplay recipe={recipe} />;
}
