import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Login
export const login = createAsyncThunk("login", async (loginData) => {
  const response = await axios.post(
    "http://localhost:4000/api/user/login",
    loginData // Send directly
  );
  return response.data;
});

// Registration
export const registration = createAsyncThunk(
  "registraition",
  async (loginData) => {
    const response = await axios.post(
      "http://localhost:4000/api/user/register",
      loginData // Send directly
    );
    return response.data;
  }
);

const loginRegistrationSlice = createSlice({
  name: "loginRegistraion",
  initialState: {
    user: null,
    token: null,
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder

      //login
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token); // ← persist it
        state.loading = false;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })

      //register

      .addCase(registration.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.token = action.payload.token;
        console.log(state.token);

        state.loading = false;
      })
      .addCase(registration.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setToken, clearToken } = loginRegistrationSlice.actions;
export default loginRegistrationSlice.reducer;
