import { RULE } from "@constants/rules";
import {
  CART_ITEMS_COUNTS_ENDPOINT,
  CART_ITEMS_ENDPOINT,
  PRODUCTS_ENDPOINT,
} from "./endpoints";
import { fetchWithAuth } from "./fetchWithAuth";

/**
 * @example
 * const params: QueryParams = {
 *  category: 'fashion',
 *  page: 1,
 *  size: 20,
 *  sort: ['price', 'asc']
 * }
 */
interface QueryParams {
  [key: string]:
    | undefined
    | string
    | number
    | boolean
    | (string | number | boolean)[];
}

export interface GetProductsParams {
  category?: Category;
  page?: number;
  size?: number;
  sort?: Sort;
}

const createQueryString = (params: QueryParams) => {
  return Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value.join(","))}`;
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
    })
    .join("&");
};

export const getProducts = async ({
  category,
  page = 0,
  size = 20,
  sort = "asc",
}: GetProductsParams = {}): Promise<Product[]> => {
  const params = {
    category,
    page,
    size,
    sort: ["price", sort],
  };
  const queryString = createQueryString(params) + RULE.sortQueryByIdAsc;

  const response = await fetchWithAuth(`${PRODUCTS_ENDPOINT}?${queryString}`, {
    method: "GET",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to get products item");
  }

  return data.content;
};

export const postProductInCart = async (
  productId: number,
  quantity: number = 1,
) => {
  const response = await fetchWithAuth(CART_ITEMS_ENDPOINT, {
    method: "POST",
    body: {
      productId,
      quantity,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to post product item in cart");
  }
};

export const deleteProductInCart = async (cartId: number) => {
  const response = await fetchWithAuth(`${CART_ITEMS_ENDPOINT}/${cartId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete product item in cart");
  }
};

export const getCartItemsCount = async (): Promise<number> => {
  const response = await fetchWithAuth(CART_ITEMS_COUNTS_ENDPOINT, {
    method: "GET",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to get cart items count");
  }

  return data;
};

export const getCartItems = async (): Promise<CartItem[]> => {
  const response = await fetchWithAuth(CART_ITEMS_ENDPOINT, {
    method: "GET",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to get cart items count");
  }

  return data.content;
};
