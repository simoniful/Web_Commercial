import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

export default class ResultView extends Component {
  render() {
    const { searchResult, searchbarOff } = this.props;
    return (
      <>
        {!searchResult.length && (
          <div className="noResult">검색결과가 없습니다.</div>
        )}

        <ul className="searchOutWrap">
          {searchResult.map((data) => (
            <li key={data.id} onClick={searchbarOff} className="searchOut">
              <Link to={`/products/${data.id}`} className="searchOutLink">
                {data.name}
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}
