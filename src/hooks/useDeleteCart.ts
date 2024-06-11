import { deleteProductInCart } from "@api/index";
import { QUERY_KEY } from "@constants/rules";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteCart = ({ cartId }: { cartId: number }) => {
  const queryClient = useQueryClient();

  const deleteCartItem = useMutation({
    mutationFn: () => deleteProductInCart(cartId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.cartItems] });
    },
  });

  return { deleteCartItem };
};

export default useDeleteCart;
