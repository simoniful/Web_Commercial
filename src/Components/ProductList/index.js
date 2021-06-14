import React, { Component } from 'react';
import Product from '../Product';
import { newProductData } from './newProductData';
import { fetchDelete, fetchGet, fetchPost } from '../../utils/fetches';
import { getToken } from '../../utils/storage';
import { API } from '../../config';
import './index.scss';

class ProductList extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
      page: 1,
    };
  }

  //TODO: props로 받은 match와 location에 따라 데이터 요청

  componentDidMount() {
    //TODO:: '/products?type=new' 데이터 받아오기
    //const token = getTokenInStorage();
    // if (token) {
    //   fetchGet(`/products?type=new&pageSize=10&page=1`, token).then((products) => {
    //     this.setState({
    //       products: products.resultList,
    //     });
    //   });

    this.setState({
      products: newProductData.resultList,
    });
  }

  componentDidUpdate() {
    //TODO:: 무한 스크롤을 위한 '/products?type=new' 추가 데이터 받아오기
    // const token = getTokenInStorage();
    // const { products, page } = this.state;
    // if (token) {
    //   fetchGet(
    //     `/products?type=new&pageSize=${10}&page=${page + 1}`,
    //     token,
    //   ).then((newProducts) => {
    //     this.setState({
    //       // 데이터 추가
    //       products: products.concant(newProducts),
    //       page: page + 1,
    //     });
    //   });
    // }
  }

  updatedProducts = (updatedId, type) => {
    const { products } = this.state;

    const updatedProducts = products.map((product) =>
      updatedId === product.id
        ? { ...product, [type]: !product[type] }
        : product,
    );

    this.setState({
      products: updatedProducts,
    });
  };

  onToggleLike = (updatedId) => {
    this.updatedProducts(updatedId, 'like');

    const { products } = this.state;

    products[updatedId - 1].like
      ? fetchDelete(`http://10.58.7.239:8000/users/like/product/${updatedId}`)
      : fetchPost(`${API}/users/like/product`, { product_id: updatedId });
  };

  onToggleCart = (e, updatedId) => {
    this.updatedProducts(updatedId, 'cart');
    //TODO: fetchPut
  };

  render() {
    const { products } = this.state;

    return (
      <ul className="itemUl">
        {products.map((product) => (
          <li className="itemLi" key={product.id}>
            <Product
              product={product}
              onToggleCart={this.onToggleCart}
              onToggleLike={this.onToggleLike}
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default ProductList;
