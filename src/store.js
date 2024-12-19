import { configureStore } from '@reduxjs/toolkit';
import NewsSlice from './redux/NewsSlice';
import NewsInfoSlice from './redux/NewsInfoSlice';
import CommentsSlice from './redux/CommentsSlice';

const store = configureStore({
  reducer: {
    news: NewsSlice,
    newsInfo: NewsInfoSlice,
    comments: CommentsSlice,
  }})

export default store;