import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_KEY, endpoints } from "../../api";
import { customURL } from "../../api";

const initialState = {
  vacancy: null,
  isLoading: false,
  error: null,
};
// const filters = {
//   published: 1,
//   keyword: null,
//   payment_from: null,
//   payment_to: null,
//   catalogues: 33,
// };
export const getAllVacancies = createAsyncThunk(
  "vacancy/getAllVacancies",
  async (arg, { getState }) => {
    const { authSlice, filterSlice } = getState();
    const { accessToken, currentUser } = authSlice;
    // const { accessToken, currentUser } = authSlice;
    const loginURL = customURL(endpoints.VACANCY.SEARCH, filterSlice);
    const autharization = `Bearer ${accessToken}`;
    try {
      const response = await fetch(loginURL, {
        method: "GET",
        body: null,
        headers: {
          "Content-Type": "application/json",
          authorization: autharization,
          "X-Api-App-Id": currentUser.client_secret,

          ...API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Could not fetch ${loginURL}, status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log(data);

      return data;
    } catch (e) {
      throw e;
    }
  }
);

const vacancySlice = createSlice({
  name: "vacancy",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllVacancies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllVacancies.fulfilled, (state, action) => {
        state.vacancy = action.payload.objects;
        state.isLoading = false;
      })
      .addCase(getAllVacancies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addDefaultCase(() => {});
  },
});

export default vacancySlice.reducer;

export const selectVacancy = (state) => state.vacancySlice.vacancy;
export const selectVacancyIsLoading = (state) => state.vacancySlice.isLoading;
