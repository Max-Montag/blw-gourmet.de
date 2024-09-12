import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./views/Landing";
import BrowseRecipes from "./views/browse/BrowseRecipes";
import ListRecipes from "./views/browse/ListRecipes";
import LoadRecipe from "./views/recipe/LoadRecipe";
import EditRecipe from "./views/admin/EditRecipe";
import AdminDashboard from "./views/admin/AdminDashboard";
import Header from "./views/components/header/Header";
import Footer from "./views/components/footer/Footer";
import LoadingAnimation from "./views/components/loadingAnimation/LoadingAnimation";
import Impressum from "./views/legal/Impressum";
import PrivacyPolicy from "./views/legal/PrivacyPolicy";
import TermsOfService from "./views/legal/TermsOfService";
import WhatIsBLW from "./views/informative/WhatIsBlw";
import TipsForStartingSolids from "./views/informative/TipsForStartingSolids";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow mt-16">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/rezepte/" element={<BrowseRecipes />} />
            <Route path="/rezepte/:category/" element={<ListRecipes />} />
            <Route path="/rezept/:url/" element={<LoadRecipe />} />
            <Route path="/impressum/" element={<Impressum />} />
            <Route path="/datenschutz/" element={<PrivacyPolicy />} />
            <Route path="/nutzungsbedingungen/" element={<TermsOfService />} />
            <Route path="/was-ist-blw/" element={<WhatIsBLW />} />
            <Route path="/tipps-beikoststart/" element={<TipsForStartingSolids />} />
            <Route path="/admin/edit-recipe/:url/" element={<EditRecipe />} />
            <Route path="/admin/dashboard/" element={<AdminDashboard />} />
            {/* TODO remove: */}
            <Route
              path="/loadingAnimationTest"
              element={<LoadingAnimation />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
