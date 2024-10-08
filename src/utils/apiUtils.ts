import { RecipePreview } from "@/types/recipeTypes";
import { ArticlePreviewData } from "@/types/articleTypes";

async function getCategories(): Promise<string[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recipes/categories/`,
    {
      cache: "no-cache",
    },
    // TODO uncomment
    // {
    //   next: { revalidate: 86400 },
    // },
  );
  if (!res.ok) {
    return [];
  }
  return await res.json();
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
    //   next: { revalidate: 3600 },
    // },
  );
  if (!res.ok) {
    return null;
  }
  return res.json();
}

async function getAllArticlesData(): Promise<ArticlePreviewData[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/all-articles/`,
    {
      cache: "no-cache",
    },
    // TODO uncomment
    // {
    //   next: { revalidate: 3600 },
    // },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }
  return res.json();
}

export { getCategories, getRecipesByCategory, getAllArticlesData };
