import React, { Component } from 'react';
import './index.scss';
import OrderList from './OrderList';
import OrderPrice from './OrderPrice';

export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: [],
      name: '',
      phone: '',
      address: '',
      detailedAddress: '',
      request: '',
      saveToMyInfo: false,
    };
  }

  //   componentDidMount() {
  //     this.setState({
  //         orderData : this.props.location.state.cartData
  //     })
  //   }

  render() {
    const { orderData } = this.state;
    return (
      <div className="Order">
        <form className="formWrap">
          <section className="itemToOrder">
            <h3 className="title">01 주문상품</h3>
            <div className="contents">
              <ul className="orderDetailList">
                {orderData.map((item) => {
                  return (
                    <OrderList
                      key={item.id}
                      id={item.id}
                      item={item}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                    />
                  );
                })}
              </ul>
              <ul>
                <OrderPrice item={this.state.orderData} />
              </ul>
            </div>
          </section>
          <section className="shippingInfo">
            <h3 className="title">02 배송지정보</h3>
            <div className="infoWrap">
              <div className="subtitleContainer">
                <h4 className="subtitle">받는분</h4>
              </div>
              <div className="nameContainer">
                <input
                  className="name"
                  name="name"
                  type="text"
                  placeholder="이름"
                />
              </div>
              <div className="phoneContainer">
                <input
                  className="phone"
                  name="phonenumber"
                  type="text"
                  placeholder="전화번호 (-없이 입력)"
                />
              </div>
              <div className="addressContainer">
                <input
                  className="address"
                  name="address"
                  type="text"
                  placeholder="주소"
                />
              </div>
              <div className="requestContainer">
                <textarea
                  className="request"
                  name="request"
                  placeholder="배송 요청메시지가 있으시면 남겨주세요."
                ></textarea>
              </div>
              <div className="saveToMyInfoContainer">
                <label className="saveToMyInfoLabel">
                  <input
                    className="saveToMyInfoCheck"
                    type="checkbox"
                    name="saveToMyInfo"
                  />
                  내 정보 및 기본 배송지로 저장
                </label>
              </div>
              <div className="noticeContainer">
                <div
                  className="
                intendedDday"
                >
                  <i class="fas fa-shuttle-van"></i>6/16(수) 도착 예정
                </div>
                <div className="para">
                  오후 3시 이전 주문시 당일 출고
                  <br />
                  출고 후 평균 1~2일 이내 수령
                  <br />
                  영업일 기준이며, 경우에 따라 추가소요될 수 있습니다.
                </div>
              </div>
            </div>
          </section>
          <section>
            <h3>03 결제하기</h3>
            <div className="paymentWrap">
              <OrderPrice />
              <div className="payMethod">
                <h4>결제수단 선택</h4>
                <div className="selectBox">
                  <input type="radio" />
                  <input type="radio" />
                </div>
                <div>
                  <input type="checkbox"></input>
                  <input type="checkbox"></input>
                </div>
                <div>
                  <button type="submit">결제하기</button>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
    );
  }
}
