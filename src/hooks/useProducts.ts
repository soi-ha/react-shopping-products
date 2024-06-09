import { useState, useEffect } from "react";
import { getProducts } from "@api/index";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useError } from "./index";
import { RULE } from "@constants/rules";

interface UseProductsResult {
  products: Product[];
  isLoading: boolean;
  isFetching: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isError: boolean;
  error: Error | null;
  handleCategory: (category: Category) => void;
  handleSort: (sort: Sort) => void;
  fetchNextPage: () => void;
}

export default function useProducts(): UseProductsResult {
  const [category, setCategory] = useState<Category>("all");
  const [sort, setSort] = useState<Sort>("asc");

  const { showError } = useError();

  const {
    data,
    error,
    isError,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", sort, category],
    queryFn: async ({ pageParam = 0 }) => {
      const size =
        pageParam === RULE.initialPage ? RULE.initialSize : RULE.nextSize;
      return await getProducts({
        category: category === "all" ? undefined : category,
        sort,
        page: pageParam,
        size,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.pageable.pageNumber;
      const totalPage = lastPage.totalPages;
      if (currentPage === 0) {
        return 5;
      } else {
        return currentPage < totalPage - 1 ? currentPage + 1 : undefined;
      }
    },
    retry: false,
  });

  const products = data?.pages.flatMap((page) => page.content) ?? [];

  useEffect(() => {
    if (isError && error) {
      showError(error.message);
    }
  }, [isError, error]);

  const handleCategory = (category: Category) => {
    setCategory(category);
  };

  const handleSort = (sort: Sort) => {
    setSort(sort);
  };

  return {
    products,
    isLoading,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    handleCategory,
    handleSort,
    fetchNextPage,
  };
}
