import { createContext, useEffect, useState, type ReactNode } from "react";
import { type ProductProps } from "../pages/home";

interface CartContextData {
  cart: CartProps[];
  cartAmount: number;
  addItemCart: (newItem: ProductProps) => void;
  removeItemCart: (product: CartProps) => void;
  clearCart: () => void;
  total: string;
}
interface CartProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
  amount: number;
  total: number;
}

interface CartProviderProps {
  children: ReactNode;
}


export const CartContext = createContext({} as CartContextData);

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartProps[]>([]);
  const [total, setTotal] = useState("");

  useEffect(() => {
    const minhaLista = localStorage.getItem("@petcart");
    if(minhaLista) {
      const parsedCart = JSON.parse(minhaLista);
      setCart(parsedCart);
      totalCart(parsedCart);
    }
  }, []);

  function clearCart() {
  setCart([]);
  setTotal("");
  localStorage.removeItem("@petcart");
}



  function addItemCart(newItem: ProductProps) {
    const itemIndex = cart.findIndex((item) => item.id === newItem.id);
    if (itemIndex !== -1) {
      let cartList = cart;
      cartList[itemIndex].amount = cartList[itemIndex].amount + 1;
      cartList[itemIndex].total =
        cartList[itemIndex].amount * cartList[itemIndex].price;
      setCart(cartList);
      totalCart(cartList);
      localStorage.setItem("@petcart", JSON.stringify(cartList))
      return;
    }
    let data = {
      ...newItem,
      amount: 1,
      total: newItem.price,
    };
    setCart((products) => [...products, data]);
    totalCart([...cart, data]);
    localStorage.setItem("@petcart", JSON.stringify([...cart, data]))
  }

  function removeItemCart(product: CartProps) {
    const indexItem = cart.findIndex((item) => item.id === product.id);
    if (cart[indexItem]?.amount > 1) {
      let cartList = cart;
      cartList[indexItem].amount = cartList[indexItem].amount - 1;
      cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price;
      setCart(cartList);
      totalCart(cartList);
      localStorage.setItem("@petcart", JSON.stringify(cartList))
      return;
    }
    const removeItem = cart.filter((item) => item.id !== product.id);
    setCart(removeItem);
    totalCart(removeItem);
    localStorage.setItem("@petcart", JSON.stringify(removeItem))

  }


    function totalCart(items: CartProps[]) {
    let myCart = items;
    let result = myCart.reduce((acc, obj) => {
      return acc + obj.total;
    }, 0);
    const format = result.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
    setTotal(format);
  }
    return (
    <CartContext.Provider
      value={{
        cart,
        cartAmount: cart.length,
        addItemCart,
        removeItemCart,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export default CartProvider;