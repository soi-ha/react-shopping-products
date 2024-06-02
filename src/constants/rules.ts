/**
 * get products API 요청 시 서버의 정렬이 보장되지 않기 때문에,
 * id로 정렬을 보장한다.
 * (예: price가 같은 상품일 경우 API 요청마다 순서가 바뀌는 경우가 있다. 이 때, id로 그 순서를 보장한다.)
 */
export const RULE = {
  sortQueryByIdAsc: "&sort=id%2Casc",
  initialPage: 0,
  initialSize: 20,
  nextSize: 4,
};

export const FILTER_CATEGORIES: Record<Category, string> = {
  all: "전체",
  fashion: "패션",
  electronics: "전자",
  beverage: "음료",
  kitchen: "키친",
  fitness: "피트니스",
  books: "도서",
};

export const SORT_PRICE: Record<Sort, string> = {
  asc: "낮은 가격순",
  desc: "높은 가격순",
};
