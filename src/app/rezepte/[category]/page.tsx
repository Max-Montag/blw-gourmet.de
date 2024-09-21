import React from "react";
import { RecipePreview } from "@/types/recipeTypes";
import Category from "@/components/recipe/categories/Category";
import ErrorMessage from "@/components/error/ErrorMessage";
import NoRecipesAvailable from "@/components/error/NoRecipesAvailable";

interface ListRecipesProps {
  params: { category: string };
}

async function getRecipesByCategory(
  category: string,
): Promise<RecipePreview[] | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recipes/category/?category=${category}`,
    {
      cache: "no-cache",
    },
    // TODO uncomment
    // {
    //   cache: "force-cache",
    //   next: { revalidate: 3600 },
    // },
  );
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recipes/categories/`,
    {
      next: { revalidate: 86400 },
    },
  );
  if (!res.ok) {
    return [];
  }
  const categories: string[] = await res.json();
  return categories.map((category) => ({
    category,
  }));
}

export default async function ListRecipes({ params }: ListRecipesProps) {
  const { category } = params;
  const decodedCategory = decodeURIComponent(category);
  const recipes = await getRecipesByCategory(category);

  if (!recipes) {
    return <ErrorMessage message="Fehler beim Abrufen vom Server." />;
  }

  if (recipes.length === 0) {
    return <NoRecipesAvailable />;
  }

  return <Category name={decodedCategory} recipes={recipes} />;
}
