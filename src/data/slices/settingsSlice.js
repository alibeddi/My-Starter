import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !current(state).isSidebarOpen;
    },
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
  },
});

export const { toggleSidebar, openSidebar, closeSidebar } =
  settingsSlice.actions;

export default settingsSlice.reducer;
