import { RecipePreview } from "@/types/recipeTypes";

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
    //   next: { revalidate: 3600 },
    // },
  );
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export { getRecipesByCategory };
