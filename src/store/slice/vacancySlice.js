import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_KEY, endpoints } from "../../api";
import { customURL } from "../../api";

const initialState = {
  vacancies: null,
  isLoading: false,
  error: null,
  currentVacancy: null
};

export const getAllVacancies = createAsyncThunk(
  "vacancy/getAllVacancies",
  async (arg, { getState }) => {
    const { authSlice, filterSlice } = getState();
    const { accessToken, currentUser } = authSlice;
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
      return data;

    } catch (e) {
      throw e;
    }

  }
);

export const getVacancyByID = createAsyncThunk(
  "vacancy/getVacancyByID",
  async (id, { getState }) => {
    const { authSlice, filterSlice } = getState();
    const { accessToken, currentUser } = authSlice;
    const loginURL = customURL(endpoints.VACANCY.ID, null)+id;
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
      // console.log(data);
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
        state.vacancies = action.payload.objects;
        state.isLoading = false;
      })
      .addCase(getAllVacancies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getVacancyByID.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getVacancyByID.fulfilled, (state, action) => {
        state.currentVacancy = action.payload;
        state.isLoading = false;
      })
      .addCase(getVacancyByID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addDefaultCase(() => {});
  },
});

export default vacancySlice.reducer;

export const selectVacancies = (state) => state.vacancySlice.vacancies;
export const selectVacancyIsLoading = (state) => state.vacancySlice.isLoading;
export const selectVacancyError = (state) => state.vacancySlice.error;
export const selectCurrentVacancy = (state) => state.vacancySlice.currentVacancy;


