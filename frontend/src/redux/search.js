// src/redux/search.js
import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: { searchBar: false, search: null },
  reducers: {
    toggleSearchBar(state) {
      state.searchBar = !state.searchBar;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
});

// named export for the action creator
export const {toggleSearchBar , setSearch } = searchSlice.actions;
export default searchSlice.reducer;
