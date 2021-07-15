import React, { Component, useEffect, useState } from 'react';
import { characterData } from '../../Data/characterData';
import { categoryData } from '../../Data/categoryData';
import Menu from './Menu';
import './index.scss';
import { withRouter } from 'react-router-dom';

function AsideMenu({ isOpen, toggleSideMenu, history }) {
  const [characters, setCharacters] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isSlide, setIsSlide] = useState(false);
  const [user, setUser] = useState('');

  useEffect(() => {
    const loginUser = localStorage.getItem('user_name');
    setCharacters(characterData);
    setCategories(categoryData);
    setIsSlide(true);
    !!loginUser && setUser(loginUser);
  }, []);

  return (
    <div
      className={isSlide ? 'sideMenuWrap openBg' : 'sideMenuWrap'}
      onClick={toggleSideMenu}
    >
      <Menu
        isOpen={isOpen}
        isSlide={isSlide}
        user={user}
        characters={characters}
        categories={categories}
        toggleSideMenu={toggleSideMenu}
        history={history}
      />
    </div>
  );
}

export default withRouter(AsideMenu);
