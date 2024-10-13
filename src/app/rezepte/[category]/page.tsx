import React from "react";
import RecipeList from "@/components/recipe/RecipeList";
import ErrorMessage from "@/components/error/ErrorMessage";
import NoRecipesAvailable from "@/components/error/NoRecipesAvailable";
import { getRecipesByCategory } from "@/utils/apiUtils";

interface CategoryProps {
  params: { category: string };
}

export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recipes/categories/`,
    {
      next: { revalidate: 86400 },
    }
  );
  if (!res.ok) {
    return [];
  }
  const categories: string[] = await res.json();
  return categories.map((category) => ({
    category,
  }));
}

export default async function Category({ params }: CategoryProps) {
  const { category } = params;
  const decodedCategory = decodeURIComponent(category);
  const recipes = await getRecipesByCategory(category);

  if (!recipes) {
    return <ErrorMessage message="Fehler beim Abrufen vom Server." />;
  }

  if (recipes.length === 0) {
    return <NoRecipesAvailable />;
  }

  return <RecipeList name={decodedCategory} recipes={recipes} />;
}
