import React, { Component } from 'react';
import Carousel from '../../Components/Carousel';
import Footer from '../../Components/Footer';
import Nav from '../../Components/Nav';
import './index.scss';

export default class Main extends Component {
  render() {
    return (
      <div className="Main">
        <Nav />
        <Carousel />
        <Footer />
      </div>
    );
  }
}
