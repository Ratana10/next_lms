import { getAllCategories } from "@/services/categories.service";
import CategoryClient from "./components/CategoryClient";
import { Category } from "@/types";
import { format } from "date-fns";

interface SearchParams {
  query?: string;
  page?: string;
}
const CategoryPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const currentPage = Number(searchParams?.page) || 1;

  const data = await getAllCategories(currentPage);
  const categories = data.data;
  const pagination = data.pagination;

  const categoriesFormatted: Category[] = categories.map(
    (e: Category, index: number) => ({
      id: e.id,
      no: index + 1,
      name: e.name,
      createdAt: format(new Date(e.createdAt), "yyyy-MM-dd"),
      updatedAt: e.updatedAt ? format(new Date(e.updatedAt), "yyyy-MM-dd") : '...',
    })
  );
  return (
    <div>
      <CategoryClient categories={categoriesFormatted} pagination={pagination} />
    </div>
  );
};

export default CategoryPage;
