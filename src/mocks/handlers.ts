import { http, HttpResponse } from "msw";
import type { PathParams } from "msw";
import { GetProductsParams } from "@api/index";
import products from "./products.json";
import {
  CART_ITEMS_COUNTS_ENDPOINT,
  CART_ITEMS_ENDPOINT,
  PRODUCTS_ENDPOINT,
} from "@api/endpoints";
import { RULE } from "@constants/rules";

export const handlers = [
  http.get<PathParams, GetProductsParams>(
    PRODUCTS_ENDPOINT,
    async ({ request }) => {
      const url = new URL(request.url);

      const page = Number(url.searchParams.get("page") || "0");
      const limit =
        page === RULE.initialPage ? RULE.initialSize : RULE.nextSize;
      const start = page === RULE.initialPage ? 0 : (page - 5) * 4 + 20;
      const end = start + limit;

      const paginatedProducts = {
        ...products,
        content: products.content.slice(start, end),
      };
      return HttpResponse.json(paginatedProducts);
    },
  ),
  http.get(CART_ITEMS_ENDPOINT, () => {
    return HttpResponse.json(products);
  }),
  http.get(CART_ITEMS_COUNTS_ENDPOINT, () => {
    return HttpResponse.json(products);
  }),
];
