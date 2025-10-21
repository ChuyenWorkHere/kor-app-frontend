import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import courseSlice from "./courseSlice";
import userSlice from "./userSlice";
import lessonSlice from "./lessonSlice";
import questionSlice from "./questionSlice";
import uiSlice from "./uiSlice";
import searchSlice from "./searchSlice";
import vocabularySlice from "./vocabularySlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    courses: courseSlice.reducer,
    user: userSlice.reducer,
    lesson: lessonSlice.reducer,
    question: questionSlice.reducer,
    ui: uiSlice.reducer,
    search: searchSlice.reducer,
    vocabulary: vocabularySlice.reducer,
  },
});

export default store;