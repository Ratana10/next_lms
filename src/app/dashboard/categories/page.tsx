import { getAllCategories } from "@/services/categories.service";
import CategoryClient from "./components/CategoryClient";
import { Category } from "@/types";
import { format } from "date-fns";

const CategoryPage = async () => {
  const data = await getAllCategories();
  const categories = data.data;

  const categoriesFormatted: Category[] = categories.map(
    (e: Category, index: number) => ({
      id: e.id,
      no: index+1,
      name: e.name,
      createdAt: format(new Date(e.createdAt), "yyyy-MM-dd"),
      updatedAt: format(new Date(e.updatedAt), "yyyy-MM-dd"),
    })
  );
  return (
    <div>
      <CategoryClient categories={categoriesFormatted} />
    </div>
  );
};

export default CategoryPage;
