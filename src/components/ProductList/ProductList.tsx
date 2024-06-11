import ProductListHeader from "@components/ProductListHeader/ProductListHeader";
import ProductItem from "./ProductItem/ProductItem";
import * as PL from "./ProductList.style";
import { useInfiniteScroll, useProducts } from "@hooks/index";

const ProductList = () => {
  const {
    products,
    isLoading,
    isFetching,
    hasNextPage,
    handleCategory,
    handleSort,
    fetchNextPage,
  } = useProducts();

  const { lastElementRef: lastProductElementRef } = useInfiniteScroll({
    hasMore: hasNextPage,
    loading: isFetching,
    nextPage: fetchNextPage,
  });

  return (
    <>
      <ProductListHeader
        handleCategory={handleCategory}
        handleSort={handleSort}
      />
      {(() => {
        if (products.length === 0 && !isLoading) {
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
