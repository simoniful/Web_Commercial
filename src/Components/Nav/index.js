import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import Searchbar from './Searchbar';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchbarOn: false,
    };
  }

  searchbarOn = () => {
    this.setState({
      isSearchbarOn: true,
    });
  };

  searchbarOff = () => {
    this.setState({
      isSearchbarOn: false,
    });
  };

  render() {
    return (
      <>
        {this.state.isSearchbarOn ? (
          <Searchbar searchbarOff={this.searchbarOff} />
        ) : (
          <header className="Nav">
            <div className="innerHead">
              <div className="header">
                <button type="button" className="hamburgerBtn">
                  <span className="hamburgerBtnLogo"></span>
                  <span className="hamburgerBtnBadge"></span>
                </button>
                <h1 className="titleWrap">
                  <Link to="/" className="titleLink"></Link>
                </h1>
                <button
                  type="button"
                  className="searchBtn"
                  onClick={this.searchbarOn}
                >
                  <span className="searchBtnLogo"></span>
                </button>
                <button type="button" className="cartBtn">
                  <span className="cartBtnLogo"></span>
                </button>
              </div>
            </div>
          </header>
        )}
      </>
    );
  }
}
