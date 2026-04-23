import { configureStore } from "@reduxjs/toolkit";
import wishlistSlice from "./features/wishlistSlice";

export const store = configureStore({
  reducer: {
    wishlistSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
