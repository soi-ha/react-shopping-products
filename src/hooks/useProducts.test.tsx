import { renderHook, waitFor } from "@testing-library/react";
import { ErrorProvider } from "@context/ErrorContext";
import { PRODUCTS_ENDPOINT } from "@api/endpoints";
import { HttpResponse, http } from "msw";
import { server } from "@mocks/server";
import { useProducts } from "./index";
import { PropsWithChildren, act } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const CustomProvider = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    <ErrorProvider>{children}</ErrorProvider>
  </QueryClientProvider>
);

describe("useProducts", () => {
  describe("상품 목록 조회", () => {
    it("상품 목록을 조회한다.", async () => {
      const { result } = renderHook(() => useProducts(), {
        wrapper: CustomProvider,
      });

      const expectedLength = 20;

      await waitFor(() => {
        expect(result.current.products).toHaveLength(expectedLength);
      });
    });

    it("상품 목록 조회 중일 경우 로딩 상태가 된다.", async () => {
      const { result } = renderHook(() => useProducts(), {
        wrapper: CustomProvider,
      });

      await waitFor(() => {
        expect(result.current.isFetching).toBe(true);
      });
    });

    it("상품 목록 조회 중 에러가 발생할 경우 error의 값은 true가 된다.", async () => {
      server.use(
        http.get(PRODUCTS_ENDPOINT, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const { result } = renderHook(
        () => {
          const { products, isError } = useProducts();
          return {
            products,
            isError,
          };
        },
        {
          wrapper: CustomProvider,
        },
      );

      await waitFor(() => {
        expect(result.current.isError).toBeTruthy();
      });
    });
  });

  describe("페이지네이션", () => {
    it("초기에 첫 페이지의 상품 20개를 불러온다.", async () => {
      const { result } = renderHook(
        () => {
          const { products } = useProducts();
          return { products };
        },
        {
          wrapper: CustomProvider,
        },
      );

      const expectedLength = 20;

      await waitFor(() => {
        expect(result.current.products).toHaveLength(expectedLength);
      });
    });

    it("다음 페이지의 상품 4개를 추가로 불러온다.", async () => {
      const { result } = renderHook(
        () => {
          const { products, fetchNextPage } = useProducts();
          return { products, fetchNextPage };
        },
        {
          wrapper: CustomProvider,
        },
      );

      const initialExpectedLength = 20;

      await waitFor(() => {
        expect(result.current.products).toHaveLength(initialExpectedLength);
      });

      act(() => {
        result.current.fetchNextPage();
      });

      const nextExpectedLength = 24;

      await waitFor(() => {
        expect(result.current.products).toHaveLength(nextExpectedLength);
      });
    });

    it("모든 페이지의 상품을 불러오면 더 이상 요청하지 않는다.", async () => {
      const { result } = renderHook(
        () => {
          const { products, fetchNextPage, hasNextPage } = useProducts();
          return { products, fetchNextPage, hasNextPage };
        },
        {
          wrapper: CustomProvider,
        },
      );

      const initialExpectedLength = 20;

      await waitFor(() => {
        expect(result.current.products).toHaveLength(initialExpectedLength);
      });

      for (let i = 1; i < 21; i++) {
        await waitFor(() => {
          act(() => {
            result.current.fetchNextPage();
          });
        });

        const expectedLength = 20 + i * 4;

        await waitFor(() => {
          expect(result.current.products).toHaveLength(expectedLength);
          expect(result.current.hasNextPage).toBe(true);
        });
      }

      act(() => {
        result.current.fetchNextPage();
      });

      const finalExpectedLength = 100;

      await waitFor(() => {
        expect(result.current.products).toHaveLength(finalExpectedLength);
        expect(result.current.hasNextPage).toBe(false);
      });
    });

    it("페이지네이션으로 추가 데이터를 불러올 때 로딩 상태를 표시한다.", async () => {
      const { result } = renderHook(
        () => {
          const { products, isFetchingNextPage, fetchNextPage } = useProducts();
          return { products, fetchNextPage, isFetchingNextPage };
        },
        {
          wrapper: CustomProvider,
        },
      );

      await waitFor(() => {
        expect(result.current.isFetchingNextPage).toBe(false);
      });

      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.isFetchingNextPage).toBe(true);
      });

      await waitFor(() => {
        expect(result.current.isFetchingNextPage).toBe(false);
      });
    });
  });
});
