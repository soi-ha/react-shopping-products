import { AddCartStyle, RemoveCartStyle } from "./Button.style";
import AddCartImg from "@assets/add-cart.svg";
import RemoveCartImg from "@assets/remove-cart.svg";

interface CartControlButtonProps {
  isInCart: boolean;
  onClick: () => void;
}

const CartControlButton = ({ isInCart, onClick }: CartControlButtonProps) => {
  return (
    <>
      {isInCart ? (
        <RemoveCartStyle onClick={onClick}>
          <img src={RemoveCartImg} alt="장바구니 삭제" />
          <span>빼기</span>
        </RemoveCartStyle>
      ) : (
        <AddCartStyle onClick={onClick}>
          <img src={AddCartImg} alt="장바구니 추가" />
          <span>담기</span>
        </AddCartStyle>
      )}
    </>
  );
};

export default CartControlButton;
