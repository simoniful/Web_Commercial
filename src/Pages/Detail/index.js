import React, { Component } from 'react';
import InnerCarousel from './InnerCarousel';
import { fetchGet } from '../../utils/fetches';
import './index.scss';

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      isOpen: false,
      count: 0,
      isInfo: false,
      isDelevery: false,
      isPurchase: false,
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

  toggleTargetOpen = (target) => {
    this.setState({ [target]: !this.state[target] });
  };

  minusPlusCount = (e) => {
    const { count } = this.state;
    const { name } = e.target;

    if (name === 'minus') {
      if (count > 0) this.setState({ count: count - 1 });
    } else {
      this.setState({ count: count + 1 });
    }
  };

  render() {
    const { product, isInfo, isDelevery, isPurchase, count } = this.state;
    const starPoint = Math.floor(Number(product.starPoint));
    const starArr = Array(5)
      .fill(1)
      .map((el, i) => el + i);

    return (
      <main>
        <div className="detailWrap">
          <InnerCarousel />
          <div className="detailHeader">
            <h2 className="detailTitle">{product.name}</h2>
            <p className="detailPrice">
              <span>{product.price}</span>원
            </p>
            <div className="starGrade">
              {starArr.map((star) =>
                star < starPoint ? (
                  <span key={star} className="star starOn"></span>
                ) : (
                  <span key={star} className="star"></span>
                ),
              )}
            </div>
          </div>
          <div className="detailContent">{product.content}</div>
          <div className="detailBottom">
            <div
              className="detailInfo"
              onClick={() => this.toggleTargetOpen('isInfo')}
            >
              <span className="boldTxt">세부정보</span>
              <button type="button" className="infoBtn"></button>
            </div>
            {isInfo && (
              <ul className="infoUl">
                <li className="infoLi">
                  품명 및 모델명 : {product.name}&nbsp;1111111111111
                </li>
                <li className="infoLi">KC 인증필 유무 : CB111R1111-1111</li>
                <li className="infoLi">치수 : 약 11*11*11cm, 11g</li>
                <li className="infoLi">색상 : 오렌지&nbsp;외</li>
                <li className="infoLi">
                  재질 : [표면] 폴리에스터 96%, 폴리우레탄 4% / [솜] 폴리에스터
                  100%
                </li>
                <li className="infoLi">사용연령 : 만 3세 이상</li>
                <li className="infoLi">동일모델의 출시년월 : 0000.00</li>
                <li className="infoLi">제조자 : ㈜Pet Shop</li>
                <li className="infoLi">제조국 : 중국</li>
                <li className="infoLi">
                  취급 시 주의사항
                  <br />
                  1) 포장은 반드시 부모님(보호자)께서 개봉해 주시고 분리수거해
                  주십시오.
                  <br />
                  2) 제품 용도 이외에는 사용하지 마십시오.
                  <br />
                  3) 입에 넣고 물거나 빨지 않도록 주의하십시오.
                  <br />
                  4) 불에 직접 닿거나 가까이하지 마십시오.
                  <br />
                  5) 세탁기 사용을 금하고 손으로 세탁하여 주십시오.
                  <br />
                  6) 물에 젖을 경우 그늘에서 말려 주십시오.
                </li>
                <li className="infoLi">
                  품질보증 기준 : 본 제품은 공정거래위원회 고시 소비자
                  분쟁해결기준에 의거 교환 및 보상을 받으실 수 있습니다.
                </li>
                <li className="infoLi">
                  A/S 책임자와 전화번호 : 고객센터 1234-1234
                </li>
              </ul>
            )}
            <div
              className="delevery"
              onClick={() => this.toggleTargetOpen('isDelevery')}
            >
              <span className="boldTxt">배송반품</span>
              <button type="button" className="downUpArrow"></button>
            </div>
            {isDelevery && (
              <ul className="infoUl">
                <strong class="deleveryTxt">배송</strong>
                <li class="infoLi">
                  <span class="">배송사 : CJ대한통운</span>
                </li>
                <li class="infoLi">
                  <span class="">
                    배송비 : 국내 3,000원 (3만 원 이상 구매 시 무료배송)
                  </span>
                </li>
                <li class="infoLi">
                  <span class="">
                    오후 3시 이전 결제 완료 주문건은 당일 출고, 오후 3시 이후
                    주문 건은 익일 출고됩니다.
                    <br />
                    출고 이후 영업일 기준 평균 3일 이내 제품을 수령하실 수
                    있습니다.
                    <br />
                    단, 제품의 재고 상황, 배송량, 배송 지역에 따라 배송기일이
                    추가로 소요될 수 있는 점 양해 부탁드립니다
                  </span>
                </li>
              </ul>
            )}
          </div>
          <div className="inquire">
            <button className="inquireBtn">
              <span className="boldTxt">실시간 문의</span>
              <span className="counselBtn boldTxt">상담하기</span>
            </button>
          </div>

          <div className="purchase">
            {isPurchase && (
              <div className="addOrMinus">
                <button name="minus" onClick={this.minusPlusCount}>
                  -
                </button>
                <span>{count}</span>
                <button name="plus" onClick={this.minusPlusCount}>
                  +
                </button>
              </div>
            )}
            <div>
              <div onClick={() => this.toggleTargetOpen('isPurchase')}>
                바로구매
              </div>
              <button className="cartBtn"></button>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

//t1.kakaocdn.net/friends/new_store/2.0/common/product-detail-cart2-off.svg") center center / 27px 27px no-repeat

export default Detail;
