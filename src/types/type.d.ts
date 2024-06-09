type Category =
  | "all"
  | "fashion"
  | "electronics"
  | "beverage"
  | "kitchen"
  | "fitness"
  | "books";

type Sort = "asc" | "desc";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

interface Pageable {
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

interface ApiResponse {
  content: Product[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  first: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  empty: boolean;
}
