import React, { useState } from "react";
import axios from "axios";
import EditRecipe from "./EditRecipe";
import { RecipeData } from "../../types/recipeTypes";

const AddRecipe: React.FC = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [recipe, setRecipe] = useState<RecipeData | null>(null);

  const handleRecipeChange = (updatedRecipe: RecipeData) => {
    setRecipe(updatedRecipe);
  };

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

      const response = await axios.post(
        `${apiUrl}/recipe/create/`,
        JSON.stringify(filteredData),
      );
      if (response.status === 201) {
        alert("Recipe successfully created!");
      }
    } catch (error) {
      console.error("There was an error creating the recipe!", error);
      alert("Failed to create recipe");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Recipe</h1>
      <EditRecipe onRecipeChange={handleRecipeChange} />
      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit Recipe
      </button>
    </div>
  );
};

export default AddRecipe;
