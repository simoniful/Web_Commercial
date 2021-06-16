import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchPatch,
  fetchDelete,
  fetchGet,
} from '../../../../utils/fetches.js';
import { CART_API } from '../../../../config.js';
import CartList from './CartList';
import './index.scss';

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cartData: [],
    };
  }

  selectAll = () => {
    const { cartData } = this.state;
    cartData.reduce((result, item) => (result = result && item.selected), true)
      ? cartData.map((item) => {
          item.selected = false;
          return item;
        })
      : cartData.map((item) => {
          item.selected = true;
          return item;
        });
    this.setState({ cartData: cartData });
    this.updateCartSelection();
  };

  selectItem = async (e) => {
    console.log(e.target);
    const select = {
      order_item_id: e.target.id,
      select:
        e.target.className === 'fa-check-circle fas fill' ? 'false' : 'true',
    };
    await fetchPatch(`${CART_API}:8000/orders/order-items`, select).then(
      (res) => res.json(),
    );
    this.getCartData();
  };

  deleteItem = (e) => {
    console.log(e.target);
    fetchDelete(`${CART_API}:8000/orders/order-items/${e.target.id}`)
      .then((res) => res.status)
      .then((status) => {
        status === 204 ? this.getCartData() : alert('삭제를 실패하였습니다.');
      });
  };

  deleteSelected = async () => {
    const { cartData } = this.state;
    const itemsToDelete = cartData.filter((item) => item.selected);
    const idsToDelete = itemsToDelete.map((item) => item.order_item_id);
    for (let itemId in idsToDelete) {
      const response = await fetchDelete(
        `${CART_API}:8000/orders/order-items/${itemId}`,
      )
        .then((res) => res.status)
        .then((status) => {
          status === 204 ? this.getCartData() : alert('삭제를 실패하였습니다.');
        });
      const status =
        (await response.status) === 204
          ? console.log('삭제 성공')
          : console.log('삭제를 실패하였습니다.');
      await console.log(status);
    }
    const response = await this.getCartData();
    console.log(response);
  };

  addItem = (e) => {
    console.log(e);
    const itemToAdd = {
      order_item_id: e.target.id,
      count: +e.target.dataset.count + 1,
    };
    fetchPatch(`${CART_API}:8000/orders/order-items`, itemToAdd)
      .then((res) => res.json())
      .then((result) => {
        result.message === 'SUCCESS'
          ? this.getCartData()
          : console.log('실패!');
      });
  };

  subtractItem = (e) => {
    console.log(e);
    const itemToSub = {
      order_item_id: e.target.id,
      count: +e.target.dataset.count - 1,
    };
    fetchPatch(`${CART_API}:8000/orders/order-items`, itemToSub)
      .then((res) => res.json())
      .then((result) => {
        result.message === 'SUCCESS'
          ? this.getCartData()
          : console.log('실패!');
      });
  };

  updateCartSelection = () => {
    this.state.cartData.forEach((item) => {
      const itemToSelect = {
        order_item_id: item.order_item_id,
        select: 'False',
      };
      !item.selected &&
        fetchPatch(`${CART_API}:8000/orders/order-items`, itemToSelect)
          .then((res) => res.json())
          .then((result) => console.log(result));
    });

    this.state.cartData.forEach((item) => {
      const itemToUnselect = {
        order_item_id: item.order_item_id,
        select: 'true',
      };
      item.selected &&
        fetchPatch(`${CART_API}:8000/orders/order-items`, itemToUnselect)
          .then((res) => res.json())
          .then((result) => console.log(result));
    });
  };

  getCartData = async () => {
    try {
      fetchGet(`${CART_API}:8000/orders/order-items`)
        .then((res) => res.json())
        .then((res) => this.setState({ cartData: res.items_in_cart }));
    } catch {
      const response = await fetch(`data/cartdata.json`);
      const data = await response.json();
      let cartData = data.items_in_cart;
      cartData = cartData.map((data) => {
        data.selected = true;
        return data;
      });

      this.setState({ cartData: cartData });
    }
  };

  componentDidMount() {
    this.getCartData();
  }

  clickOrder = () => {
    this.props.history.push('/order');
  };

  render() {
    const { cartData } = this.state;
    const selectedAll = cartData.reduce(
      (result, item) => (result = result && item.selected),
      true,
    );
    const selectedItems = cartData.filter((item) => item.selected);
    const totalPrice = Math.floor(
      selectedItems.reduce((acc, item) => acc + item.price * item.count, 0),
    );

    return this.state.cartData.length === 0 ? (
      <div className="myPage">
        <div className="contents">
          <div className="emptyBasket">
            <div className="emptyImg"></div>
            <div className="emptyMsg">
              아직 관심 상품이 없네요!
              <br />
              귀여운 프렌즈 상품을 추천드릴게요
            </div>
            <Link to="/hotproducts" className="linkToHot">
              <span className="linkTitle">인기상품 보기</span>
            </Link>
          </div>
        </div>
      </div>
    ) : (
      <>
        <div className="myPage">
          <div className="headerWrap">
            <div className="headerContainer">
              <div className="checkAllBox">
                <div className="checkboxLabel">
                  <i
                    className={`fa-check-circle ${
                      selectedAll ? 'fas fill' : 'far'
                    }`}
                    onClick={this.selectAll}
                  />
                </div>
                <button className="checkTitle" onClick={this.selectAll}>
                  전체선택
                </button>
                <span className="checkCount">{cartData.length}</span>
              </div>
              <div className="deleteBox">
                <button
                  type="button"
                  className="deleteButton"
                  onClick={this.deleteSelected}
                ></button>
              </div>
            </div>
          </div>
          <div className="contentsWrap">
            <div className="basketDetailWrap">
              <ul className="basketDetailLists">
                {cartData &&
                  cartData.map((item, idx) => {
                    return (
                      <CartList
                        key={item.order_item_id}
                        idx={idx}
                        item={item}
                        count={item.count}
                        selectItem={this.selectItem}
                        subtractItem={this.subtractItem}
                        addItem={this.addItem}
                        deleteItem={this.deleteItem}
                      />
                    );
                  })}
              </ul>
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
            </div>
          </div>
        </div>
        <div className="bottomBarWrap">
          <Link to="/order">
            <button>
              <span>{totalPrice.toLocaleString()}</span>원 주문 하기
            </button>
          </Link>
        </div>
      </>
    );
  }
}
