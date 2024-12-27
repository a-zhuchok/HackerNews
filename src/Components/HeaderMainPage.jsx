import React from 'react';
import logo from '../img/logo.png';
import { fetchGetNews } from '../redux/NewsSlice';
import { useDispatch } from 'react-redux';

const HeaderMainPage = () => {
  const dispatch = useDispatch();
  return (
    <div class='header'>
      <div class='logo'>
        <img src={logo} width={30} height={30} alt='logo' />
        <p class='logo_title'>Hacker News</p>
      </div>
      <button onClick={() => dispatch(fetchGetNews())}>Update News</button>
    </div>
  )
}

export default HeaderMainPage;