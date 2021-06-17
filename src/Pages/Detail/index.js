import React, { Component } from 'react';
import './index.scss';

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: [],
      isOpen: false,
      count: 0,
    };
  }
  render() {
    return (
      <main>
        <div className="detailWrap">
          {/* slider */}
          <div className="detailHeader">
            <h2 className="detailTitle">초록방학 개구리 라이언 인형</h2>
            <p className="detailPrice">
              <span>32,000</span>원
            </p>
            <div className="starGrade">
              <span className="star"></span>
              <span className="star"></span>
              <span className="star"></span>
              <span className="star"></span>
              <span className="star"></span>
            </div>
            {/* <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul> */}
          </div>
          <div className="detailContent"></div>
          <div className="detailAccordion">
            <div className="detailInfo">
              <input type="checkbox" id="answer1" />
              <label htmlFor="amswer1">
                세부정보
                <em>
                  <span></span>
                </em>
              </label>
              <div>
                <p>What is it?</p>
              </div>
            </div>
            <div className="delevery">
              <input type="checkbox" id="answer2" />
              <label htmlFor="amswer2">
                배송 반품
                <em>
                  <span></span>
                </em>
              </label>
              <div>
                <p>What is it?</p>
              </div>
            </div>
          </div>
          <div className="inquire">실시간 문의</div>
          <div className="purchase">바로구매</div>
        </div>
      </main>
    );
  }
}

export default Detail;
