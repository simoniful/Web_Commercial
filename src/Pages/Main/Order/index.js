import React, { Component } from 'react';
import './index.scss';
import OrderList from './OrderList';
import OrderPrice from './OrderPrice';
import { fetchPost } from '../../../utils/fetches';
import { API } from '../../../config';

export default class Order extends Component {
  constructor() {
    super();
    this.state = {
      // order_item_list
      orderData: [],
      name: '',
      phone_number: '',
      address: '',
      request: '',
    };
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, phone_number, nickname, gender } = this.state;
    if (!this.validateInputData(this.state.email, this.state.password)) return;
    fetchPost(API, {
      email,
      password,
      phone_number,
      nickname,
      gender,
      birth: `${this.state.year}.${this.state.month}.${this.state.day}`,
    })
      .then((res) => console.log('결과: ', res))
      .then((res) => res.ok && this.props.history.push('/login'));
  };

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
    const selectedItems = orderData.filter((item) => item.selected);
    const totalPrice = Math.floor(
      selectedItems.reduce((acc, item) => acc + item.price * item.count, 0),
    );
    return (
      <div className="Order">
        <form className="formWrap" onSubmit={this.handleSubmit}>
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
                  name="phone_number"
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
                    readOnly
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
                  <br />
                  택배사 파업으로 일부 지역의 배송이 일시적으로 중단됩니다.
                  <br />
                  (중단 지역은 “공지사항“에서 확인이 가능합니다.)
                </div>
              </div>
            </div>
          </section>
          <section className="payment">
            <h3 className="title">03 결제하기</h3>
            <div className="paymentWrap">
              <OrderPrice totalPrice={totalPrice} />
              <div className="payMethod">
                <h4 className="subtitle">결제수단 선택</h4>
                <div className="selectBox">
                  <label htmlFor="kakaopay" className="">
                    카카오페이
                    <input id="kakaopay" type="radio" value="kakaopay" />
                  </label>
                  <label htmlFor="creditcard" className="">
                    신용카드
                    <input id="creditcard" type="radio" value="creditcard" />
                  </label>
                </div>
                <div className="agreeBox">
                  <label className="agreeToNotice">
                    <input className="checkbox" type="checkbox" />
                    상품 주문 및 배송정보 수집에 동의합니다<span>[필수]</span>
                  </label>
                  <label className="agreeToNotice">
                    <input className="checkbox" type="checkbox" />
                    주문 상품의 명시내용과 사용조건을 확인하였으며, 취소환불
                    규정에 동의합니다<span>[필수]</span>
                  </label>
                </div>
                <div>
                  <button type="submit" className="submitBtn">
                    결제하기
                  </button>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
    );
  }
}
