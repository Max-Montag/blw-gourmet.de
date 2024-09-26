"use client";

// export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import LoadingAnimation from "@/components/common/loadingAnimation/LoadingAnimation";
import ErrorMessage from "@/components/error/ErrorMessage";
import EditRecipeList from "@/components/recipe/EditRecipeList";
import { AdminRecipePreview } from "@/types/recipeTypes";

const MyRecipesPage: React.FC = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [recipes, setRecipes] = useState<AdminRecipePreview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const response = await axios.get<AdminRecipePreview[]>(
          `${apiUrl}/recipes/my-recipes/`,
        );
        setRecipes(response.data);
        setLoading(false);
      } catch (err) {
        setError("Fehler beim Laden deiner Rezepte.");
        setLoading(false);
      }
    };

    fetchMyRecipes();
  }, [apiUrl]);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd.MM.yyyy, HH:mm");
  };

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
    <div className="max-w-4xl mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4 pl-2 md:pl-0">Meine Rezepte</h2>
      <EditRecipeList
        recipes={recipes}
        apiUrl={apiUrl}
        handleAddRecipe={() => {}}
        openDeleteRecipeModal={() => {}}
        formatDate={formatDate}
      />
    </div>
  );
};

export default MyRecipesPage;
