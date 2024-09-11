import React from "react";
import { TbChefHatOff } from "react-icons/tb";

const NoRecipesAvailable: React.FC = () => {
  return (
    <div className="text-lg md:text-2xl lg:text-4xl text-cyan-800 flex flex-col items-center text-center p-8">
      <TbChefHatOff className="w-24 md:w-44 h-24 md:h-44 mb-4" />
      <p>In dieser Kategorie sind noch keine Rezepte verfügbar.</p>
    </div>
  );
};

export default NoRecipesAvailable;
