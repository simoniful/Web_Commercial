import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CartList extends Component {
  render() {
    const { item, selectItem, subtractItem, addItem, deleteItem } = this.props;
    const price = Number(item.price).toLocaleString();
    return (
      <li className="basketItemWrap" key={item.order_item_id}>
        <label className="checkboxLabel">
          <i
            id={item.order_item_id}
            className={`fa-check-circle ${item.selected ? 'fas fill' : 'far'}`}
            onClick={selectItem}
          />
        </label>
        <div className="thumbWrap">
          <Link to="/" className="linkThumb">
            <span className="thumbContainer">
              <span className="imgBox">
                <img
                  className="thumbImage"
                  alt={item.name}
                  src="/images/thumb.jpeg"
                />
              </span>
            </span>
          </Link>
        </div>
        <div className="itemInfo">
          <div className="titleWrap">
            <div className="title">{item.name}</div>
            <button
              className="deleteButton"
              id={item.order_item_id}
              onClick={deleteItem}
            ></button>
          </div>
          <div className="priceWrap">
            <span>{price}원</span>
          </div>
          <div className="countWrap">
            <div className="itemCounter">
              <button
                id={item['order_item_id']}
                data-count={item['count']}
                className="controlBtn"
                onClick={subtractItem}
              >
                -
              </button>
              <input value={`${item.count}`} readOnly className="qtyDp"></input>
              <button
                id={item['order_item_id']}
                data-count={item['count']}
                className="controlBtn"
                onClick={addItem}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </li>
    );
  }
}
