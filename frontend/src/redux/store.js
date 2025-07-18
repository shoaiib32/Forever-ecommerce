import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user";
import productsSlice from './productApiSlice'
import searchSlice from "./search.js";
import cartSlice from "./cart.js"
import loginRegistrationSlice from "./loginSignupApiSlice.js"

const store = configureStore({
  reducer:{
    user:userSlice, 
    product:productsSlice,
    search:searchSlice,
    cart:cartSlice,
    loginRegistration:loginRegistrationSlice
  }
})

export default store