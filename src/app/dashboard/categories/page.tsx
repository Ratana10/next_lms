import { getAllCategories } from "@/services/categories.service";
import CategoryClient from "./components/CategoryClient";

const CategoryPage = async () => {
  const data = await getAllCategories();
  const categories = data.data;
  console.log("categories", categories);
  return (
    <div>
      <CategoryClient categories={categories} />
    </div>
  );
};

export default CategoryPage;
