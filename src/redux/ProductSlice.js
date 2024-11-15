import { createSlice } from "@reduxjs/toolkit";

export const initialState = {};

const ProductSlice = createSlice({
  name: "product",
  initialState:[],
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    },
  },
});
export const { setProducts } = ProductSlice.actions;
export default ProductSlice.reducer;
