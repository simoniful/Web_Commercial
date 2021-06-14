import React, { Component } from 'react';
import Carousel from '../../Components/Carousel';
import Nav from '../../Components/Nav';
import './index.scss';

export default class Main extends Component {
  render() {
    return (
      <div className="Main">
        <Nav />
        <Carousel />
      </div>
    );
  }
}
