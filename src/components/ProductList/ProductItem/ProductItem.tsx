import { forwardRef } from "react";
import { postProductInCart } from "@api/index";
import CountControlButtonBundle from "@components/CountControlButtonBundle/CountControlButtonBundle";
import AddCartButton from "@components/Button/AddCartButton";
import { useCartItems, useError } from "@hooks/index";
import DefaultImage from "@assets/no-image.png";
import * as PI from "./ProductItem.style";

interface ProductProps {
  product: Product;
}

const ProductItem = forwardRef<HTMLDivElement, ProductProps>(
  ({ product }, ref) => {
    const { cartItems, refetchCartItems } = useCartItems({ retry: false });
    const { showError } = useError();

    const productInCart = cartItems.find(
      (item) => item.product.id === product.id,
    );

    const cartItemIds = cartItems.map((item) => item.product.id);
    const isInCart = cartItemIds.includes(product.id);

    const handleIsInCart = async () => {
      try {
        if (!isInCart) {
          await postProductInCart(product.id);
          refetchCartItems();
          return;
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
          onError={(event) => {
            event.currentTarget.src = DefaultImage;
          }}
        />
        <PI.ProductGroup>
          <PI.ProductContent>
            <PI.ProductName>{product.name}</PI.ProductName>
            <span>{product.price.toLocaleString("ko-kr")}원</span>
          </PI.ProductContent>
          <PI.CartButton>
            {isInCart ? (
              <CountControlButtonBundle
                amount={productInCart?.quantity || 0}
                cartItemId={productInCart!.id}
                cartItemQuantity={productInCart!.quantity}
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
