import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../config/axiosConfig"
import { calculateLessonProgress } from "../utils/progressUtil";

const lessonFromLocalStorage = localStorage.getItem('lessons') ? JSON.parse(localStorage.getItem('lessons')) : [];

const initialState = {
  lessons: lessonFromLocalStorage,
  loading: false,
  error: null
}

export const fetchAllLessonsInCourse = createAsyncThunk(
  'lessons/fetchAllInCourse',
  async (courseSlug, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${courseSlug}/lessons`);
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return rejectWithValue({ code: 404, message: "Course not found" });
      } else if (error.response && error.response.status === 401) {
        return rejectWithValue({ code: 401, message: "Unauthorized access" });
      }
      return rejectWithValue(error.response.data);
    }
  }
);


const lessonSlice = createSlice({
  name: 'lessons',
  initialState: initialState,
  reducers: {
    updateProgress: (state, action) => {
      const { lessonId, contentId, contentProgress } = action.payload;

      //Cập nhật content progress
      const lessonIndex = state.lessons.findIndex(lesson => lesson.lessonId === lessonId);
      
      if (lessonIndex != -1) {
        
        const contentIndex = state.lessons[lessonIndex].contents?.findIndex(content => content.contentId === contentId);
        if (contentIndex !== -1) {
          const currentContent = state.lessons[lessonIndex].contents[contentIndex]
          state.lessons[lessonIndex].contents[contentIndex].myProgress = { ...currentContent.myProgress, ...contentProgress };          
        }
        
        //Cập nhật lesson progress
        const contents = state.lessons[lessonIndex].contents;
        const { percentage, status } = calculateLessonProgress(contents);
        state.lessons[lessonIndex].myProgress = {...state.lessons[lessonIndex].myProgress, percentage, status}

        localStorage.setItem("lessons", JSON.stringify(state.lessons));
      }
    },
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLessonsInCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllLessonsInCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.lessons = action.payload;
        localStorage.setItem('lessons', JSON.stringify(action.payload));
      })
      .addCase(fetchAllLessonsInCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { updateProgress } = lessonSlice.actions;

export default lessonSlice;