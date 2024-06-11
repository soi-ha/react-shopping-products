import { getCartItems } from "@api/index";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useError } from "@hooks/index";
import { QUERY_KEY } from "@constants/rules";

interface Props {
  retry?: boolean;
}

const useCartItems = ({ retry }: Props) => {
  const { showError } = useError();

  const queryClient = useQueryClient();
  const { data, error, isError } = useQuery({
    queryKey: [QUERY_KEY.cartItems],
    queryFn: getCartItems,
    retry,
  });

  const refetchCartItems = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.cartItems] });
  };

  useEffect(() => {
    if (isError && error) {
      showError(error.message);
    }
  }, [error, isError]);

  return {
    cartItems: data ?? [],
    error,
    refetchCartItems,
  };
};

export default useCartItems;
