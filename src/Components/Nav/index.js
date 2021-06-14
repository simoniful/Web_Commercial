import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AsideMenu from '../AsideMenu';
import './index.scss';
import Searchbar from './Searchbar';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchbarOn: false,
      isOpenAside: false,
    };
  }

  onToggleSearch = () => {
    const { isSearchbarOn } = this.state;
    this.setState({
      isSearchbarOn: !isSearchbarOn,
    });
  };

  // searchbarOn = () => {
  //   this.setState({
  //     isSearchbarOn: true,
  //   });
  // };

  // searchbarOff = () => {
  //   this.setState({
  //     isSearchbarOn: false,
  //   });
  // };

  onToggleSideMenu = (e) => {
    const { isOpenAside } = this.state;
    const classList = [...e.target.classList];

    // if (!isOpenAside) {
    //   this.setState({ isOpenAside: !isOpenAside });
    // } else {
    //   if (classList.includes('sideMenuWrap')) {
    //     this.setState({ isOpenAside: !isOpenAside });
    //   }
    // }

    // eslint-disable-next-line no-unused-expressions
    !isOpenAside
      ? this.setState({ isOpenAside: !isOpenAside })
      : classList.includes('sideMenuWrap')
      ? this.setState({ isOpenAside: !isOpenAside })
      : null;
  };

  render() {
    const { isOpenAside, isSearchbarOn } = this.state;
    console.log(isOpenAside);
    return (
      <>
        {isOpenAside && <AsideMenu onToggleSideMenu={this.onToggleSideMenu} />}
        {isSearchbarOn ? (
          <Searchbar searchbarOff={this.onToggleSearch} />
        ) : (
          <header className="Nav">
            <div className="innerHead">
              <div className="header">
                <button
                  type="button"
                  className="hamburgerBtn"
                  onClick={this.onToggleSideMenu}
                >
                  <span className="hamburgerBtnLogo"></span>
                  <span className="hamburgerBtnBadge"></span>
                </button>
                <h1 className="titleWrap">
                  <Link to="/" className="titleLink"></Link>
                </h1>
                <button
                  type="button"
                  className="searchBtn"
                  onClick={this.onToggleSearch}
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
