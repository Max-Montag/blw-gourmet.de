"use client";

import { useEffect } from "react";
import CategoryList from "@/components/categories/CategoryList";

const BrowseRecipes: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full flx-grow flex flex-col justify-center items-center p-8">
      <section className="my-12">
        <CategoryList />
      </section>
    </div>
  );
};

export default BrowseRecipes;
