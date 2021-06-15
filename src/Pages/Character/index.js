import React, { Component } from 'react';
import { withRouter } from 'react-router';
import ProductList from '../../Components/ProductList';
import { categoryData } from '../../Data/categoryData';
import { characterData } from '../../Data/characterData';

import FilterModal from './FilterModal';
import './index.scss';

class Character extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      categoryFilter: [],
      characterFilter: [],
      modalFilters: [
        { name: '신상품순', isCheck: true },
        { name: '판매량순', isCheck: false },
        { name: '낮은가격순', isCheck: false },
        { name: '높은가격순', isCheck: false },
      ],
      filteringName: '신상품순',
      category: [],
      character: [],
    };
  }

  componentDidMount() {
    this.setState({
      categoryFilter: categoryData,
      characterFilter: characterData,
    });
  }

  onToggleFilterModal = (e) => {
    const { isOpen } = this.state;
    const classList = [...e.target.classList];

    // if (!isOpen) {
    //   this.setState({ isOpen: !isOpen });
    // } else {
    //   if (classList.includes('sideMenuWrap')) {
    //     this.setState({ isOpen: !isOpen });
    //   }
    // }

    // eslint-disable-next-line no-unused-expressions
    !isOpen
      ? this.setState({ isOpen: !isOpen })
      : classList.includes('filterModalWrap')
      ? this.setState({ isOpen: !isOpen })
      : null;

    this.setState({
      isOpen: !isOpen,
    });
  };

  onToggleFilterCheck = (targetId) => {
    const { modalFilters } = this.state;

    // 기존 true 바꾸고
    const prevChange = modalFilters.map((el) =>
      el.isCheck ? { ...el, isCheck: !el.isCheck } : el,
    );

    // 새로운 true 반영
    const nextFilters = prevChange.map((el, idx) =>
      targetId === idx ? { ...el, isCheck: !el.isCheck } : el,
    );

    const nextfilterName = modalFilters.filter((el) => {
      if (el.isCheck) {
        const result = el.name;
        return result;
      } else return el;
    });

    this.setState({
      modalFilters: nextFilters,
      filteringName: nextfilterName[0].name,
    });
  };

  render() {
    const { isOpen, modalFilters, filteringName } = this.state;
    const { history, location, match } = this.props;
    // console.log(this.onToggleFilterCheck());
    return (
      <>
        {/* nav */}
        <section className="characterWrap">
          <div className="bannerWrap">
            <span className="bannerTitle">전체</span>
            <img
              className="DropBtn"
              src="https://t1.kakaocdn.net/friends/new_store/2.0/mobile/ico_category_header_fold.png"
              alt="dropbox"
            />
            <select>
              {characterData.map((chac) => (
                <option key={chac.id}>{chac.name}</option>
              ))}
            </select>
          </div>
          <div className="filterWrap">
            <div className="filter">
              <div className="filterName" onClick={this.onToggleFilterModal}>
                <span>{filteringName}</span>
                <img src="/images/dropdown.png" alt="dropdown" />
              </div>
            </div>
            <div className="filteredInfo">
              <div className="filterTxt">
                <span>총</span>
                <span>328</span>
                <span>개</span>
              </div>
              <div className="filterCheckBox">
                <img src="/images/checkIcon.png" alt="체크" />
                <span className="filterGlobaltxt">
                  글로벌 배송 가능상품 보기
                </span>
              </div>
            </div>
          </div>
          <div className="listWrap">
            <ProductList history={history} location={location} match={match} />
          </div>
        </section>
        {/* footer */}
        {isOpen && (
          <FilterModal
            filters={modalFilters}
            onToggleFilterModal={this.onToggleFilterModal}
            onToggleFilterCheck={this.onToggleFilterCheck}
          />
        )}
      </>
    );
  }
}

export default withRouter(Character);
