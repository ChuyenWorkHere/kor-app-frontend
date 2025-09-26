// uiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { isSidebarOpen: false, isHeaderOpen: false },
  reducers: {
    toggleSidebar: state => { state.isSidebarOpen = !state.isSidebarOpen; },
    toggleHeader: state => { state.isHeaderOpen = !state.isHeaderOpen; },
  }
});

export const { toggleSidebar, toggleHeader } = uiSlice.actions;
export default uiSlice;
