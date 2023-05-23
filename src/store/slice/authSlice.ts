import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_KEY, endpoints } from "../../api";
import { customURL } from "../../api";
import { RootState } from "..";

interface IAuthState {
  currentUser: {
    login: string;
    password: string;
    client_id: string;
    client_secret: string;
    hr: string;
  };
  accessToken: string | null;
  isAuth: boolean;
  isLoading: boolean;
  error: null | {};
}

const accessToken = localStorage.getItem("accessToken")
  ? localStorage.getItem("accessToken")
  : null;

const isAuth = accessToken ? true : false;

const initialState = {
  currentUser: {
    login: "sergei.stralenia@gmail.com",
    password: "paralect123",
    client_id: "2356",
    client_secret:
      "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948",
    hr: "0",
  },
  accessToken,
  isAuth,
  isLoading: false,
  error: null,
} as IAuthState;

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (arg: void, api) => {
    const appState = api.getState() as RootState;
    const currentUser = appState.authSlice.currentUser;
    const loginURL = customURL(endpoints.AUTH.LOGIN, currentUser);

    try {
      const response = await fetch(loginURL, {
        method: "GET",
        body: null,
        headers: { "Content-Type": "application/json", ...API_KEY },
      });

      if (!response.ok) {
        throw new Error(
          `Could not fetch ${loginURL}, status: ${response.status}`
        );
      }

      const data = await response.json();

      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);

      return data;
    } catch (e) {
      throw e;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isAuth = false;
        state.accessToken = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.accessToken = action.payload.access_token;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuth = false;
        state.isLoading = false;
        state.error = action.error;
      })
      .addDefaultCase(() => {});
  },
});

export default authSlice.reducer;

export const selectAccessToken = (state: RootState) =>
  state.authSlice.accessToken;
export const selectIsAuth = (state: RootState) => state.authSlice.isAuth;
export const selectAuthIsLoading = (state: RootState) =>
  state.authSlice.isLoading;
export const selectAuthError = (state: RootState) =>
  state.authSlice.error;
