import React from "react";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  category: string;
  icon: JSX.Element;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, icon }) => {
  return (
    <Link
      to={`/rezepte/${category}`}
      className="border rounded-lg p-4 shadow-sm hover:shadow-md hover:shadow-xl transition duration-50 flex flex-col items-center justify-center"
    >
      <div className="text-4xl mb-2">{icon}</div>
      <div className="text-xl font-bold">{category}</div>
    </Link>
  );
};

// TODO search for react icons
const BrowseRecipes: React.FC = () => {
  const categories = [
    { name: "Frühstück", icon: "⏰" },
    { name: "Mittagessen", icon: "🍴" },
    { name: "Abendessen", icon: "🕕" },
    { name: "Snack", icon: "🍌" },
    { name: "vegetarisch", icon: "🥦" },
    { name: "vegan", icon: "🥗" },
    { name: "schnell", icon: "🚀" },
    { name: "tiefkühlgeeignet", icon: "❄️" },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-8">
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.name}
            category={cat.name}
            icon={<span>{cat.icon}</span>}
          />
        ))}
      </div>
    </div>
  );
};

export default BrowseRecipes;
