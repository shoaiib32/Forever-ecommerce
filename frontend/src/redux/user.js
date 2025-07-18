import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "store",
  initialState: {
    user: null,
    token: null,
  },
  reducers:{
    setUser:(state,action) =>{
         state.user=action.payload
    },clearUser:(state)=>{
      state.user=null
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  }
});


export const userAction = userSlice.actions;
export default userSlice;