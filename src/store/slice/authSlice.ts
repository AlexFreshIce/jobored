import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { fetchAuth, fetchRefreshToken } from "../../api";
import { AuthStateType } from "./types";

const accessToken = localStorage.getItem("accessToken");

const ttlFromStorage = localStorage.getItem("ttl");
const ttl = ttlFromStorage ? ttlFromStorage : 0;

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
  ttl,
  isAuth,
  isLoading: false,
  error: null,
} as AuthStateType;

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (arg: void, api) => {
    const appState = api.getState() as RootState;
    const currentUser = appState.authSlice.currentUser;

    try {
      const response: Response = await fetchAuth(currentUser);

      if (!response.ok) {
        throw new Error(`Could not fetch login, status: ${response.status}`);
      }

      const data = await response.json();

      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("ttl", data.ttl);
      localStorage.setItem("refreshToken", data.refresh_token);

      return data;
    } catch (e) {
      throw e;
    }
  }
);
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (arg: void, api) => {
    const appState = api.getState() as RootState;
    const { client_id, client_secret } = appState.authSlice.currentUser;
    const refToken = localStorage.getItem("refreshToken")
      ? localStorage.getItem("refreshToken")
      : null;
    try {
      const response: Response = await fetchRefreshToken({
        refresh_token: refToken,
        client_id,
        client_secret,
      });

      if (!response.ok) {
        throw new Error(
          `Could not fetch refresh token, status: ${response.status}`
        );
      }

      const data = await response.json();

      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("ttl", data.ttl);
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
        state.ttl = 0;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.accessToken = action.payload.access_token;
        state.ttl = action.payload.ttl;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuth = false;
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(refreshToken.pending, (state) => {
        state.accessToken = null;
        state.ttl = 0;
        state.isLoading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
        state.ttl = action.payload.ttl;
        state.isLoading = false;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isAuth = false;
        state.isLoading = false;
      })
      .addDefaultCase(() => {});
  },
});

export default authSlice.reducer;

export const selectAccessToken = (state: RootState) =>
  state.authSlice.accessToken;
export const selectTtl = (state: RootState) => state.authSlice.ttl;
export const selectIsAuth = (state: RootState) => state.authSlice.isAuth;
export const selectAuthIsLoading = (state: RootState) =>
  state.authSlice.isLoading;
export const selectAuthError = (state: RootState) => state.authSlice.error;
