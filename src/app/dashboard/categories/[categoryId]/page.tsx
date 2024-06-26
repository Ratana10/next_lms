import CategoryForm from "./components/CategoryForm";
import { getCategoryById } from "@/services/categories.service";
import { Category } from "@/types";

const CategoryIdPage = async ({
  params,
}: {
  params: { categoryId: string };
}) => {
  const category: Category = await getCategoryById(parseInt(params.categoryId));
  return <CategoryForm initialize={category} />;
};

export default CategoryIdPage;
