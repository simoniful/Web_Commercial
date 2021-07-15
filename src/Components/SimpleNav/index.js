import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './index.scss';
import Searchbar from './Searchbar';

class SimpleNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchbarOn: false,
    };
  }

  toggleSearchOpen = () => {
    const { isSearchbarOn } = this.state;
    this.setState({
      isSearchbarOn: !isSearchbarOn,
    });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  goHome = () => {
    this.props.history.push('/index');
  };

  render() {
    const { isSearchbarOn } = this.state;

    return (
      <>
        {isSearchbarOn ? (
          <Searchbar searchbarOff={this.toggleSearchOpen} />
        ) : (
          <header className="Nav">
            <div className="innerHead">
              <div className="header">
                <div className="leftsideBtns">
                  <button
                    type="button"
                    className="backBtn"
                    onClick={this.goBack}
                  >
                    <span className="backBtnLogo"></span>
                  </button>
                  <button
                    type="button"
                    className="homeBtn"
                    onClick={this.goHome}
                  >
                    <span className="homeBtnLogo"></span>
                  </button>
                </div>
                <div className="rightsideBtns">
                  <button
                    type="button"
                    className="searchBtn"
                    onClick={this.toggleSearchOpen}
                  >
                    <span className="searchBtnLogo"></span>
                  </button>
                  <button type="button" className="cartBtn">
                    <Link to="/index?tab=mypage">
                      <span className="cartBtnLogo"></span>
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </header>
        )}
      </>
    );
  }
}
export default withRouter(SimpleNav);
