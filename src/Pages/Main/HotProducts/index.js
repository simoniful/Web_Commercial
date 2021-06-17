import React, { Component } from 'react';
import Nav from '../../../Components/Nav';
import MainTab from '../Components/MainTab';
import GridCard from './GridCard';

export default class HotProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: '',
    };
  }

  bringMenuId = (id) => {
    this.setState({ currentId: id });
  };

  render() {
    return (
      <div>
        <Nav />
        <MainTab checkMenuId={this.bringMenuId} />
        <GridCard />
      </div>
    );
  }
}
