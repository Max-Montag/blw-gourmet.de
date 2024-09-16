"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaSave } from "react-icons/fa";
import { RecipeData } from "@/types/recipeTypes";
import EditRecipeDisplay from "@/components/recipe/EditRecipeDisplay";
import RecipeDisplay from "@/components/recipe/RecipeDisplay";
import { ensureEmptyFields } from "@/utils/recipeUtils";
import LoadingAnimation from "@/components/common/loadingAnimation/LoadingAnimation";
import ErrorMessage from "@/components/error/ErrorMessage";
import ImageUpload from "@/components/common/ImageUpload";

interface EditRecipeProps {
  params: {
    url: string;
  };
}

const EditRecipe: React.FC<EditRecipeProps> = ({ params }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { url } = params;
  const router = useRouter();
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const setImageUrl = (url: string) => {
    if (!recipe) {
      return;
    }
    setRecipe({ ...recipe, optimized_image: url });
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get<RecipeData>(
          `${apiUrl}/recipes/recipe/recipe-detail/${url}/`,
        );
        setRecipe(ensureEmptyFields(response.data));
        setLoading(false);
      } catch (err) {
        setError("Fehler beim Abrufen vom Server.");
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [url, apiUrl]);

  const handleSubmit = async () => {
    if (!recipe) return;

    try {
      const validDiningTimes = [
        "Frühstück",
        "Mittagessen",
        "Abendessen",
        "Snack",
      ];
      const filteredData = {
        ...recipe,
        dining_times: recipe.dining_times.filter((time) =>
          validDiningTimes.includes(time),
        ),
        labels: recipe.labels.filter((label) => label !== ""),
        ingredients: recipe.ingredients.filter(
          (ingredient) =>
            ingredient.ingredient !== "" ||
            ingredient.amount !== 0 ||
            ingredient.unit !== "",
        ),
        tools: recipe.tools.filter((tool) => tool !== ""),
        instructions: recipe.instructions.map((instruction) => ({
          ...instruction,
          ingredients: instruction.ingredients.filter(
            (ingredient) =>
              ingredient.ingredient !== "" ||
              ingredient.amount !== 0 ||
              ingredient.unit !== "",
          ),
          tools: instruction.tools.filter((tool) => tool !== ""),
        })),
      };

      const response = await axios.put(
        `${apiUrl}/recipes/recipe/update/${url}/`,
        JSON.stringify(filteredData),
      );
      if (response.status === 200) {
        router.push(`/admin/dashboard/`);
      }
    } catch (error) {
      console.error("Es ist ein Fehler aufgetreten:", error);
      alert("Fehler beim Speichern!");
    }
  };

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const updatedRecipe = ensureEmptyFields(JSON.parse(e.target.value));
      const imageUrl = recipe?.optimized_image;
      if (imageUrl) {
        updatedRecipe.optimized_image = imageUrl;
      }
      setRecipe(updatedRecipe);
    } catch (error) {
      console.error("Ungültiges JSON-Format", error);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.target.select();
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

  if (!recipe) {
    return <ErrorMessage message="Rezept nicht gefunden!" />;
  }

  const navButtons = (
    <div className="flex justify-center my-4 space-x-4">
      <FaSave
        className="w-14 h-14 text-zinc-800 hover:text-zinc-500 cursor-pointer"
        onClick={handleSubmit}
      />
      <ImageUpload
        setImageUrl={setImageUrl}
        uploadUrl={`/recipes/recipe/upload-image/${url}/`}
      />
    </div>
  );

  return (
    <div className="relative w-full mx-auto lg:p-6 bg-white shadow-md rounded-md">
      <div className="w-full flex flex-col lg:flex-row space-x-0 lg:space-x-4">
        <div className="w-full lg:w-1/2">
          {navButtons}
          <EditRecipeDisplay recipe={recipe} onRecipeChange={setRecipe} />
          {navButtons}
        </div>
        <div className="w-full lg:w-1/2 flex flex-col flex-grow">
          <div className="min-h-48">
            <RecipeDisplay recipe={recipe} />
          </div>
          <div className="flex-grow mt-4">
            <textarea
              value={JSON.stringify(recipe, null, 2)}
              onChange={handleJsonChange}
              onFocus={handleFocus}
              className="w-full h-full min-h-[600px] p-2 bg-zinc-50 rounded-md text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;
