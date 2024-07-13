import CategoryForm from "./components/CategoryForm";
import { getCategoryById } from "@/services/categories.service";

const CategoryIdPage = async ({
  params,
}: {
  params: { categoryId: string };
}) => {
  const { category } = await getCategoryById(parseInt(params.categoryId));

  return <CategoryForm initialize={category} />;
};

export default CategoryIdPage;
