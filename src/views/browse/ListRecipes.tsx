import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingAnimation from "../components/loadingAnimation/LoadingAnimation";
import { mapDiningTime } from "../../utils/diningTimeUtil";
import NoRecipesAvailable from "./NoRecipesAvailable";

interface RecipePreview {
  name: string;
  description: string;
  thumbnail: string;
  labels: string[];
  dining_times: string[];
}

const ListRecipes: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [recipes, setRecipes] = useState<RecipePreview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get<RecipePreview[]>(
          `${apiUrl}/category/?category=${category}`,
        );
        setRecipes(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load recipes. Please try again later.");
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [category, apiUrl]);

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

  return (
    <div className="max-w-4xl mx-auto py-6">
      {recipes.length > 0 ? (
        <>
          {" "}
          <h1 className="text-xl text-zinc-900 font-semibold text-start mb-6">
            Kategorie: {category}
          </h1>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recipes.map((recipe) => {
              const combinedLabels = [
                ...recipe.dining_times.map(mapDiningTime),
                ...recipe.labels,
              ];
              return (
                <li
                  key={recipe.name}
                  className="bg-white shadow-sm hover:shadow-md rounded-md cursor-pointer"
                >
                  <img
                    src={`${process.env.REACT_APP_API_URL}${recipe.thumbnail}`}
                    alt={recipe.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-bold mb-2">{recipe.name}</h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {recipe.description || "Keine Beschreibung verfügbar"}
                    </p>
                    {combinedLabels.length > 0 && (
                      <div className="flex flex-wrap -m-1">
                        {combinedLabels.map((label, index) => (
                          <div
                            key={index}
                            className="bg-cyan-50 text-cyan-700 text-sm md:text-md font-semibold m-1 px-2 py-0.5 rounded-xl border-2 border-cyan-700"
                          >
                            {label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <NoRecipesAvailable />
      )}
    </div>
  );
};

export default ListRecipes;
