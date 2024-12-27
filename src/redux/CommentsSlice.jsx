import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const headers = {
    'Content-Type': 'application/json',
};
const config = { headers };

const getComment = async (id) => {
    const response = await axios.get(import.meta.env.VITE_APP_HACKERNEWS_URL + `item/${id}.json?print=pretty`, config)
    return response.data 
};

const getCommentWithChildren = async (id) => {
    const comment = await getComment(id);
    if (comment && !comment.deleted) {
        if (comment.kids && comment.kids.length > 0) {
            comment.children = await Promise.all(comment.kids.map(async (kidId) => {
                const childComment = await getCommentWithChildren(kidId)
                return childComment 
            }));
            comment.children = comment.children.filter(child => child && !child.deleted)
        } else {
            comment.children = []
        }
        return comment
    }
    return null 
};

const getComments = async (ids) => {
    const comments = []
    for (const id of ids) {
        const comment = await getCommentWithChildren(id)
        if (comment) { 
            comments.push(comment)
        }
    }
    return comments
};

export const fetchGetComments = createAsyncThunk('comments/fetchGetComments', async (ids) => {
    const data = await getComments(ids)
    return data
});

const CommentsSlice = createSlice({
    name: 'comments',
    initialState: { status: 'idle', data: [], error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetComments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchGetComments.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchGetComments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default CommentsSlice.reducer;