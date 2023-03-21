import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { reducer as modalsReducer } from "./slices/modals";
import settingsReducer from "./slices/settingsSlice";

export const store = configureStore({
  reducer: {

    auth: authReducer,
    modals: modalsReducer,
    settings: settingsReducer,
  },
});
