import React, { Component } from 'react';
import { fetchGet } from '../../utils/fetches';
import './index.scss';

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      isOpen: false,
      count: 0,
    };
  }

  componentDidMount() {
    fetchGet('/data/detailData.json')
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          product: result,
        });
      });
  }

  render() {
    const { product } = this.state;
    const starPoint = Math.floor(Number(product.starPoint));
    const starArr = Array(5).fill(false, 0, 5);
    return (
      <main>
        <div className="detailWrap">
          {/* slider */}
          <div className="detailHeader">
            <h2 className="detailTitle">{product.name}</h2>
            <p className="detailPrice">
              <span>{product.price}</span>원
            </p>
            <div className="starGrade">
              {starArr.map((star, i) => (
                <span key={i} className="star"></span>
              ))}
            </div>
          </div>
          <div className="detailContent">{product.content}</div>
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
