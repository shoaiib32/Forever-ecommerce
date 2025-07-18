import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "searchBarToggle",
  initialState: { searchBar: false },
  reducers: {
    toggleSearchBar(state) {
      state.searchBar = !state.searchBar;
    }
  }
});


export const { toggleSearchBar } = toggleSlice.actions;
export default toggleSlice.reducer;
