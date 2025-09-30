import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        levelId: null,
        status: null,
        keyword: "",
        tagId: null
    },
    reducers: {
        setTag: (state, action) => {
            state.tagId = action.payload.tagId;
        },
        setSearchParams: (state, action) => {
            state.levelId = action.payload.levelId;
            state.status = action.payload.status;
            state.keyword = action.payload.keyword;
        }
    }
})

export const { setTag, setSearchParams} = searchSlice.actions;
export default searchSlice;