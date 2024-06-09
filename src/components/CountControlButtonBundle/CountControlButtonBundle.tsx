import { CountButton } from "../Button";
import { CountControlButtonBundleStyle } from "./CountControlButtonBundle.style";

interface Props {
  amount: number;
  handleDecrementAmount: () => void;
  handleIncrementAmount: () => void;
}

const CountControlButtonBundle = ({
  amount,
  handleDecrementAmount,
  handleIncrementAmount,
}: Props) => {
  return (
    <CountControlButtonBundleStyle>
      <CountButton type="minus" onClick={handleDecrementAmount} />
      <span className="cart-item_amount">{amount}</span>
      <CountButton type="plus" onClick={handleIncrementAmount} />
    </CountControlButtonBundleStyle>
  );
};
export default CountControlButtonBundle;
