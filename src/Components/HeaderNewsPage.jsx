import React from 'react';
import logo from '../img/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchGetComments } from '../redux/CommentsSlice';
import { clearNewsInfo } from '../redux/NewsInfoSlice';

const HeaderNewsPage = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.newsInfo);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/')
    dispatch(clearNewsInfo())
  };
  return (
    <div class='header'>
      <div class='logo'>
        <img src={logo} width={30} height={30} alt='logo' />
        <p class='logo_title'>Hacker News</p>
      </div>
      <button onClick={() => dispatch(fetchGetComments(data.kids))}>Update Comments</button>
      <button onClick={handleClick}>Return to News</button>
    </div>
  )
}

export default HeaderNewsPage;