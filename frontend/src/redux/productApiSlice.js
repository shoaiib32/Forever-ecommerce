import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("http://localhost:4000/api/product/list");
    return response.data; // stays { success, products }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  "product/singleProduct",
  // you can take `id` directly, no need to destructure an object
  async (id) => {
    const response = await axios.get(
      `http://localhost:4000/api/product/single/${id}`
    );
    return response.data; // ← payload will now be the { success, product } object
  }
); 

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: null,
    selectedProduct: null,
    loading: false,
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.products; // <-- payload.products holds your array
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      })

      //single product
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.product = action.payload.product;
        state.loading = false;
      })
      .addCase(fetchSingleProduct.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;
