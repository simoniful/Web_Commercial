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
      serachKeyword: '',
      searchResult: [],
    };
  }

  setSerachKeyword = (e) => {
    this.setState({
      serachKeyword: e.target.value,
    });
  };

  handleReset = () => {
    this.setState({
      serachKeyword: '',
    });
  };

  handleChangeInput(event) {
    const searchKeyword = event.target.value;
    searchKeyword.length === 0 && this.handleReset();
    fetchGet('', '').then((res) =>
      this.setState({
        searchResult: res.result,
      }),
    );
  }

  render() {
    return (
      <>
        <div className="searchModal">
          <div className="searchForm">
            <form
              className="searchInputWrap"
              onSubmit={() => this.handleReset()}
            >
              <input
                className="searchInput"
                id="keyword"
                name="keyword"
                value={this.state.serachKeyword}
                onChange={this.setSerachKeyword}
                autoComplete="off"
              />
              <button
                type="reset"
                className="resetBtn"
                onClick={this.handleReset}
              ></button>
            </form>
            <button
              className="searchCloseBtn"
              onClick={this.props.searchbarOff}
            >
              취소
            </button>
          </div>

          <div className="searchBottomWrap">
            {this.state.serachKeyword.length > 0 ? (
              // 검색결과가 있을 경우
              <ResultView
                searchbarOff={this.props.searchbarOff}
                searchResult={this.state.searchResult}
              />
            ) : (
              // 검색결과가 없을 경우
              <CategoryView
                categorys={categoryData}
                characters={characterData}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}
