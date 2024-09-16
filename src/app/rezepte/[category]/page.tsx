"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Category from "@/components/recipe/categories/Category";
import LoadingAnimation from "@/components/common/loadingAnimation/LoadingAnimation";
import { RecipePreview } from "@/types/recipeTypes";
import ErrorMessage from "@/components/error/ErrorMessage";

interface Props {
  params: { category: string };
}

export default function ListRecipes({ params }: Props) {
  const { category } = params;
  const decodedCategory = decodeURIComponent(category);
  const [recipes, setRecipes] = useState<RecipePreview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get<RecipePreview[]>(
          `${apiUrl}/recipes/category/?category=${category}`,
        );
        setRecipes(response.data);
        setLoading(false);
      } catch (err) {
        setError("Fehler beim Abrufen vom Server.");
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [category, apiUrl]);

  if (loading) {
    return (
      <div className="text-center mt-10">
        <LoadingAnimation />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return <Category name={decodedCategory} recipes={recipes} />;
}
