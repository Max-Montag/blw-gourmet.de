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

interface CategoryListProps {
  amount?: number;
}

const CategoryList: React.FC<CategoryListProps> = ({ amount = 8 }) => {
  // TODO pass classname via ...props instead of comparing amount to 4
  return (
    <div
      className={`px-4 grid gap-6 ${amount === 4 ? `grid-cols-2` : "grid-cols-1 xxs:grid-cols-2 md:grid-cols-4"}`}
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

export default CategoryList;
