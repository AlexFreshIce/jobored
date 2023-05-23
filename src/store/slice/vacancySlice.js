import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_KEY, endpoints } from "../../api";
import { customURL } from "../../api";

const favoriteVacancies = localStorage.getItem("favoriteVacancies")
  ? JSON.parse(localStorage.getItem("favoriteVacancies"))
  : {objects:[], total:0};

const initialState = {
  vacancies: {objects:[], total:0},
  isLoading: false,
  error: null,
  currentVacancy: null,
  favoriteVacancies,
};

export const getAllVacancies = createAsyncThunk(
  "vacancy/getAllVacancies",
  async (arg, { getState }) => {
    const { authSlice, filterSlice } = getState();
    const { accessToken, currentUser } = authSlice;
    const { filter } = filterSlice;
    const loginURL = customURL(endpoints.VACANCY.SEARCH, filter);
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
    const { authSlice } = getState();
    const { accessToken, currentUser } = authSlice;
    const loginURL = customURL(endpoints.VACANCY.ID, null) + id;
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

      if (data.total) {
        throw new Error(`Invalid vacancy id`);
      }
      return data;
    } catch (e) {
      throw e;
    }
  }
);

const vacancySlice = createSlice({
  name: "vacancy",
  initialState,
  reducers: {
    addToFavorites: (state, { payload }) => {
      state.favoriteVacancies.objects.push(payload);
      state.favoriteVacancies.total += 1;
    },
    deleteFromFavorites: (state, { payload }) => {
      const vacancies = state.favoriteVacancies.objects.filter(
        (elem) => elem.id !== payload
      );

      return {
        ...state,
        favoriteVacancies: {
          objects: vacancies,
          total: vacancies.length,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllVacancies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllVacancies.fulfilled, (state, action) => {
        state.vacancies = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllVacancies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
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
        // state.currentVacancy = null
        state.isLoading = false;
        state.error = action.error;
      })
      .addDefaultCase(() => {});
  },
});

export default vacancySlice.reducer;
export const { addToFavorites, deleteFromFavorites } = vacancySlice.actions;
export const selectVacancies = (state) => state.vacancySlice.vacancies;
export const selectFavoriteVacancies = (state) =>
  state.vacancySlice.favoriteVacancies;
export const selectVacancyIsLoading = (state) => state.vacancySlice.isLoading;
export const selectVacancyError = (state) => state.vacancySlice.error;
export const selectCurrentVacancy = (state) =>
  state.vacancySlice.currentVacancy;
