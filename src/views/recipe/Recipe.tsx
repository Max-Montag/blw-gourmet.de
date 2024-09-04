import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PiTimerFill } from "react-icons/pi";
import IconText from "../components/IconText";
import { mapDiningTime } from "../utils/diningTimeUtil";
import "./styles/recipe.css";

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

  const combinedLabels = [
    ...recipe.dining_times.map(mapDiningTime),
    ...recipe.labels,
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md scroll-smooth teachers-regular">
      <div className="relative">
        {recipe.optimized_image && (
          <img
            src={recipe.optimized_image}
            alt={recipe.name}
            className="w-full h-72 object-cover"
          />
        )}
        {combinedLabels.length > 0 && (
          <div className="absolute w-full bottom-0 p-2 pt-[14px] bg-zinc-400 bg-opacity-40 flex flex-wrap frayed-edge">
            {combinedLabels.map((label, index) => (
              <div
                key={index}
                className="bg-indigo-200 text-indigo-800 text-xs font-medium m-1 px-2 py-1 rounded"
              >
                <IconText text={label} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="p-6">
        <h1 className="text-2xl lg:text-4xl font-bold mb-4 text-center text-gray-800 marcellus-semibold">
          {recipe.name}
        </h1>
        {recipe.description ? (
          <p className="text-gray-700 mb-4 text-center">{recipe.description}</p>
        ) : (
          <p className="text-gray-700 mb-4 text-center">
            Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle
            Buchstaben da sind und wie sie aussehen. Manchmal benutzt man Worte
            wie Hamburgefonts, Rafgenduks oder Handgloves, um Schriften zu
            testen. Manchmal Sätze, die alle Buchstaben des Alphabets enthalten
            - man nennt diese Sätze »Pangrams«. Sehr bekannt ist dieser: The
            quick brown fox jumps over the lazy old dog. Oft werden in
            Typoblindtexte auch fremdsprachige Satzteile eingebaut (AVAIL® and
            Wefox™ are testing aussi la Kerning), um die Wirkung in anderen
            Sprachen zu testen. In Lateinisch sieht zum Beispiel fast jede
            Schrift gut aus. Quod erat demonstrandum. Seit 1975 fehlen in den
            meisten Testtexten die Zahlen, weswegen nach TypoGb. 204 § ab dem
            Jahr 2034 Zahlen in 86 der Texte zur Pflicht werden. Nichteinhaltung
            wird mit bis zu 245 € oder 368 $ bestraft. Genauso wichtig in sind
            mittlerweile auch Âçcèñtë, die in neueren Schriften aber fast immer
            enthalten sind. Ein wichtiges aber schwierig zu integrierendes Feld
            sind OpenType-Funktionalitä.
          </p>
        )}
        <div className="mb-6 text-gray-700 flex items-center justify-evenly text-center space-x-2">
          {recipe.preparation_time ? (
            <div className="text-center ">
              <strong>Zubereitung</strong>
              <div className="rounded-full px-2 py-1 mt-1 ml-2 flex justify-center items-center bg-zinc-300 ring-2 ring-cyan-100">
                {" "}
                <PiTimerFill />
                <span className="ml-1">{recipe.preparation_time} min</span>
              </div>
            </div>
          ) : null}
          {recipe.rest_time ? (
            <div className="text-center">
              <strong>Ruhen/Backen</strong>
              <div className="rounded-full px-2 py-1 mt-1 ml-2 flex justify-center items-center bg-zinc-300 ring-2 ring-cyan-100">
                {" "}
                <PiTimerFill />
                <span className="ml-1">{recipe.rest_time} min</span>
              </div>
            </div>
          ) : null}
        </div>
        <div className="w-full max-w-full mb-6 flex flex-row justify-around">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 text-start mb-2 ml-2 underline">
              Zutaten
            </h2>
            <ul className="list-disc pl-5">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700">
                  {ingredient.amount} {ingredient.unit} {ingredient.ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700 text-start mb-2 ml-2 underline">
              Utensilien
            </h2>
            <ul className="list-disc pl-5">
              {recipe.tools.map((tool, index) => (
                <li key={index} className="text-gray-700">
                  <IconText text={tool} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mb-6 divide-y">
          <h2 className="w-full text-center text-2xl md:text-4xl font-semibold text-gray-700 mb-3">
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
    </div>
  );
};

export default Recipe;
