import type { IMovie } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  value: IMovie[];
}

const initialState: InitialState = {
  value: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<IMovie>) => {
      const isExist = state.value.some((item) => item.id === action.payload.id);
      if (isExist) {
        state.value = state.value.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.value.push(action.payload);
      }
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
