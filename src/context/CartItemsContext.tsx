import { createContext, useState, ReactNode, useEffect } from "react";
import { getCartItems } from "@api/index";
import { useError } from "@hooks/index";

interface CartItemsContextType {
  cartItems: CartItem[];
  refreshCartItems: () => void;
}

export const CartItemsContext = createContext<CartItemsContextType>({
  cartItems: [],
  refreshCartItems: () => {},
});

interface CartItemsProviderProps {
  children: ReactNode;
}

export const CartItemsProvider: React.FC<CartItemsProviderProps> = ({
  children,
}) => {
  const { showError } = useError();

  const [toggle, setToggle] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const refreshCartItems = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartItems = await getCartItems();
        setCartItems(cartItems);
      } catch (error) {
        if (error instanceof Error) {
          showError(error.message);
        }
      }
    };

    fetchCartItems();
  }, [toggle, showError]);

  return (
    <CartItemsContext.Provider value={{ cartItems, refreshCartItems }}>
      {children}
    </CartItemsContext.Provider>
  );
};
