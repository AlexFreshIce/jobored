import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { fetchCatalogues } from "../../api";
import { FilterStateType } from "./types";

const initialState = {
  filter: {
    published: 1,
    catalogues: null,
    payment_from: null,
    payment_to: null,
    keyword: "",
    page: 1,
    count: 4,
  },
  cataloguesArr: [],
  isLoading: false,
  error: null,
} as FilterStateType;

export const getCataloguesArr = createAsyncThunk(
  "filter/getCataloguesArr",
  async () => {
    try {
      const response: Response = await fetchCatalogues();
      if (!response.ok) {
        throw new Error(
          `Could not fetch catalogues, status: ${response.status}`
        );
      }
      const data = await response.json();
      const cataloguesArr = data.map((elem: { key: number; title: string }) => {
        return { value: elem.key, label: elem.title };
      });
      return cataloguesArr;
    } catch (e) {
      throw e;
    }
  }
);

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterClear: (state) => {
      state.filter = initialState.filter;
    },
    filterChangeCatalogues: (state, action) => {
      state.filter.catalogues = action.payload;
      state.filter.page = 1;
    },
    filterChangeFromValue: (state, action) => {
      state.filter.payment_from = action.payload;
      state.filter.page = 1;
    },
    filterChangeToValue: (state, action) => {
      state.filter.payment_to = action.payload;
      state.filter.page = 1;
    },
    filterChangeAllValue: (state, action) => {
      state.filter.catalogues = action.payload.selectValue;
      state.filter.payment_from = action.payload.inputFromValue;
      state.filter.payment_to = action.payload.inputToValue;
      state.filter.page = 1;
    },
    filterSetKeyword: (state, action) => {
      state.filter.keyword = action.payload;
      state.filter.page = 1;
    },
    changeCurrentPage: (state, action) => {
      state.filter.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCataloguesArr.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCataloguesArr.fulfilled, (state, action) => {
        state.cataloguesArr = action.payload;
        state.isLoading = false;
      })
      .addCase(getCataloguesArr.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addDefaultCase(() => {});
  },
});

export default filterSlice.reducer;

export const {
  filterClear,
  filterChangeCatalogues,
  filterChangeFromValue,
  filterChangeToValue,
  filterChangeAllValue,
  filterSetKeyword,
  changeCurrentPage,
} = filterSlice.actions;

export const selectFromValue = (state: RootState) =>
  state.filterSlice.filter.payment_from;
export const selectToValue = (state: RootState) =>
  state.filterSlice.filter.payment_to;
export const selectCatalogues = (state: RootState) =>
  state.filterSlice.filter.catalogues;
export const selectKeyword = (state: RootState) =>
  state.filterSlice.filter.keyword;
export const selectPage = (state: RootState) => state.filterSlice.filter.page;
export const selectCataloguesArr = (state: RootState) =>
  state.filterSlice.cataloguesArr;
export const selectIsLoading = (state: RootState) =>
  state.filterSlice.isLoading;
export const selectFilter = (state: RootState) => state.filterSlice.filter;
