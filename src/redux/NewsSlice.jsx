import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const headers = {
  'Content-Type': 'application/json'
};
const config = { headers };

const getNews = async () => {
  const response = await axios.get(import.meta.env.VITE_APP_HACKERNEWS_URL + 'topstories.json', config)
  return await response.data.splice(0, 100)
};
const getNew = async id => {
  const response = await axios.get(import.meta.env.VITE_APP_HACKERNEWS_URL + `item/${id}.json`, config)
  return await response.data
};

const fetchGetNews = createAsyncThunk('news/fetchGetNews', async () => {
  const news = await getNews()
  const newsPromises = news.map(id => getNew(id))
  const newsData = await Promise.all(newsPromises)
  newsData.sort((a, b) => b.time - a.time)
  return newsData
});

const NewsSlice = createSlice({
  name: 'news',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetNews.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.data = action.payload
    })
      .addCase(fetchGetNews.pending, (state, action) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchGetNews.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})
export { fetchGetNews }
export default NewsSlice.reducer