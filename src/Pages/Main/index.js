import React, { Component } from 'react';
import Nav from '../../Components/Nav';
import './index.scss';
import Order from './Order';

export default class Main extends Component {
  render() {
    return (
      <div className="Main">
        <Nav />
        <Order />
      </div>
    );
  }
}
