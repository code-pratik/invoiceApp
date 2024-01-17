import { createSlice } from "@reduxjs/toolkit";

const darkSlice = createSlice({
  name: "dark",
  initialState: {
    theme: "dark",
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
});

export const { setTheme } = darkSlice.actions;

export default darkSlice.reducer;
