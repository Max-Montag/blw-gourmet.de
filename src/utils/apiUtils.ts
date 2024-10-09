import { RecipePreview } from "@/types/recipeTypes";
import { ArticlePreviewData } from "@/types/articleTypes";

async function getRecipesByCategory(
  category: string,
): Promise<RecipePreview[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recipes/category/?category=${category}`,
    {
      next: { revalidate: 3600 },
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }
  return res.json();
}

async function getAllArticlesData(): Promise<ArticlePreviewData[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/all-articles/`,
    {
      next: { revalidate: 3600 },
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }
  return res.json();
}

export { getRecipesByCategory, getAllArticlesData };
