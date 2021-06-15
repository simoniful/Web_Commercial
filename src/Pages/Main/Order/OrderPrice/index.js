import React, { Component } from 'react';

export default class OrderPrice extends Component {
  render() {
    const { orderData } = this.props;
    const selectedItems = orderData.filter((item) => item.selected);
    const totalPrice = Math.floor(
      selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    );
    return (
      <div className="totalCostBarWrap">
        <div className="totalCostBar">
          <span className="totalCostTitle">총 주문금액</span>
          <div>
            <span>{totalPrice.toLocaleString()}</span>원
          </div>
        </div>
        <div className="totalCostBar">
          <span className="totalCostTitle">배송비</span>
          <div>
            <span>3,000</span>원
          </div>
        </div>
        <div className="totalCostBar">
          <span className="totalCostTitle last">총 결제금액</span>
          <span>
            <span className="totalCost">
              {(totalPrice + 3000).toLocaleString()}
            </span>
          </span>
        </div>
      </div>
    );
  }
}
