import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchPatch,
  fetchDelete,
  fetchGet,
} from '../../../../utils/fetches.js';
import { CART_API } from '../../../../config';
import CartList from './CartList';
import './index.scss';

export default function Cart() {
  const [cartData, setCartData] = useState([]);
  const selectedItems = cartData.filter((item) => item.selected);
  const totalPrice = Math.floor(
    selectedItems.reduce((acc, item) => acc + item.price * item.count, 0),
  );

  useEffect(() => {
    getCartData();
  }, []);

  const getCartData = () => {
    fetchGet(`${CART_API}/orders/order-items`)
      .then((res) => res.json())
      .then((res) => {
        setCartData(res.items_in_cart);
      });
  };

  const handleQuantity = (event) => {
    const { value, className } = event.target;
    if (className === 'quantity-minus' && cartData[parseInt(value)].count === 1)
      return;
    const newQuantity = cartData.map((cartItem, index) => {
      return parseInt(value) !== index
        ? cartItem
        : {
            ...cartItem,
            count:
              className === 'quantity-minus'
                ? cartItem.count - 1
                : cartItem.count + 1,
          };
    });
    setCartData(newQuantity);

    const res = !(className === 'quantity-minus')
      ? fetchPatch(`${CART_API}/orders/order-items`, {
          order_item_id: event.target.dataset.id,
          count: +event.target.dataset.count + 1,
        })
      : fetchPatch(`${CART_API}/orders/order-items`, {
          order_item_id: event.target.dataset.id,
          count: +event.target.dataset.count - 1,
        });
    res
      .then((res) => {
        if (res.ok) {
          return alert('수량 변경 성공');
        } else throw new Error();
      })
      .catch((err) => console.error(err));
  };

  const isCheckArr = () => {
    for (let item of cartData) {
      if (!item.selected) {
        return true;
      }
    }
    return false;
  };

  const removeCartItem = (event, id) => {
    const newCartData = [...cartData]
      .filter((cartItem) => {
        return parseInt(id) !== parseInt(cartItem.id);
      })
      .map((item, idx) => {
        const newItem = { ...item, id: idx };
        return newItem;
      });

    setCartData(newCartData);
    fetchDelete(`${CART_API}/orders/order-items/${event.target.dataset.id}`)
      .then((res) => res.status)
      .then((status) => {
        status === 204 ? alert('삭제성공') : alert('삭제를 실패하였습니다.');
      });
  };

  const selectDelete = () => {
    const itemsToDelete = cartData.filter((item) => item.selected);
    const idsToDelete = itemsToDelete.map((item) => item.order_item_id);
    for (let itemId in idsToDelete) {
      fetchDelete(`${CART_API}/orders/order-items/${idsToDelete[itemId]}`).then(
        (res) => res.status,
      );
    }

    const newCheckedArr = [...cartData]
      .filter((item) => item.selected === false)
      .map((item, idx) => {
        const newItem = { ...item, id: idx };
        return newItem;
      });
    setCartData(newCheckedArr);
  };

  const handleIsChecked = (event, id) => {
    console.log(id);
    const newCheckedData = [...cartData];
    newCheckedData[id].selected = !newCheckedData[id].selected;
    setCartData(newCheckedData);
  };

  const selectAll = () => {
    const newCheckedData = [...cartData].map((item) => {
      const newItem = { ...item, selected: isCheckArr() };
      return newItem;
    });
    setCartData(newCheckedData);
  };

  return cartData.length === 0 ? (
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
                    isCheckArr() ? 'far' : 'fas fill'
                  }`}
                  onClick={selectAll}
                />
              </div>
              <button className="checkTitle" onClick={selectAll}>
                전체선택
              </button>
              <span className="checkCount">{selectedItems.length}</span>
            </div>
            <div className="deleteBox">
              <button
                type="button"
                className="deleteButton"
                onClick={selectDelete}
              ></button>
            </div>
          </div>
        </div>
        <div className="contentsWrap">
          <div className="basketDetailWrap">
            <ul className="basketDetailLists">
              {cartData &&
                cartData.map((data, index) => {
                  return (
                    <CartList
                      id={data.id}
                      key={index}
                      item={data}
                      handleQuantity={handleQuantity}
                      removeCartItem={removeCartItem}
                      handleIsChecked={handleIsChecked}
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
        <Link
          to={{
            pathname: '/order',
            state: {
              orderData: selectedItems,
            },
          }}
        >
          <button>
            <span>{totalPrice.toLocaleString()}</span>원 주문 하기
          </button>
        </Link>
      </div>
    </>
  );
}
