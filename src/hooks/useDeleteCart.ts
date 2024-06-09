import { deleteProductInCart } from "@api/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteCart = ({ cartId }: { cartId: number }) => {
  const queryClient = useQueryClient();

  const deleteCartItem = useMutation({
    mutationFn: () => deleteProductInCart(cartId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
  });

  return { deleteCartItem };
};

export default useDeleteCart;
