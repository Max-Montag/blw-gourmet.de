import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaRegSave } from "react-icons/fa";
import { RecipeData } from "../../types/recipeTypes";
import EditRecipeDisplay from "./EditRecipeDisplay";

const RecipeLoader: React.FC = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { url } = useParams<{ url: string }>();
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
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
      <div className="absolute z-10 top-6 right-10" onClick={handleSubmit}>
        <FaRegSave className="w-16 h-16 text-zinc-700 hover:text-zinc-500 hover:cursor-pointer" />
      </div>
      <EditRecipeDisplay initialRecipe={recipe} onRecipeChange={setRecipe} />
    </div>
  );
};

export default RecipeLoader;
