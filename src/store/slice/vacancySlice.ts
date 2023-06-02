import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { fetchFilteredVacancie, fetchVacancyById } from "../../api";
import { VacanciesType, VacancyType } from "../../types";

const favoriteVacanciesFromStorage = localStorage.getItem("favoriteVacancies");
const favoriteVacancies = favoriteVacanciesFromStorage
  ? JSON.parse(favoriteVacanciesFromStorage)
  : { objects: [], total: 0 };

interface IVacancyState {
  vacancies: VacanciesType;
  isLoading: boolean;
  error: null | {};
  currentVacancy: null | VacancyType;
  favoriteVacancies: VacanciesType;
}

const initialState = {
  vacancies: { objects: [], total: 0 },
  isLoading: false,
  error: null,
  currentVacancy: null,
  favoriteVacancies,
} as IVacancyState;

export const getAllVacancies = createAsyncThunk(
  "vacancy/getAllVacancies",
  async (arg: void, api) => {
    // const appState = api.getState() as RootState;
    // const { authSlice, filterSlice } = appState;
    // const { accessToken, currentUser } = authSlice;
    // const autharization = `Bearer ${accessToken}`;
    try {
      const response = await fetchFilteredVacancie();
      if (!response.ok) {
        throw new Error(`Could not fetch vacancie, status: ${response.status}`);
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
  async (id: number, api) => {
    // const appState = api.getState() as RootState;
    // const { authSlice } = appState;
    // const { accessToken, currentUser } = authSlice;
    // const autharization = `Bearer ${accessToken}`;
    try {
      const response = await fetchVacancyById(id);
      if (!response.ok) {
        throw new Error(
          `Could not fetch vacancy id:${id}, status: ${response.status}`
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
      const objects = [...state.favoriteVacancies.objects, payload];
      const total = objects.length;
      return {
        ...state,
        favoriteVacancies: {
          objects,
          total,
        },
      };
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
export const selectVacancies = (state: RootState) =>
  state.vacancySlice.vacancies;
export const selectFavoriteVacancies = (state: RootState) =>
  state.vacancySlice.favoriteVacancies;
export const selectVacancyIsLoading = (state: RootState) =>
  state.vacancySlice.isLoading;
export const selectVacancyError = (state: RootState) =>
  state.vacancySlice.error;
export const selectCurrentVacancy = (state: RootState) =>
  state.vacancySlice.currentVacancy;
