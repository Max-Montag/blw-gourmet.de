import React from "react";
import { RecipeData } from "@/types/recipeTypes";
import RecipeDisplay from "@/components/recipe/RecipeDisplay";
import ErrorMessage from "@/components/error/ErrorMessage";

interface RecipePageProps {
  params: { url: string };
}

async function getRecipeData(url: string): Promise<RecipeData | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recipes/recipe/recipe-detail/${url}/`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recipes/all-recipe-urls/`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) {
    return [];
  }
  const urls: string[] = await res.json();
  return urls.map((url) => ({ url }));
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = await getRecipeData(params.url);

  if (!recipe) {
    return (
      <ErrorMessage message="Dieses Rezept konnte nicht gefunden werden." />
    );
  }

  return <RecipeDisplay recipe={recipe} />;
}
