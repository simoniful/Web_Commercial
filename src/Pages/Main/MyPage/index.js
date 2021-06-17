import React, { Component } from 'react';
import Nav from '../../../Components/Nav';
import MainTab from '../Components/MainTab';
import Cart from './Cart';
import SubTab from './Components/SubTab';
import Order from './Cart/Order';
export default class Mypage extends Component {
  render() {
    const { match } = this.props;
    console.log(match.params.keyword);

    return (
      <>
        <Nav />
        <MainTab />
        <SubTab />
        {match.params.keyword === 'cart' && <Cart />}
        {match.params.keyword === 'order' && <Order />}
      </>
    );
  }
}
