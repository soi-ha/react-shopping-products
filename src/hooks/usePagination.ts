import { useCallback, useState } from "react";

interface UsePaginationResult {
  page: number;
  nextPage: () => void;
  resetPage: () => void;
}

export default function usePagination(): UsePaginationResult {
  const [page, setPage] = useState(0);

  const nextPage = useCallback(() => {
    if (page === 0) {
      setPage(5);
    } else {
      setPage((prevPage) => prevPage + 1);
    }
  }, [page]);

  const resetPage = () => {
    setPage(0);
  };

  return {
    page,
    nextPage,
    resetPage,
  };
}
