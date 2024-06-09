import { AddCartStyle } from "./Button.style";
import AddCart from "@assets/add-cart.svg";

const AddCartButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <AddCartStyle onClick={onClick}>
      <img src={AddCart} alt="장바구니 추가" />
      <span>담기</span>
    </AddCartStyle>
  );
};

export default AddCartButton;
