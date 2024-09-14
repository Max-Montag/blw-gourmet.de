"use client";

import { useEffect } from "react";
import CategoryList from "@/components/categories/CategoryList";

const BrowseRecipes: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-8">
      <CategoryList />
    </div>
  );
};

export default BrowseRecipes;
