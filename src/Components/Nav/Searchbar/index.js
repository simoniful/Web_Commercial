import React, { Component } from 'react';
import CategoryView from './CategoryView';
import ResultView from './ResultView';
import { categoryData } from '../../../Data/categoryData';
import { characterData } from '../../../Data/characterData';
import { fetchGet } from '../../../utils/fetches';

export default class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: '',
      searchResult: [],
    };
  }

  setSearchKeyword = (e) => {
    this.setState({
      searchKeyword: e.target.value,
    });
  };

  handleReset = () => {
    this.setState({
      searchKeyword: '',
    });
  };

  handleChangeInput(event) {
    const searchKeyword = event.target.value;

    if (!searchKeyword.length) {
      this.handleReset();
    }

    fetchGet('', '').then((res) =>
      this.setState({
        searchResult: res.result,
      }),
    );
  }

  render() {
    const { SearchKeyword, searchKeyword, searchResult } = this.state;
    const { searchbarOff } = this.props;

    return (
      <>
        <div className="searchModal">
          <div className="searchForm">
            <form className="searchInputWrap" onSubmit={this.handleReset}>
              <input
                className="searchInput"
                id="keyword"
                name="keyword"
                value={SearchKeyword}
                onChange={this.setSearchKeyword}
                autoComplete="off"
              />
              <button
                type="reset"
                className="resetBtn"
                onClick={this.handleReset}
              ></button>
            </form>
            <button className="searchCloseBtn" onClick={searchbarOff}>
              취소
            </button>
          </div>

          <div className="searchBottomWrap">
            {searchKeyword.length > 0 ? (
              // 검색결과가 있을 경우
              <ResultView
                searchbarOff={searchbarOff}
                searchResult={searchResult}
              />
            ) : (
              // 검색결과가 없을 경우
              <CategoryView
                categories={categoryData}
                characters={characterData}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}
