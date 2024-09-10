import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./views/Landing";
import LoadRecipe from "./views/recipe/LoadRecipe";
import EditRecipe from "./views/admin/EditRecipe";
import AdminDashboard from "./views/admin/AdminDashboard";
import Header from "./views/components/Header/Header";
import Footer from "./views/components/Footer/Footer";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/recipe/:url/" element={<LoadRecipe />} />
            <Route path="/admin/edit-recipe/:url/" element={<EditRecipe />} />
            <Route path="/admin/dashboard/" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
