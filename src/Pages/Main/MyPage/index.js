import React, { Component } from 'react';
import Nav from '../../../Components/Nav';
import MainTab from '../Components/MainTab';
import Cart from './Cart';
import SubTab from './Components/SubTab';

export default class Mypage extends Component {
  render() {
    return (
      <>
        <Nav />
        <MainTab />
        <SubTab />
        <Cart />
      </>
    );
  }
}
