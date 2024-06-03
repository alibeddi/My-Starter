import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  selectedClass: null,
  selectedGov: null,
};

export const registerDataSlice = createSlice({
  name: "registerData",
  initialState,
  reducers: {
    saveData: (state, { payload }) => {
      state.data = payload;
    },
    saveClass: (state, { payload }) => {
      state.selectedClass = payload;
    },
    saveGov: (state, { payload }) => {
      state.selectedGov = payload;
    },
  },
});

export const { saveData, saveClass, saveGov } = registerDataSlice.actions;

export default registerDataSlice.reducer;
