import {  createContext, useState } from "react";

const ProductContext = createContext({});

export const ProductDataProvider = ({ children }) => {
  const [product, setProduct] = useState(null);
  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
export default ProductContext;
