import axios from "axios";
import RecipeDisplay from "@/components/recipe/RecipeDisplay";
import NoRecipesAvailable from "@/components/error/NoRecipesAvailable";
import { RecipeData } from "@/types/recipeTypes";

async function getRecipeData(url: string): Promise<RecipeData> {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/recipes/recipe/recipe-detail/${url}/`,
  );
  return res.data;
}

export default async function RecipePage({
  params,
}: {
  params: { url: string };
}) {
  const recipe = await getRecipeData(params.url);

  if (!recipe) {
    return <NoRecipesAvailable />;
  }

  return <RecipeDisplay recipe={recipe} />;
}
