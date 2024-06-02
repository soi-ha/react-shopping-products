import { useCallback, useRef } from "react";

interface UseInfiniteScrollResult {
  lastElementRef: (node: HTMLDivElement) => void;
}

interface UseInfiniteScrollProps {
  hasMore: boolean;
  loading: boolean;
  nextPage: () => void;
}

export default function useInfiniteScroll({
  hasMore,
  loading,
  nextPage,
}: UseInfiniteScrollProps): UseInfiniteScrollResult {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          nextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, nextPage, loading],
  );

  return { lastElementRef };
}
