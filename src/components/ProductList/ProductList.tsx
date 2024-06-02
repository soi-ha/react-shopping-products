import useProducts from "@hooks/useProducts";
import useInfiniteScroll from "@hooks/useInfiniteScroll";
import usePagination from "@hooks/usePagination";
import ProductListHeader from "../ProductListHeader/ProductListHeader";
import ProductItem from "./ProductItem/ProductItem";
import * as PL from "./ProductList.style";

const ProductList = () => {
  const { page, nextPage, resetPage } = usePagination();

  const { products, loading, hasMore, handleCategory, handleSort } =
    useProducts({
      page,
      resetPage,
    });

  const { lastElementRef: lastProductElementRef } = useInfiniteScroll({
    hasMore,
    loading,
    nextPage,
  });

  return (
    <>
      <ProductListHeader
        handleCategory={handleCategory}
        handleSort={handleSort}
      />
      {(() => {
        if (loading) {
          return <PL.Loading>로딩중! 💪</PL.Loading>;
        }
        if (products.length === 0) {
          return <PL.Empty>상품이 존재하지 않습니다! 🥲</PL.Empty>;
        }
        return (
          <PL.ProductListStyle>
            {products.map((item, index) => (
              <ProductItem
                product={item}
                key={item.id}
                ref={
                  index === products.length - 1 ? lastProductElementRef : null
                }
              />
            ))}
          </PL.ProductListStyle>
        );
      })()}
    </>
  );
};

export default ProductList;
