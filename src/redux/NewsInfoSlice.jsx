import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const headers = {
    'Content-Type': 'application/json',
};
const config = { headers };

const getNewsInfo = async (id) => {
    const response = await axios.get(import.meta.env.VITE_APP_HACKERNEWS_URL + `item/${id}.json`, config)
    return response.data
};

export const fetchGetNewsInfo = createAsyncThunk('newsInfo/fetchGetNewsInfo', async (id) => {
    const data = await getNewsInfo(id)
    return data
});

const NewsInfoSlice = createSlice({
    name: 'newsInfo',
    initialState: {},
    reducers: {
        clearNewsInfo: (state) => {
            state.data = []
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetNewsInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchGetNewsInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGetNewsInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});
export const { clearNewsInfo } = NewsInfoSlice.actions;
export default NewsInfoSlice.reducer;