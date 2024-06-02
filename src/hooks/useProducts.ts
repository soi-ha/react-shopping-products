import { useState, useEffect } from "react";
import { getProducts } from "@api/index";
import { useError } from "./index";
import { RULE } from "@constants/rules";

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  hasMore: boolean;
  handleCategory: (category: Category) => void;
  handleSort: (sort: Sort) => void;
}

interface UseProductsProps {
  page: number;
  resetPage: () => void;
}

export default function useProducts({
  page,
  resetPage,
}: UseProductsProps): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState<Category>("all");
  const [sort, setSort] = useState<Sort>("asc");
  const [loading, setLoading] = useState<boolean>(false);

  const { showError } = useError();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const size =
          page === RULE.initialPage ? RULE.initialSize : RULE.nextSize;
        const responseData = await getProducts({
          category: category === "all" ? undefined : category,
          sort,
          page,
          size,
        });
        setProducts((prevProducts) => [...prevProducts, ...responseData]);

        if (responseData.length < size) {
          setHasMore(false);
        }
      } catch (error) {
        if (error instanceof Error) {
          showError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (!loading) {
      fetchProducts();
    }
  }, [page, category, sort, showError]);

  const handleCategory = (category: Category) => {
    setProducts([]);
    setCategory(category);
    resetPage();
  };

  const handleSort = (sort: Sort) => {
    setProducts([]);
    setSort(sort);
    resetPage();
  };

  return {
    products,
    loading,
    hasMore,
    handleCategory,
    handleSort,
  };
}
