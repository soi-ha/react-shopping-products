import { forwardRef, useContext } from "react";
import * as PI from "./ProductItem.style";
import { deleteProductInCart, postProductInCart } from "@api/index";
import { useError } from "@hooks/index";
import { CartItemsContext } from "@context/CartItemsContext";
import CountControlButtonBundle from "@components/CountControlButtonBundle/CountControlButtonBundle";
import AddCartButton from "@components/Button/AddCartButton";

interface ProductProps {
  product: Product;
}

const ProductItem = forwardRef<HTMLDivElement, ProductProps>(
  ({ product }, ref) => {
    const { cartItems, refreshCartItems } = useContext(CartItemsContext);

    const cartItemIds = cartItems.map((item) => item.product.id);
    const isInCart = cartItemIds.includes(product.id);

    const { showError } = useError();

    const handleIsInCart = async () => {
      try {
        if (!isInCart) {
          await postProductInCart(product.id);
          refreshCartItems();
          return;
        }

        const filteredItem = cartItems.find(
          (item) => item.product.id === product.id,
        );
        if (filteredItem) {
          await deleteProductInCart(filteredItem.id);
          refreshCartItems();
        }
      } catch (error) {
        if (error instanceof Error) {
          showError(error.message);
        }
      }
    };

    return (
      <PI.ProductItemStyle ref={ref}>
        <PI.ProductImg
          src={`${product.imageUrl}`}
          alt={`${product.name} 상품 이미지`}
        />
        <PI.ProductGroup>
          <PI.ProductContent>
            <PI.ProductName>{product.name}</PI.ProductName>
            <span>{product.price.toLocaleString("ko-kr")}원</span>
          </PI.ProductContent>
          <PI.CartButton>
            {isInCart ? (
              <CountControlButtonBundle
                amount={1}
                handleDecrementAmount={() => {}}
                handleIncrementAmount={() => {}}
              />
            ) : (
              <AddCartButton onClick={handleIsInCart} />
            )}
          </PI.CartButton>
        </PI.ProductGroup>
      </PI.ProductItemStyle>
    );
  },
);

export default ProductItem;
