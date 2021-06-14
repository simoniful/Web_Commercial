import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import ProductList from '../../Components/ProductList';
import './index.scss';

class Character extends Component {
  clg = (e) => {
    e.stopPropagation();
  };
  render() {
    const { history, location, match } = this.props;
    // const isCheck = true;
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
              <option>전체</option>
              <option>테마 기획전</option>
              <option>토이</option>
              <option>리빙</option>
              <option>잡화</option>
              <option>문구</option>
              <option>의류</option>
              <option>파자마</option>
              <option>여행/레져</option>
              <option>생활테크</option>
              <option>폰 액세서리</option>
              <option>식품</option>
            </select>
          </div>
          <div className="filterWrap">
            <div className="filter">
              <div>
                <span>필터링명</span>
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
        {/* <div className="filterModalWrap">
          <div className="filterModal">
            <ul className="filterUl">
              <li className="filterLi">
                <Link to="/products/character" hover="true">
                  신상품순
                  {isCheck && <img src="/images/colorCheck.png" alt="check" />}
                </Link>
              </li>
              <li className="filterLi">
                <Link to="/products/character">
                  판매량순
                  {false && <img src="/images/colorCheck.png" alt="check" />}
                </Link>
              </li>
              <li className="filterLi">
                <Link to="/products/character">
                  낮은가격순
                  {false && <img src="/images/colorCheck.png" alt="check" />}
                </Link>
              </li>
              <li className="filterLi">
                <Link to="/products/character">
                  높은가격순
                  {false && <img src="/images/colorCheck.png" alt="check" />}
                </Link>
              </li>
            </ul>
          </div>
        </div> */}
      </>
    );
  }
}

export default withRouter(Character);
