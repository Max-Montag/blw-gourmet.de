import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Recipe from "./views/recipe/RecipeLoader";
import AddRecipe from "./views/admin/AddRecipe";
import ListAllRecipes from "./views/admin/ListAllRecipes";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:url_identifier/" element={<Recipe />} />
        <Route path="/admin/add-recipe/" element={<AddRecipe />} />
        <Route path="/admin/list-recipes/" element={<ListAllRecipes />} />
      </Routes>
    </Router>
  );
};

export default App;
