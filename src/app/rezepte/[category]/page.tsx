"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import LoadingAnimation from "@/components/common/loadingAnimation/LoadingAnimation";
import NoRecipesAvailable from "@/components/error/NoRecipesAvailable";
import { RecipePreview } from "@/types/recipeTypes";
import IconText from "@/components/common/IconText";
import ErrorMessage from "@/components/error/ErrorMessage";
import Link from "next/link";

interface Props {
  params: { category: string };
}

export default function ListRecipes({ params }: Props) {
  const { category } = params;
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
          `${apiUrl}/category/?category=${category}`,
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

  return (
    <div className="max-w-4xl mx-auto py-4">
      {recipes.length > 0 ? (
        <>
          <h1 className="text-1.5xl text-zinc-700 font-semibold text-start px-4 mb-2">
            Kategorie: {category}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 scroll-smooth">
            {recipes.map((recipe) => {
              const combinedLabels = [...recipe.dining_times, ...recipe.labels];
              return (
                <Link
                  href={`/rezept/${recipe.url}`}
                  key={recipe.name}
                  className="flex flex-col justify-between bg-white shadow-sm hover:shadow-md rounded-md cursor-pointer"
                >
                  <div className="p-4">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${recipe.thumbnail}`}
                      alt={recipe.name}
                      className="w-full h-40 object-cover"
                    />
                    <h2 className="text-md+ font-bold my-2">{recipe.name}</h2>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {recipe.description || "Keine Beschreibung verfügbar"}
                    </p>
                  </div>
                  <div>
                    {combinedLabels.length > 0 && (
                      <div className="flex flex-wrap-reverse -m-1 pb-4 px-4">
                        {combinedLabels.map((label, index) => (
                          <div
                            key={index}
                            className="bg-cyan-50 text-cyan-700 text-xs md:text-md font-semibold m-0.5 px-1.5 py-0.5 rounded-xl border border-cyan-700"
                          >
                            <IconText text={label} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      ) : (
        <NoRecipesAvailable />
      )}
    </div>
  );
}
