import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { RecipeData } from "../../types/recipeTypes";
import RecipeDisplay from "./RecipeDisplay";
import LoadingAnimation from "../components/loadingAnimation/LoadingAnimation";
import ErrorMessage from "../components/error/ErrorMessage";

const LoadRecipe: React.FC = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { url } = useParams<{ url: string }>();
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get<RecipeData>(
          `${apiUrl}/recipe/${url}/`,
        );
        setRecipe(response.data);
        setLoading(false);
      } catch (err) {
        setError("Fehler beim abrufen vom Server.");
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
    return <ErrorMessage message={error} />;
  }

  if (!recipe) {
    return <ErrorMessage message="Rezept nicht gefunden!" />;
  }

  return <RecipeDisplay recipe={recipe} />;
};

export default LoadRecipe;
