
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import vacancySlice from "./slice/vacancySlice";
import filterSlice from "./slice/filterSlice";

const store = configureStore({
  reducer: { authSlice, vacancySlice, filterSlice },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
