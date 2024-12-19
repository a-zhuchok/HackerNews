import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Comments from './Comments';
import {fetchGetComments} from '../redux/CommentsSlice';

const News= () => {
  
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.newsInfo);
 
 
  const formatDate = (time) => {
    const date = new Date(time * 1000); 
    return date.toLocaleDateString();
}

  return (
    <div className=''>
    {status === 'loading' && <p>Loading...</p>}
    {status === 'succeeded' && data && (
      <div>
        <h3>{data.title}</h3>
        <p>by {data.by} | score {data.score} | date {formatDate(data.time)}</p>
        <h3>Comments ({data.kids.length})</h3>
        <Comments comments={data.kids}/> 
       
      </div>
    )}
  </div>
  );
}

export default News;