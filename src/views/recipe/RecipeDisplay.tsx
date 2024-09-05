import React from "react";
import { PiTimer, PiCookingPot } from "react-icons/pi";
import { CiShoppingBasket } from "react-icons/ci";
import IconText from "../components/IconText";
import { mapDiningTime } from "../utils/diningTimeUtil";
import Fraction from "fraction.js";
import { RecipeData } from "../../types/recipeTypes";

interface DecimalToFractionProps {
  decimal: number;
}

interface RecipeDisplayProps {
  recipe: RecipeData;
}

const DecimalToFraction: React.FC<DecimalToFractionProps> = ({ decimal }) => {
  const fraction = new Fraction(decimal).toFraction(true);
  return <>{fraction}</>;
};

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe }) => {
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
            alt={(recipe.name || "Recipe") + " Image"}
            className="w-full h-72 object-cover"
          />
        )}
        {combinedLabels.length > 0 && (
          <div className="absolute w-full bottom-0 p-2 flex flex-wrap-reverse ">
            {combinedLabels.map((label, index) => (
              <div
                key={index}
                className="bg-cyan-50 text-cyan-700 text-sm md:text-md font-semibold m-1 px-1.5 py-0.5 rounded-xl border-2 border-cyan-700"
              >
                <IconText text={label} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="p-6">
        {recipe.name && (
          <h1 className="text-2xl lg:text-4xl font-bold mb-4 text-center text-gray-800 marcellus-semibold">
            {recipe.name}
          </h1>
        )}
        {recipe.description ? (
          <p className="text-gray-700 mb-4 text-center">{recipe.description}</p>
        ) : (
          <p className="text-gray-700 text-lg lg:text-xl mb-4 text-center">
            Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle
            Buchstaben da sind und wie sie aussehen...
          </p>
        )}
        {(recipe.preparation_time || recipe.rest_time) && (
          <div className="w-full flex justify-center items-center">
            <div className="max-w-96 bg-cyan-50 text-center text-gray-700 flex flex-wrap items-center justify-evenly shadow-sm pt-4 px-12 mt-2 mb-6 md:mt-6 md:mb-10 gap-x-12 rounded-xl">
              {recipe.preparation_time ? (
                <div className="flex flex-col justify-center items-center mb-4 ">
                  <span className="font-medium">Zubereitung</span>
                  <PiTimer className="text-cyan-900 w-10 h-10 my-1" />
                  <span className="text-zinc-800 font-semibold">
                    {recipe.preparation_time} Min
                  </span>
                </div>
              ) : null}
              {recipe.rest_time ? (
                <div className="flex flex-col justify-center items-center mb-4">
                  <span className="font-medium">Wartezeit</span>
                  <PiTimer className="text-cyan-900 w-10 h-10 my-1" />
                  <span className="text-zinc-800 font-semibold">
                    {recipe.rest_time} Min
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        )}
        {(recipe.tools.length > 0 || recipe.ingredients.length > 0) && (
          <div className="w-full flex flex-wrap justify-between sm:justify-around xs:px-12 sm:px-0">
            {recipe.ingredients.length > 0 && (
              <div className="mb-6 mr-6">
                <h2 className="text-xl lg:text-2xl font-semibold text-gray-700 mb-2 underline">
                  Zutaten
                </h2>
                <div className="flex">
                  <div>
                    <ul>
                      {recipe.ingredients.map((ingredient, index) => (
                        <li
                          key={index}
                          className="text-zinc-700 flex font-semibold text-lg lg:text-xl"
                        >
                          {ingredient.amount && (
                            <>
                              <DecimalToFraction decimal={ingredient.amount} />
                              {ingredient.unit && ` ${ingredient.unit}`}
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <ul className="pl-4">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li
                          key={index}
                          className="text-zinc-700 font-medium text-lg lg:text-xl"
                        >
                          {ingredient.ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            {recipe.tools.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl lg:text-2xl font-semibold text-gray-700 mb-2 underline">
                  Utensilien
                </h2>
                <ul>
                  {recipe.tools.map((tool, index) => (
                    <li
                      key={index}
                      className="text-zinc-700 font-medium text-lg lg:text-xl"
                    >
                      {tool}
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
              <div className="text-xl font-semibold text-cyan-800 bg-cyan-50 flex justify-between shadow-sm px-6 py-2 -ml-6 mb-6 rounded-br-full">
                <span className="rounded-full border-4 border-cyan-800 flex items-center justify-center mr-2 w-10 h-10">
                  {index + 1}
                </span>
                <h3 className="flex-1 text-center self-center">
                  {instruction.name}
                </h3>
              </div>
              {instruction.tools.length > 0 && (
                <div className="text-gray-700 md:text-lg flex items-center mt-2">
                  <PiCookingPot className="text-cyan-800 min-w-[24px] min-h-[24px] max-w-[24px] max-h-[24px] mr-2" />
                  <span>{instruction.tools.join(" - ")}</span>
                </div>
              )}
              {instruction.ingredients.length > 0 && (
                <div className="text-gray-700 md:text-lg flex items-center mt-2">
                  <CiShoppingBasket className="text-cyan-800 min-w-[26px] min-h-[26px] max-w-[26px] max-h-[26px] mr-2" />
                  <span>
                    {instruction.ingredients.map((ingredient, idx) => (
                      <span key={idx}>
                        {ingredient.amount ? (
                          <>
                            <DecimalToFraction decimal={ingredient.amount} />
                            {ingredient.unit ? ` ${ingredient.unit} ` : null}
                          </>
                        ) : null}
                        {ingredient.ingredient}
                        {idx < instruction.ingredients.length - 1 && " - "}
                      </span>
                    ))}
                  </span>
                </div>
              )}
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

export default RecipeDisplay;
