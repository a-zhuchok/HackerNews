import React from 'react';
import logo from '../img/logo.png';

const Header = () => {

  return (
    <div class='header'>
      <div class='logo'>
        <img src={logo} width={30} height={30} alt='logo' />
        <p class='logo_title'>Hacker News</p>
      </div>
      <button>Update News</button>
    </div>
  )
}

export default Header