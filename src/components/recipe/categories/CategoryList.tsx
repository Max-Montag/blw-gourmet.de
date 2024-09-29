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

interface RecipeListProps {
  amount?: number;
}

const RecipeList: React.FC<RecipeListProps> = ({ amount = 8 }) => {
  return (
    <div
      className={`grid gap-6 px-12 xxs:px-4 sm:px-12 ${amount === 4 ? `xxs:grid-cols-2` : "grid-cols-1 xxs:grid-cols-2 md:grid-cols-4"}`}
    >
      {categories.slice(0, amount).map((cat) => (
        <CategoryCard
          key={cat.name}
          category={cat.name}
          icon={<span>{cat.icon}</span>}
        />
      ))}
    </div>
  );
};

export default RecipeList;
