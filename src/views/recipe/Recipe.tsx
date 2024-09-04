import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PiTimer } from "react-icons/pi";
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
          <div className="absolute w-full bottom-0 p-2 flex flex-wrap-reverse ">
            {combinedLabels.length > 0 &&
              combinedLabels.map((label, index) => (
                <div
                  key={index}
                  className="bg-emerald-50 bg-opacity-100 text-emerald-950 text-xs sm:text-sm font-bold sm:font-semibold m-1 px-2 py-1 rounded-full border-2 border-emerald-900 ring-offset-1 ring-2 ring-emerald-950"
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
          <p className="text-gray-700 text-lg lg:text-xl mb-4 text-center">
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
        {recipe.preparation_time || recipe.rest_time ? (
          <div className="w-full flex justify-center items-center">
            <div className="max-w-96 text-gray-700 flex flex-wrap items-center justify-evenly shadow-md pt-4 px-12 mt-2 mb-6 md:mt-6 md:mb-10 gap-x-12 text-center bg-emerald-50 rounded-xl">
              {recipe.preparation_time ? (
                <div className="text-center mb-6 ">
                  <strong>Zubereitung</strong>
                  <div className="rounded-full px-2 py-1 mt-1 ml-2 flex justify-center items-center bg-emerald-100 ring-2 ring-emerald-200">
                    {" "}
                    <PiTimer className="text-emerald-950" />
                    <span className="ml-1 text-zinc-800 font-semibold">
                      {recipe.preparation_time} Min
                    </span>
                  </div>
                </div>
              ) : null}
              {recipe.rest_time ? (
                <div className="text-center mb-6">
                  <strong>Ruhen/Backen</strong>
                  <div className="rounded-full px-2 py-1 mt-1 ml-2 flex justify-center items-center bg-emerald-100 ring-2 ring-emerald-200">
                    {" "}
                    <PiTimer className="text-emerald-950" />
                    <span className="ml-1 text-zinc-800 font-semibold">
                      {recipe.rest_time} Min
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
        {(recipe.tools.length > 0 || recipe.ingredients.length > 0) && (
        <div className="w-full flex flex-wrap justify-between sm:justify-around xs:px-12 sm:px-0">
          {recipe.tools.length > 0 && (
          <div className="mb-6 mr-6">
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-700 text-start mb-2 ml-2 underline">
              Zutaten
            </h2>
            <ul className="list-disc pl-5">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700 text-lg lg:text-xl">
                  {ingredient.amount} {ingredient.unit}{" "}
                  <span className="font-semibold">{ingredient.ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
          )}
          {recipe.tools.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-700 mb-2 ml-2 underline">
              Utensilien
            </h2>
            <ul className="list-disc pl-5">
              {recipe.tools.map((tool, index) => (
                <li key={index} className="text-gray-700 text-lg lg:text-xl">
                  <IconText text={tool} />
                </li>
              ))}
            </ul>
          </div>
          )}
        </div>
      )}
        <div>
          {recipe.instructions.map((instruction, index) => (
            <div key={index} className="py-4">
              <h3 className="text-xl font-semibold text-center text-gray-800 bg-emerald-50 shadow-md px-6 md:mx-8 py-3 mb-6 rounded-b-full">
                Schritt {index + 1} - {instruction.name}
              </h3>
              {instruction.tools.length > 0 && (
                <p className="text-gray-700 md:text-lg mt-2">
                  <span className="teachers-semibold">Benötigt:</span>{" "}
                  {instruction.tools.join(", ")}
                </p>
              )}
              <ul className="list-disc pl-5 mt-2">
                {instruction.ingredients.map((ingredient, ingIndex) => (
                  <li key={ingIndex} className="text-gray-700 md:text-lg">
                    {ingredient.amount}
                    {" "}
                    {ingredient.unit} {ingredient.ingredient}
                  </li>
                ))}
              </ul>
              <p className="text-gray-900 text-lg xs:text-xl mt-4 teachers-semibold">
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
