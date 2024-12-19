import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const headers = {
    'Content-Type': 'application/json',
};

const config = { headers };

const getComment = async (id) => {
    const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`, config);
    return response.data; 
};
const getComments =async (ids)=>{
    
    
    const comments=[]
    for(const id of ids){
        const comment=await getComment(id)
       
        comments.push(comment)
    }
    return comments;
}

export const fetchGetComments = createAsyncThunk('comments/fetchGetComments', async (ids) => {
    const data = await getComments(ids); 
    
    return data; 
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
                state.error = action.error.message ;
            });
    },
});

export default CommentsSlice.reducer;