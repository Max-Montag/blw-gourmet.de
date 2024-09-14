"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { LuImagePlus, LuSave } from "react-icons/lu";
import { FaSpinner } from "react-icons/fa6";
import { RecipeData } from "@/types/recipeTypes";
import EditRecipeDisplay from "@/components/recipe/EditRecipeDisplay";
import RecipeDisplay from "@/components/recipe/RecipeDisplay";
import LoadingAnimation from "@/components/common/loadingAnimation/LoadingAnimation";
import ErrorMessage from "@/components/error/ErrorMessage";

const EditRecipe: React.FC = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const { url } = useParams<{ url: string }>();
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const ensureEmptyFields = (data: RecipeData): RecipeData => {
    return {
      ...data,
      labels:
        data.labels && data.labels[data.labels.length - 1] !== ""
          ? [...data.labels, ""]
          : data.labels || [""],
      ingredients: data.ingredients
        ? data.ingredients.length > 0
          ? data.ingredients[data.ingredients.length - 1]?.ingredient !== ""
            ? [...data.ingredients, { ingredient: "", amount: 0, unit: "" }]
            : data.ingredients || [{ ingredient: "", amount: 0, unit: "" }]
          : [{ ingredient: "", amount: 0, unit: "" }]
        : [{ ingredient: "", amount: 0, unit: "" }],
      tools:
        data.tools && data.tools[data.tools.length - 1] !== ""
          ? [...data.tools, ""]
          : data.tools || [""],
      instructions: data.instructions
        ? [
            ...data.instructions.map((instruction) => ({
              ...instruction,
              ingredients:
                instruction.ingredients && instruction.ingredients.length > 0
                  ? instruction.ingredients[instruction.ingredients.length - 1]
                      ?.ingredient !== ""
                    ? [
                        ...instruction.ingredients,
                        { ingredient: "", amount: 0, unit: "" },
                      ]
                    : instruction.ingredients
                  : [{ ingredient: "", amount: 0, unit: "" }],
              tools:
                instruction.tools && instruction.tools.length > 0
                  ? instruction.tools[instruction.tools.length - 1] !== ""
                    ? [...instruction.tools, ""]
                    : instruction.tools
                  : [""],
            })),
            ...(data.instructions.length === 0 ||
            data.instructions[data.instructions.length - 1]?.instruction !== ""
              ? [
                  {
                    name: "",
                    ingredients: [{ ingredient: "", amount: 0, unit: "" }],
                    tools: [""],
                    instruction: "",
                  },
                ]
              : []),
          ]
        : [
            {
              name: "",
              ingredients: [{ ingredient: "", amount: 0, unit: "" }],
              tools: [""],
              instruction: "",
            },
          ],
      dining_times:
        data.dining_times &&
        data.dining_times[data.dining_times.length - 1] !== ""
          ? [...data.dining_times, ""]
          : data.dining_times || [""],
    };
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get<RecipeData>(
          `${apiUrl}/recipe/${url}/`,
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
        `${apiUrl}/recipe/update/${url}/`,
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

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0] && recipe) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      setImageUploading(true);

      try {
        const response = await axios.post(
          `${apiUrl}/recipe/upload-image/${recipe.url}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        if (response.status === 200) {
          const imageUrl = response.data.optimized_image_url;

          setRecipe((prevRecipe) =>
            prevRecipe ? { ...prevRecipe, optimized_image: imageUrl } : null,
          );
        }
      } catch (error) {
        console.error("Bildupload fehlgeschlagen:", error);
      } finally {
        setImageUploading(false);
      }
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

  return (
    <div className="relative w-full mx-auto lg:p-6 bg-white shadow-md rounded-md">
      <div className="mt-4 lg:mt-0 flex justify-center space-x-4 z-10 lg:absolute lg:top-12 lg:right-12">
        <LuSave
          className="w-14 h-14 text-zinc-800 hover:text-zinc-500 cursor-pointer"
          onClick={handleSubmit}
        />
        <label htmlFor="image-upload">
          {!imageUploading && (
            <LuImagePlus className="w-14 h-14 text-zinc-800 hover:text-zinc-500 cursor-pointer" />
          )}
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        {imageUploading && (
          <FaSpinner className="w-14 h-14 text-zinc-800 hover:text-zinc-500 cursor-pointer animate-spin" />
        )}
      </div>
      <div className="w-full flex flex-col lg:flex-row space-x-0 lg:space-x-4">
        <div className="w-full lg:w-1/2">
          <EditRecipeDisplay recipe={recipe} onRecipeChange={setRecipe} />
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
