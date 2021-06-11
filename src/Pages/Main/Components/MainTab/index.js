import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MainTab extends Component {
  render() {
    return (
      <div className="mainTabWrap">
        <ul className="mainTabUI">
          <li className="tabList">
            <Link>
              <div className="tabItem">
                <span className="tabName">신규</span>
              </div>
            </Link>
            <hr className="focusUnderline"></hr>
          </li>
          <li className="tabList">
            <Link>
              <div className="tabItem">
                <span className="tabName">
                  인기<span className="badge"></span>
                </span>
              </div>
            </Link>
            <hr className="focusUnderline"></hr>
          </li>
          <li className="tabList">
            <Link>
              <div className="tabItem">
                <span className="tabName active">마이</span>
              </div>
            </Link>
            <hr className="focusUnderline active"></hr>
          </li>
        </ul>
      </div>
    );
  }
}
