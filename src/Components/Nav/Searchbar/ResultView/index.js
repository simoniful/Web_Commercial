import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ResultView extends Component {
  render() {
    const { searchResult, searchbarOff } = this.props;
    return (
      <>
        if (!searchResult.length) return{' '}
        <div className="noResult">검색결과가 없습니다.</div>
        return (
        <ul>
          {searchResult.map((data) => (
            <li key={data.id} onClick={searchbarOff}>
              <Link to={`/product/${data.id}`}>{data.name}</Link>
            </li>
          ))}
        </ul>
        )
      </>
    );
  }
}
