import {  createContext, useState } from "react";

const CartContext = createContext({});

export const CartDataProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartContext;
