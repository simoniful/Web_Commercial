import React, { Component } from 'react';
import './index.scss';
import OrderList from './OrderList';
import OrderPrice from './OrderPrice';

export default class Order extends Component {
  constructor() {
    super();
    this.state = {
      orderData: [],
      // name: '',
      // phone: '',
      // address: '',
      // detailedAddress: '',
      // request: '',
      // saveToMyInfo: false,
    };
  }

  componentDidMount() {
    fetch('/data/orderData.json')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          orderData: data.items_in_cart,
        });
      });
  }

  render() {
    const { orderData } = this.state;
    const selectedAll = orderData.reduce(
      (result, item) => (result = result && item.selected),
      true,
    );
    const selectedItems = orderData.filter((item) => item.selected);
    const totalPrice = Math.floor(
      selectedItems.reduce((acc, item) => acc + item.price * item.count, 0),
    );
    return (
      <div className="Order">
        <form className="formWrap">
          <section className="itemToOrder">
            <h3 className="title">01 주문상품</h3>
            <div className="contents">
              <ul className="orderDetailList">
                {orderData.map((item, idx) => {
                  return (
                    <OrderList key={item.order_item_id} id={idx} item={item} />
                  );
                })}
              </ul>
              <OrderPrice totalPrice={totalPrice} />
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
                  <i className="fas fa-shuttle-van"></i> 6/16(수) 도착 예정
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
          <section className="payment">
            <h3 className="title">03 결제하기</h3>
            <div className="paymentWrap">
              <OrderPrice totalPrice={totalPrice} />
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
