import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TiArrowBack } from "react-icons/ti";
import EditRecipeDisplay from "./EditRecipeDisplay";
import { RecipeData } from "../../types/recipeTypes";

const AddRecipe: React.FC = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
  const navigate = useNavigate();

  const handleRecipeChange = (updatedRecipe: RecipeData) => {
    setRecipe(updatedRecipe);
  };

  // TODO this code is duplicated in EditRecipe.tsx (use formik!)
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
        navigate(`/admin/dashboard`);
      }
    } catch (error) {
      console.error("There was an error creating the recipe!", error);
      alert("Failed to create recipe");
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="absolute z-10 top-6 right-10" onClick={handleSubmit}>
        <TiArrowBack className="w-24 h-24 text-zinc-800 hover:text-zinc-500" />
      </div>
      <EditRecipeDisplay onRecipeChange={handleRecipeChange} />
    </div>
  );
};

export default AddRecipe;
