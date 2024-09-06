import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import LoadRecipe from "./views/recipe/LoadRecipe";
import EditRecipe from "./views/admin/EditRecipe";
import AdminDashboard from "./views/admin/AdminDashboard";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:url/" element={<LoadRecipe />} />
        <Route path="/admin/edit-recipe/:url/" element={<EditRecipe />} />
        <Route path="/admin/dashboard/" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
