import LogoImg from "@assets/logo.svg";
import CartImg from "@assets/cart.svg";
import useCartItems from "@hooks/useCartItems";
import * as H from "./Header.style";

export default function Header({
  handleOpenCartModal,
}: {
  handleOpenCartModal: () => void;
}) {
  const { cartItems } = useCartItems({ retry: false });
  const quantityInCart = cartItems.length ? cartItems.length : 0;

  return (
    <H.HeaderStyle>
      <H.LogoImg src={LogoImg} alt="로고" />
      <H.CartButton onClick={handleOpenCartModal}>
        <H.CartImg src={CartImg} alt="장바구니" />
        {quantityInCart && <H.CartCount>{quantityInCart}</H.CartCount>}
      </H.CartButton>
    </H.HeaderStyle>
  );
}
