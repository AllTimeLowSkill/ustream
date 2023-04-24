import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategoryService } from "../../api/category.service";

const initialState = {
  categories: null,
  isLoading: false,
};

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async () => CategoryService.getCategories()
);

export const updateCategory = createAsyncThunk(
  "category/updateStreamCategory",
  async (data) => CategoryService.updateCategory(data)
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
  },
  extraReducers: (build) => {
    build.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    build.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    });
  },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
