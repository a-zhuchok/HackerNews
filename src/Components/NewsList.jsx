import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetNews } from '../redux/NewsSlice'
import {fetchGetNewsInfo} from '../redux/NewsInfoSlice'
import { useNavigate, Link } from 'react-router-dom';

const NewsList = () => {
  const dispatch = useDispatch();
    useEffect(()=>{dispatch(fetchGetNews())}, [])
    
    const { data, status } = useSelector((state) => state.news);
   
    const formatDate = (time) => {
        const date = new Date(time * 1000); 
        return date.toLocaleDateString();
    }
   
  return (
    <div className='newsList'>
        {status==='loading' && <p>Loding...</p>}
        {status==='succeeded' && 
        <ul>
        {data.map((item) => (
            <li  className='news'> 
                 <Link to='/news' onClick={() => dispatch(fetchGetNewsInfo(item.id))}>{item.title}</Link>              
                <div className='news_info'>
                    <p>by {item.by} | score {item.score} | date {formatDate(item.time)}</p> 
                </div>
            </li>
        ))}
    </ul>
} 
    </div>
  )
}

export default NewsList