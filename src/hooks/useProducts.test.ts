import { renderHook, waitFor } from "@testing-library/react";
import { ErrorProvider } from "@context/ErrorContext";
import { PRODUCTS_ENDPOINT } from "@api/endpoints";
import { HttpResponse, http } from "msw";
import { server } from "@mocks/server";
import { useError, usePagination, useProducts } from "./index";
import { act } from "react";

describe("useProducts", () => {
  const initialParams = { page: 0, resetPage: () => {} };

  describe("상품 목록 조회", () => {
    it("상품 목록을 조회한다.", async () => {
      const { result } = renderHook(() => useProducts(initialParams), {
        wrapper: ErrorProvider,
      });

      const expectedLength = 20;

      await waitFor(() => {
        expect(result.current.products).toHaveLength(expectedLength);
      });
    });

    it("상품 목록 조회 중일 경우 로딩 상태가 된다.", async () => {
      const { result } = renderHook(() => useProducts(initialParams), {
        wrapper: ErrorProvider,
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(true);
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
          const { products } = useProducts(initialParams);
          const { error } = useError();
          return {
            products,
            error,
          };
        },
        {
          wrapper: ErrorProvider,
        },
      );

      const expectedProducts: Product[] = [];

      await waitFor(() => {
        expect(result.current.products).toEqual(expectedProducts);
        expect(result.current.error).toBeTruthy();
      });
    });
  });

  describe("페이지네이션", () => {
    it("초기에 첫 페이지의 상품 20개를 불러온다.", async () => {
      const { result } = renderHook(
        () => {
          const { products } = useProducts(initialParams);
          const { page } = usePagination();
          return { products, page };
        },
        {
          wrapper: ErrorProvider,
        },
      );

      const expectedLength = 20;
      const expectedPage = 0;

      await waitFor(() => {
        expect(result.current.products).toHaveLength(expectedLength);
        expect(result.current.page).toBe(expectedPage);
      });
    });

    it("다음 페이지의 상품 4개를 추가로 불러온다.", async () => {
      const { result } = renderHook(
        () => {
          const { page, resetPage, nextPage } = usePagination();
          const { products } = useProducts({
            page,
            resetPage,
          });
          return { products, page, nextPage };
        },
        {
          wrapper: ErrorProvider,
        },
      );

      const initialExpectedLength = 20;
      const initialExpectedPage = 0;

      await waitFor(() => {
        expect(result.current.products).toHaveLength(initialExpectedLength);
        expect(result.current.page).toBe(initialExpectedPage);
      });

      act(() => {
        result.current.nextPage();
      });

      const nextExpectedLength = 24;
      const nextExpectedPage = 5;

      await waitFor(() => {
        expect(result.current.products).toHaveLength(nextExpectedLength);
        expect(result.current.page).toBe(nextExpectedPage);
      });
    });

    it("모든 페이지의 상품을 불러오면 더 이상 요청하지 않는다.", async () => {
      const { result } = renderHook(
        () => {
          const { page, resetPage, nextPage } = usePagination();
          const { products } = useProducts({
            page,
            resetPage,
          });
          return { products, page, nextPage };
        },
        {
          wrapper: ErrorProvider,
        },
      );

      const initialExpectedLength = 20;
      const initialExpectedPage = 0;

      await waitFor(() => {
        expect(result.current.products).toHaveLength(initialExpectedLength);
        expect(result.current.page).toBe(initialExpectedPage);
      });

      for (let i = 1; i < 21; i++) {
        await waitFor(() => {
          act(() => {
            result.current.nextPage();
          });
        });

        const expectedLength = 20 + i * 4;
        const expectedPage = i + 4;

        await waitFor(() => {
          expect(result.current.products).toHaveLength(expectedLength);
          expect(result.current.page).toBe(expectedPage);
        });
      }

      await act(async () => {
        result.current.nextPage();
      });

      const finalExpectedLength = 100;
      const finalExpectedPage = 25;

      await waitFor(() => {
        expect(result.current.products).toHaveLength(finalExpectedLength);
        expect(result.current.page).toBe(finalExpectedPage);
      });
    });

    it("페이지네이션으로 추가 데이터를 불러올 때 로딩 상태를 표시한다.", async () => {
      const { result } = renderHook(
        () => {
          const { page, resetPage, nextPage } = usePagination();
          const { products, loading } = useProducts({
            page,
            resetPage,
          });
          return { products, nextPage, loading };
        },
        {
          wrapper: ErrorProvider,
        },
      );

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      act(() => {
        result.current.nextPage();
      });

      expect(result.current.loading).toBe(true);

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });
    });
  });
});
