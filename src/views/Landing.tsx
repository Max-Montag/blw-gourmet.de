import React from "react";
import BrowseRecipes from "./browse/BrowseRecipes";

const Landing: React.FC = () => {
  return (
    <div className="text-center px-2 md:px-4 lg:px-16">
      <h1 className="text-4xl md:text-5xl lg:text-7xl text-cyan-800 mt-8 md:mt-16 lg:mt-28">
        Willkommen bei BLW-Gourmet.de!
      </h1>
      <p className="text-xl md:text-2xl lg:text-3xl text-cyan-800 mt-4">
        Was möchtest du heute kochen?
      </p>
      <div className="mt-8">
        <BrowseRecipes />
      </div>
    </div>
  );
};

export default Landing;
