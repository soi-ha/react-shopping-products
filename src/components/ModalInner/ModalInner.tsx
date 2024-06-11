import { Button } from "@components/Button/index";
import CountControlButtonBundle from "../CountControlButtonBundle/CountControlButtonBundle";
import { useCartItems, useDeleteCart, useError } from "@hooks/index";
import * as MI from "./ModalInner.style";

const CartItem = ({ cartItem }: { cartItem: CartItem }) => {
  const { showError } = useError();

  const { deleteCartItem } = useDeleteCart({ cartId: cartItem.id });

  const handleDeleteCartItem = () => {
    try {
      deleteCartItem.mutate();
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message);
      }
    }
  };

  return (
    <MI.CartItem>
      <MI.CartItemImg src={cartItem.product.imageUrl} alt="" />
      <MI.CartItemContent>
        <MI.ContentName>{cartItem.product.name}</MI.ContentName>
        <MI.ContentPrice>
          {cartItem.product.price.toLocaleString("ko-kr")}원
        </MI.ContentPrice>
        <CountControlButtonBundle
          amount={cartItem.quantity}
          cartItemId={cartItem.id}
          cartItemQuantity={cartItem.quantity}
        />
      </MI.CartItemContent>
      <MI.CartItemDeleteButton>
        <Button text="삭제" onClick={handleDeleteCartItem} />
      </MI.CartItemDeleteButton>
    </MI.CartItem>
  );
};

const ModalInner = () => {
  const { cartItems } = useCartItems({ retry: false });

  return (
    <>
      {cartItems &&
        cartItems.map((item) => {
          return <CartItem cartItem={item} />;
        })}
      <MI.TotalPriceStyle>
        <MI.TotalPriceTitle>총 결제 금액</MI.TotalPriceTitle>
        <MI.TotalPrice>95,000원</MI.TotalPrice>
      </MI.TotalPriceStyle>
    </>
  );
};

export default ModalInner;
