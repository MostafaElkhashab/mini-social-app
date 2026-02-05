import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
export const myStore = configureStore({
  reducer: {
    auth: authReducer,
  },
});
export type StoreType = ReturnType<typeof myStore.getState>;
