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
