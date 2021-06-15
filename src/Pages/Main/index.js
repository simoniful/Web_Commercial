import React, { Component } from 'react';
import Footer from '../../Components/Footer';
import Nav from '../../Components/Nav';
import './index.scss';
import MyPage from './MyPage';

export default class Main extends Component {
  render() {
    return (
      <div className="Main">
        <Nav />
        <MyPage />
        <Footer />
      </div>
    );
  }
}
