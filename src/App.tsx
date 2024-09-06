import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import RecipeLoader from "./views/recipe/RecipeLoader";
import AddRecipe from "./views/admin/AddRecipe";
import EditRecipe from "./views/admin/EditRecipe";
import AdminRecipeList from "./views/admin/AdminRecipeList";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:url/" element={<RecipeLoader />} />
        <Route path="/admin/add-recipe/" element={<AddRecipe />} />
        <Route path="/admin/edit-recipe/:url/" element={<EditRecipe />} />
        <Route path="/admin/dashboard/" element={<AdminRecipeList />} />
      </Routes>
    </Router>
  );
};

export default App;
