import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import streamsSlice from "./slices/streamsSlice";
import categorySlice from "./slices/categorySlice";

const rootReducer = combineReducers({
  user: userSlice,
  streams: streamsSlice,
  category: categorySlice,
});

export const makeSore = () =>
  configureStore({
    reducer: rootReducer,
  });
