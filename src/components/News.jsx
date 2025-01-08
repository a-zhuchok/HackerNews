import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Comments from './Comments';
import { fetchGetNewsInfo } from '../redux/NewsInfoSlice';
import { useLocation } from 'react-router-dom';
import { formatDate } from '../utils';

const News = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = location.state;

  useEffect(() => {
    dispatch(fetchGetNewsInfo(id))
  }, [dispatch, id]);

  const { data, status } = useSelector((state) => state.newsInfo);

  return (
    <div className='news'>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && data && (
        <div>
          <h3>{data.title}</h3>
          <a className='news_link' href={data.url}>Go to News</a>
          <p>by {data.by} | score {data.score} | date {formatDate(data.time)}</p>
          {data.kids ? <Comments comments={data.kids} />:<h3>Comments (0)</h3>}
        </div>
      )}
    </div>
  );
}

export default News;