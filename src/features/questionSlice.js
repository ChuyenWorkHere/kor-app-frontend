import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../config/axiosConfig"


const questionFromLocalStorage = localStorage.getItem('questions') ? JSON.parse(localStorage.getItem('questions')) : [];

const initialState = {
  questions: questionFromLocalStorage,
  loading: false,
  error: null
}

export const fetchAllQuestionsInContent = createAsyncThunk(
  'questions/fetchAllInContent',
  async (contentId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/contents/${contentId}/questions`);
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

const questionSlice = createSlice({
  name: 'questions',
  initialState: initialState,
  reducers: {
    updateQuestion: (state, action) => {
      const { questionId, progress } = action.payload;
      const question = state.questions.find(q => q.questionId === questionId);
      if (question) {
        question.progress = { ...question.progress, ...progress };
        localStorage.setItem('questions', JSON.stringify(state.questions));
      }
    },
    addQuestion: (state, action) => {
      state.questions.push(action.payload);
    },
    removeQuestion: (state, action) => {
      state.questions = state.questions.filter(q => q.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllQuestionsInContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllQuestionsInContent.fulfilled, (state, action) => {
        state.loading = false;

        // Tạo map progress cũ theo questionId
        const progressMap = {};
        state.questions.forEach(q => {
          if (q.progress) progressMap[q.id] = q.progress;
        });
        // Merge progress cũ vào question mới
        state.questions = action.payload.map(q => ({
          ...q,
          progress: progressMap[q.questionId] || { status: "NOT_STARTED", percentage: 0, timeSpent: 0 }
        }));
        localStorage.setItem('questions', JSON.stringify(state.questions));
      })
      .addCase(fetchAllQuestionsInContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { updateQuestion, addQuestion, removeQuestion } = questionSlice.actions;

export default questionSlice;
