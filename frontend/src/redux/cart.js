import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {},
  reducers: {
    addToCart: (state, action) => {
      const { itemId, size } = action.payload;

      if (state[itemId]) {
        if (state[itemId][size]) {
          state[itemId][size] += 1;
        } else {
          state[itemId][size] = 1;
        }
      } else {
        state[itemId] = {};
        state[itemId][size] = 1;
      }
    },
    updateQuantity: (state, action) => {
      const { itemId, size, quantity } = action.payload;
      state[itemId][size] = quantity;
    },
    getCartCount: (state, action) => {
      let totalCount = 0;
      for (const items in state) {
        for (const item in state[items]) {
          try {
            if (state[items][item] > 0) {
              totalCount += state[items][item];
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
      return totalCount;
    }
  },
});

export const { addToCart, updateQuantity, getCartCount } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartCount = (rootState) => {
  let total = 0;
  const items = rootState.cart;     // <-- “cart” matches your store key
  for (const id in items) {
    for (const sz in items[id]) {
      const q = items[id][sz];
      if (q > 0) total += q;
    }
  }
  return total;
};
