import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetNews } from '../redux/NewsSlice';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils';

const NewsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => { dispatch(fetchGetNews()) }, []);
  const { data, status } = useSelector((state) => state.news);

  const getNewsInfo = (id) => {
    navigate('/news', { state: { id } })
  };

  return (
    <div className='newsList'>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' &&
        <ul>
          {data.map((item) => (
            <li className='newsList_item'>
              <p className='newsList_title' onClick={() => getNewsInfo(item.id)}>{item.title}</p>
              <div className='newsList_info'>
                <p>by {item.by} | score {item.score} | date {formatDate(item.time)}</p>
              </div>
            </li>
          ))}
        </ul>
      }
    </div>
  )
}

export default NewsList;