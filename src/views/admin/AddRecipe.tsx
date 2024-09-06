import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoSaveOutline } from "react-icons/io5";
import EditRecipeDisplay from "./EditRecipeDisplay";
import { RecipeData } from "../../types/recipeTypes";
import RecipeDisplay from "../recipe/RecipeDisplay";

const AddRecipe: React.FC = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState<RecipeData>({
    url: "",
    name: "",
    description: "",
    labels: [""],
    ingredients: [{ ingredient: "", amount: 0, unit: "" }],
    tools: [""],
    instructions: [
      {
        name: "",
        ingredients: [{ ingredient: "", amount: 0, unit: "" }],
        tools: [""],
        instruction: "",
      },
    ],
    dining_times: [""],
    preparation_time: 0,
    rest_time: 0,
    optimized_image: "",
  });

  const handleRecipeChange = (updatedRecipe: RecipeData) => {
    setRecipe(updatedRecipe);
  };

  const handleSubmit = async () => {
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
      <div className="absolute z-10 top-6 right-10">
        <IoSaveOutline
          className="w-14 h-14 text-zinc-800 hover:text-zinc-500 hover:cursor-pointer"
          onClick={handleSubmit}
        />
      </div>
      <div className="w-full flex space-x-4">
        <div className="w-1/2">
          <EditRecipeDisplay
            recipe={recipe}
            onRecipeChange={handleRecipeChange}
          />
        </div>
        <div className="w-1/2">
          <RecipeDisplay recipe={recipe} />
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
