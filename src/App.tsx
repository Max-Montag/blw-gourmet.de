import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./views/Landing";
import LoadRecipe from "./views/recipe/LoadRecipe";
import EditRecipe from "./views/admin/EditRecipe";
import AdminDashboard from "./views/admin/AdminDashboard";
import Header from "./views/components/Header";

const App: React.FC = () => {
  return (
    <Router>
            <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/recipe/:url/" element={<LoadRecipe />} />
        <Route path="/admin/edit-recipe/:url/" element={<EditRecipe />} />
        <Route path="/admin/dashboard/" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
