import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const newGenericSlice = <T>(name: string, initialState: T) =>
  createSlice({
    name,
    initialState,
    reducers: {
      setValue: (state, action: PayloadAction<T>) => {
        return action.payload;
      },
    },
  });
