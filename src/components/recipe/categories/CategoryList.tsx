import CategoryCard from "./CategoryCard";

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

const CategoryList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 xxs:grid-cols-2 md:grid-cols-4 gap-6 px-4 sm:px-12">
      {categories.map((cat) => (
        <CategoryCard
          key={cat.name}
          category={cat.name}
          icon={<span>{cat.icon}</span>}
        />
      ))}
    </div>
  );
};

export default CategoryList;
