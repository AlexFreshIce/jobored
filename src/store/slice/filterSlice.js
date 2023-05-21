import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_KEY, endpoints } from "../../api";
import { customURL } from "../../api";

const initialState = {
  filter: {
    published: 1,
    // catalogues: "33",
    catalogues: "",
    payment_from: "",
    payment_to: "",
    keyword: "",
    // no_agreement:1,
  },
  cataloguesArr: [],
  isLoading: false,
  error: null,
};

export const getCataloguesArr = createAsyncThunk(
  "filter/getCataloguesArr",
  async (arg, { getState }) => {
    const { accessToken, currentUser } = getState().authSlice;
    const cataloguesURL = customURL(endpoints.FILTER.CATALOGUES);
    const autharization = `Bearer ${accessToken}`;
    try {
      const response = await fetch(cataloguesURL, {
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
          `Could not fetch ${cataloguesURL}, status: ${response.status}`
        );
      }

      const data = await response.json();

      const cataloguesArr = data.map((elem) => {
        return { value: elem.key, label: elem.title };
      });

      // console.log(data);
      // console.log(cataloguesArr);

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
      state.filter = initialState;
    },
    filterChangeCatalogues: (state, action) => {
      state.filter.catalogues = action.payload;
    },
    filterChangeFromValue: (state, action) => {
      state.filter.payment_from = action.payload;
    },
    filterChangeToValue: (state, action) => {
      state.filter.payment_to = action.payload;
    },
    filterSetKeyword: (state, action) => {
      state.keyword = action.payload;
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
        state.error = action.payload;
      })
      .addDefaultCase(() => {});
  },
});

export default filterSlice.reducer;
export const {
  filterClear,
  filterChangeFromValue,
  filterChangeToValue,
  filterChangeCatalogues,
  filterSetKeyword,
} = filterSlice.actions;

export const selectFromValue = (state) => state.filterSlice.filter.payment_from;
export const selectToValue = (state) => state.filterSlice.filter.payment_to;
export const selectCatalogues = (state) => state.filterSlice.filter.catalogues;
export const selectKeyword = (state) => state.filterSlice.filter.keyword;
export const selectCataloguesArr = (state) => state.filterSlice.cataloguesArr;
export const selectIsLoading = (state) => state.filterSlice.isLoading;
