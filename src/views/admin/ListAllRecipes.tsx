import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminRecipeList from "./AdminRecipeList";
import { AdminRecipePreview } from "../../types/recipeTypes";

const ListAllRecipes: React.FC = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [recipes, setRecipes] = useState<AdminRecipePreview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get<AdminRecipePreview[]>(
          `${apiUrl}/recipes/`,
        );
        setRecipes(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load recipes. Please try again later.");
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return <AdminRecipeList recipes={recipes} />;
};

export default ListAllRecipes;
