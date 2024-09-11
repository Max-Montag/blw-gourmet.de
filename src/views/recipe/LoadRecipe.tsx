import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { RecipeData } from "../../types/recipeTypes";
import RecipeDisplay from "./RecipeDisplay";
import LoadingAnimation from "../components/loadingAnimation/LoadingAnimation";

const LoadRecipe: React.FC = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { url } = useParams<{ url: string }>();
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <div className="text-center mt-10">
        <LoadingAnimation />
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!recipe) {
    return (
      <div className="text-center mt-10 text-gray-500">Recipe not found.</div>
    );
  }

  return <RecipeDisplay recipe={recipe} />;
};

export default LoadRecipe;
