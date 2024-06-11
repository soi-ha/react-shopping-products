import { patchCartItems } from "@api/index";
import { QUERY_KEY } from "@constants/rules";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  cartItemId?: number;
  quantity?: number;
}

const useControlCart = ({ cartItemId, quantity }: Props) => {
  const queryClient = useQueryClient();

  const mutationFn = (newQuantity: number) => {
    if (cartItemId === undefined || quantity === undefined) {
      return Promise.reject("cartItemId 또는 quantity가 존재하지 않습니다.");
    }
    return patchCartItems(cartItemId, newQuantity);
  };

  const increaseToCart = useMutation({
    mutationFn: () => mutationFn(quantity! + 1),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.cartItems] });
    },
  });

  const decreaseToCart = useMutation({
    mutationFn: () => {
      if (quantity! <= 1) {
        return Promise.reject(
          "quantity가 1이하 일 경우, 수량을 삭제할 수 없습니다.",
        );
      }
      return mutationFn(quantity! - 1);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.cartItems] });
    },
  });

  return {
    increaseToCart,
    decreaseToCart,
  };
};

export default useControlCart;
