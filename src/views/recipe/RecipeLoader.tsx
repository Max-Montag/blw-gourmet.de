import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import RecipeDisplay from "./RecipeDisplay";

interface RecipeData {
  name: string;
  description: string;
  labels: string[];
  ingredients: { ingredient: string; amount: number; unit: string }[];
  tools: string[];
  instructions: {
    name: string;
    ingredients: { ingredient: string; amount: number; unit: string }[];
    tools: string[];
    instruction: string;
  }[];
  dining_times: string[];
  preparation_time: number | null;
  rest_time: number | null;
  optimized_image?: string | null;
}

const RecipeLoader: React.FC = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { url_identifier } = useParams<{ url_identifier: string }>();
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get<RecipeData>(
          `${apiUrl}/recipe/${url_identifier}/`,
        );
        setRecipe(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load recipe. Please try again later.");
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [url_identifier]);

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

  return <RecipeDisplay recipe={recipe} />;
};

export default RecipeLoader;
