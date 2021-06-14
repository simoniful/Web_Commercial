import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

class Product extends Component {
  render() {
    const { product, onToggleCart, onToggleLike } = this.props;

    return (
      <div className="product">
        <div
          className={product.like ? 'heart addToLike' : 'heart'}
          onClick={() => onToggleLike(product.id)}
        >
          <button className="likeBtn" type="button">
            좋아요
          </button>
        </div>

        <Link to="/" className="productLink">
          <div className="productImgWrap">
            <img
              src="https://t1.daumcdn.net/friends/prod/product/20210601174532087_8809721509166_AW_00.jpg?type=thumb&opt=R255x255@2xa"
              alt="상품 이미지"
            />
          </div>
          <p className="productName">{product.name}</p>
          <p className="productPrice">
            <span className="price">{product.price}</span>
            <span className="unit">원</span>
          </p>

          {product.stock && (
            <div className="soldout">
              <label className="soldoutLabel"></label>
            </div>
          )}
        </Link>

        <div
          className={product.cart ? 'cart addToCart' : 'cart'}
          onClick={(e) => onToggleCart(e, product.id)}
        >
          <button className="cartBtn" type="button">
            담기
          </button>
        </div>
      </div>
    );
  }
}

export default Product;
