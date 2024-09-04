import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import IconText from "../components/IconText";
import { mapDiningTime } from "../utils/diningTimeUtil";

interface Ingredient {
  ingredient: string;
  amount: number;
  unit: string;
}

interface Instruction {
  name: string;
  ingredients: Ingredient[];
  tools: string[];
  instruction: string;
}

interface RecipeData {
  name: string;
  description: string;
  labels: string[];
  ingredients: Ingredient[];
  tools: string[];
  instructions: Instruction[];
  dining_times: string[];
  preparation_time: number | null;
  rest_time: number | null;
  optimized_image?: string | null;
}

const Recipe: React.FC = () => {
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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md scroll-smooth teachers-regular">
      {recipe.optimized_image && (
        <img
          src={recipe.optimized_image}
          alt={recipe.name}
          className="w-full h-64 object-cover rounded-md mb-6"
        />
      )}
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{recipe.name}</h1>
      <p className="text-gray-700 mb-6">{recipe.description}</p>
      <div className="flex flex-wrap mb-6">
        {recipe.labels.map((label, index) => (
          <div
            key={index}
            className="bg-indigo-200 text-indigo-800 text-xs font-medium mr-2 px-2 py-1 rounded"
          >
            <IconText text={label} />
          </div>
        ))}
      </div>
      <div className="mb-6">
        <p className="text-gray-700">
          <strong>Kategorie: </strong>
          {recipe.dining_times.map((diningTime, index) => (
            <span key={index}>{mapDiningTime(diningTime)} </span>
          ))}
        </p>
        {recipe.preparation_time ? (
          <p className="text-gray-700">
            <strong>Zubereitungszeit:</strong> {recipe.preparation_time} Minuten
          </p>
        ) : null}
        {recipe.rest_time ? (
          <p className="text-gray-700">
            <strong>Warte oder Back-Zeit:</strong> {recipe.rest_time} Minuten
          </p>
        ) : null}
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">Zutaten</h2>
        <ul className="list-disc pl-5">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="text-gray-700">
              {ingredient.amount} {ingredient.unit} {ingredient.ingredient}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">Utensilien</h2>
        <ul className="list-disc pl-5">
          {recipe.tools.map((tool, index) => (
            <li key={index} className="text-gray-700">
              <IconText text={tool} />
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-6 divide-y">
        <h2 className="w-full text-center text-2xl md:text-4xl font-semibold text-gray-700 mb-2">
          Rezept
        </h2>
        {recipe.instructions.map((instruction, index) => (
          <div key={index} className="py-4">
            <h3 className="text-lg font-semibold text-gray-800 marcellus-regular">
              Schritt {index + 1} - {instruction.name}
            </h3>
            {instruction.tools.length > 0 && (
              <p className="text-gray-700 mt-2">
                <span className="teachers-semibold">Utensilien:</span>{" "}
                {instruction.tools.join(", ")}
              </p>
            )}
            <ul className="list-disc pl-5 mt-2">
              {instruction.ingredients.map((ingredient, ingIndex) => (
                <li key={ingIndex} className="text-gray-700">
                  {ingredient.amount}
                  {" "}
                  {ingredient.unit} {ingredient.ingredient}
                </li>
              ))}
            </ul>
            <p className="text-gray-700 mt-4 teachers-semibold">
              {instruction.instruction}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipe;
