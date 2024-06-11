import { CountButtonStyle } from "./Button.style";
import PlusImg from "@assets/plus.svg";
import MinusImg from "@assets/minus.svg";

type CountType = "plus" | "minus";

export default function CountButton({
  type,
  onClick,
}: {
  type: CountType;
  onClick: () => void;
}) {
  return (
    <CountButtonStyle onClick={onClick}>
      <img
        src={type === "plus" ? PlusImg : MinusImg}
        alt={type === "plus" ? "상품 수량 더하기" : "상품 수량 빼기"}
      />
    </CountButtonStyle>
  );
}
