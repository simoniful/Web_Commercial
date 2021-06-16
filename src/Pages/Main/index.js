import React, { Component } from 'react';
import Footer from '../../Components/Footer';
import Nav from '../../Components/Nav';
import MainTab from './Components/MainTab';
import HotProducts from './HotProducts';
import './index.scss';
import Mypage from './MyPage';
import NewProducts from './NewProducts';

export default class Main extends Component {
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
      <div className="Main">
        <Nav />
        <div className="mainArticle">
          <MainTab checkMenuId={this.bringMenuId} />
          {MAPPING_OBJ[this.state.currentId]}
        </div>
        <Footer />
      </div>
    );
  }
}

const MAPPING_OBJ = {
  1: <NewProducts />,
  2: <HotProducts />,
  3: <Mypage />,
};
