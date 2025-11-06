import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../config/axiosConfig";

const publicDeckFromLocalStorage = localStorage.getItem("deck_public") ? JSON.parse(localStorage.getItem("deck_public")) : [];

const initialState = {
    myDeck: [],
    publicDeck: publicDeckFromLocalStorage,
    myFolder: [],
    loading: false,
    error: "",
}


export const fetchMyDecks = createAsyncThunk(
    'vocabulary/myDecks',
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/users/me/decks/all");
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const createDeck = createAsyncThunk(
    'vocabulary/createDeck',
    async (deck, thunkAPI) => {
        try {
            const response = await api.post("/users/me/decks", deck);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const updateDeck = createAsyncThunk(
    'vocabulary/updateDeck',
    async (deck, thunkAPI) => {
        try {
            const response = await api.put(`/users/me/decks/${deck.id}`, deck);
            
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const deleteDeck = createAsyncThunk(
    'vocabulary/deleteDeck',
    async (deckId, thunkAPI) => {
        try {
            const response = await api.delete(`/users/me/decks/${deckId}`);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const fetchMyFolders = createAsyncThunk(
    'vocabulary/myFolders',
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/users/me/folders");
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const fetchFolderById = createAsyncThunk(
    'vocabulary/folderById',
    async (folderId, thunkAPI) => {
        try {
            const response = await api.get(`/users/me/folders/${folderId}`);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const createFolder = createAsyncThunk(
    'vocabulary/createFolder',
    async (folder, thunkAPI) => {
        try {
            const response = await api.post("/users/me/folders", folder);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const updateFolder = createAsyncThunk(
    'vocabulary/updateFolder',
    async (folder, thunkAPI) => {
        try {
            const response = await api.put(`/users/me/folders/${folder.id}`, folder);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const deleteFolder = createAsyncThunk(
    'vocabulary/deleteFolder',
    async (folderId, thunkAPI) => {
        try {
            const response = await api.delete(`/users/me/folders/${folderId}`);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const fetchPublicDecks = createAsyncThunk(
    'vocabulary/publicDecks',
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/users/decks/public");
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)


const vocabularySlice = createSlice({
    name: "deck",
    initialState: initialState,
    extraReducers: builder => {
        builder
            .addCase(fetchMyDecks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMyDecks.fulfilled, (state, action) => {
                state.loading = false;
                state.myDeck = action.payload;
            })
            .addCase(fetchMyDecks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchPublicDecks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPublicDecks.fulfilled, (state, action) => {
                state.loading = false;
                state.publicDeck = action.payload;
                localStorage.setItem("deck_public", JSON.stringify(state.publicDeck));
            })
            .addCase(fetchPublicDecks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createDeck.pending, (state) => {
                state.loading = true;
            })
            .addCase(createDeck.fulfilled, (state, action) => {
                state.loading = false;
                state.myDeck.push(action.payload);
            })
            .addCase(createDeck.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Tạo bộ từ vựng thất bại";
            })
            .addCase(updateDeck.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateDeck.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.myDeck.findIndex(deck => deck.id === action.payload.id);
                if (index !== -1) {
                    state.myDeck[index] = action.payload;
                }
            })
            .addCase(updateDeck.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Cập nhật bộ từ vựng thất bại";
            })
            .addCase(fetchMyFolders.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMyFolders.fulfilled, (state, action) => {
                state.loading = false;
                state.myFolder = action.payload;
            })
            .addCase(fetchMyFolders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createFolder.pending, (state) => {
                state.loading = true;
            })
            .addCase(createFolder.fulfilled, (state, action) => {
                state.loading = false;
                state.myFolder.push(action.payload);
            })
            .addCase(createFolder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Tạo thư mục thất bại";
            })
            .addCase(updateFolder.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateFolder.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.myFolder.findIndex(folder => folder.id === action.payload.id);
                if (index !== -1) {
                    state.myFolder[index] = action.payload;
                }
            })
            .addCase(updateFolder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Cập nhật thư mục thất bại";
            })
    }
})

export default vocabularySlice;

