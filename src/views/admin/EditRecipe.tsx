import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { LuImagePlus, LuSave } from "react-icons/lu";
import { FaSpinner } from "react-icons/fa6";
import { RecipeData } from "../../types/recipeTypes";
import EditRecipeDisplay from "./EditRecipeDisplay";
import RecipeDisplay from "../recipe/RecipeDisplay";

const RecipeLoader: React.FC = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { url } = useParams<{ url: string }>();
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get<RecipeData>(
          `${apiUrl}/recipe/${url}/`,
        );
        setRecipe(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load recipe. Please try again later.");
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [url]);

  // TODO this code is duplicated in AddRecipe.tsx (use formik!)
  const handleSubmit = async () => {
    if (!recipe) return;

    try {
      const validDiningTimes = ["lunch", "snack", "breakfast", "dinner"];
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
        navigate(`/admin/dashboard/`);
      }
    } catch (error) {
      console.error("There was an error updating the recipe!", error);
      alert("Failed to update recipe");
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
        console.error("Image upload failed:", error);
      } finally {
        setImageUploading(false);
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!recipe) {
    return (
      <div className="text-center mt-10 text-gray-500">Recipe not found.</div>
    );
  }

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="absolute z-10 top-10 right-12" onClick={handleSubmit}>
        <LuSave className="w-14 h-14 text-zinc-800 hover:text-zinc-500 hover:cursor-pointer" />
      </div>
      <div className="absolute z-10 top-10 right-28">
        <label htmlFor="image-upload">
          {!imageUploading && (
            <LuImagePlus className="w-14 h-14 text-zinc-800 hover:text-zinc-500 hover:cursor-pointer" />
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
          <FaSpinner className="w-14 h-14 text-zinc-800 hover:text-zinc-500 hover:cursor-pointer animate-spin" />
        )}
      </div>
      <div className="w-full flex space-x-4">
        <div className="w-1/2">
          <EditRecipeDisplay recipe={recipe} onRecipeChange={setRecipe} />
        </div>
        <div className="w-1/2">
          <RecipeDisplay recipe={recipe} />
        </div>
      </div>
    </div>
  );
};

export default RecipeLoader;
