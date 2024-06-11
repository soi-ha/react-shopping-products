import { patchCartItems } from "@api/index";
import { QUERY_KEY } from "@constants/rules";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface MutationFnProps {
  cartItemId: number;
  quantity: number;
}

const useControlCart = () => {
  const queryClient = useQueryClient();

  const mutationFn = (cartItemId: number, newQuantity: number) => {
    if (cartItemId === undefined || newQuantity === undefined) {
      return Promise.reject("cartItemId 또는 newQuantity가 존재하지 않습니다.");
    }
    return patchCartItems(cartItemId, newQuantity);
  };

  const increaseToCart = useMutation({
    mutationFn: ({ cartItemId, quantity }: MutationFnProps) =>
      mutationFn(cartItemId, quantity + 1),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.cartItems] });
    },
  });

  const decreaseToCart = useMutation({
    mutationFn: ({ cartItemId, quantity }: MutationFnProps) => {
      if (quantity <= 1) {
        return Promise.reject(
          "quantity가 1이하 일 경우, 수량을 삭제할 수 없습니다.",
        );
      }
      return mutationFn(cartItemId, quantity - 1);
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
