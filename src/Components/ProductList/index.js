import React, { Component } from 'react';
import Product from '../Product';
import { newProductData } from './newProductData';
import { fetchDelete, fetchGet, fetchPost } from '../../utils/fetches';
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
    fetchGet(`${API}/products/${this.props.location.search}`)
      .then((res) => res.json())
      .then((products) => {
        this.setState({
          products: products.resultList,
        });
      });

    this.setState({
      products: newProductData.resultList,
    });
  }

  componentDidUpdate() {
    //TODO: 무한 스크롤을 위한 '/products?type=new' 추가 데이터

    //스크롤 좌표에 따라 fetch url 수정
    const { products, page } = this.state;
    fetchGet(`/products?${`type=new`}&pageSize=${20}&page=${page + 1}`)
      .then((res) => res.json())
      .then((newProducts) => {
        this.setState({
          products: products.concat(newProducts),
          page: page + 1,
        });
      })
      .catch((error) => console.log(error.message));
  }

  toggleProductLike = (updatedId) => {
    const { products } = this.state;

    const updatedProducts = products.map((product) =>
      updatedId === product.id ? { ...product, like: !product.like } : product,
    );

    this.setState({
      products: updatedProducts,
    });

    const isDeleteProduct = products[updatedId - 1].like;

    const res = isDeleteProduct
      ? fetchDelete(`${API}/users/like/product/${updatedId}`)
      : fetchPost(`${API}/users/like/product`, { product_id: updatedId });

    res
      .then((res) => {
        if (res.ok) return alert('성공');
        else throw new Error();
      })
      .catch((err) => console.error(err));
  };

  addToCart = (updatedId) => {
    const { products } = this.state;
    const updatedProducts = products.map((product) =>
      updatedId === product.id && product.cart === false
        ? { ...product, cart: !product.cart }
        : product,
    );

    this.setState({
      products: updatedProducts,
    });

    if (!products[updatedId - 1].cart) {
      fetchPost(`${API}/orders/order-items`, {
        product_id: updatedId,
        count: 1,
      })
        .then((res) => {
          if (res.ok) {
            alert('Add Cart Success');
          } else {
            alert('Add Cart Fail', res.message);
          }
        })
        .catch((error) => console.log(error.message));
    }
  };

  render() {
    const { products } = this.state;
    console.log(products);
    return (
      <ul className="itemUl">
        {products.map((product) => (
          <li className="itemLi" key={product.id}>
            <Product
              product={product}
              addToCart={this.addToCart}
              toggleProductLike={this.toggleProductLike}
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default ProductList;
