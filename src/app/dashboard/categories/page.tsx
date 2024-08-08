import { getAllCategories } from "@/services/categories.service";
import CategoryClient from "./components/CategoryClient";
import { Category } from "@/types";
import { formattedDate, getNoNumber } from "@/lib/formatted";
import { PageProps } from "@/types/PageProps";

const CategoryPage = async ({ searchParams }: PageProps) => {
  const page = Number(searchParams?.page) || 1;

  const { categories, pagination } = await getAllCategories(page);

  const categoriesFormatted: Category[] = categories.map(
    (e: Category, index: number) => ({
      no: getNoNumber(index, pagination.pageNumber, pagination.pageSize),
      id: e.id,
      name: e.name,
      description: e.description,
      createdAt: formattedDate(e.createdAt),
      updatedAt: formattedDate(e.updatedAt),
    })
  );
  return (
    <CategoryClient categories={categoriesFormatted} pagination={pagination} />
  );
};

export default CategoryPage;
