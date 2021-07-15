import React, { Component } from 'react';
import Product from '../Product';
import { newProductData } from './newProductData';
import { fetchDelete, fetchGet, fetchPost } from '../../utils/fetches';
import { USER_API, CART_API, PRODUCT_API } from '../../config';
import './index.scss';
import { withRouter } from 'react-router-dom';
import { matchParser } from '../../utils/queryString';

class ProductList extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
      page: 1,
    };
  }

  componentDidMount() {
    const { match, location } = this.props;
    const newMatch = matchParser(match.path);
    const res =
      location.state === undefined
        ? fetchGet(`${PRODUCT_API}/products?order=popular`)
        : fetchGet(`${PRODUCT_API}/products/${newMatch}/${location.search}`);

    res
      .then((res) => res.json())
      .then((products) => {
        this.setState({
          products: products.resultList,
        });
      });
  }

  toggleProductLike = (updatedId, updatedIndex) => {
    const { products } = this.state;

    const updatedProducts = products.map((product) =>
      updatedId === product.id ? { ...product, like: !product.like } : product,
    );

    this.setState({
      products: updatedProducts,
    });

    const isDeleteProduct = products[updatedIndex].like;

    const res = isDeleteProduct
      ? fetchDelete(`${USER_API}/users/like/product/${updatedId}`)
      : fetchPost(`${USER_API}/users/like/product`, { product_id: updatedId });

    res
      .then((res) => {
        if (res.status === 201) {
          return alert('Like Success');
        } else if (res.status === 204) {
          return alert('Like Cancle Success');
        } else throw new Error(res.message);
      })
      .catch((err) => console.error(err));
  };

  addToCart = (updatedId, updatedIndex) => {
    const { products } = this.state;
    const updatedProducts = products.map((product) =>
      updatedId === product.id && product.cart === false
        ? { ...product, cart: !product.cart }
        : product,
    );

    this.setState({
      products: updatedProducts,
    });

    if (!products[updatedIndex].cart) {
      fetchPost(`${CART_API}/orders/order-items`, {
        product_id: updatedId,
        count: 1,
      })
        .then((res) => {
          if (res.ok) {
            alert('Add Cart Success');
          } else {
            alert('Add Cart Fail');
          }
        })
        .catch((error) => console.log(error.message));
    }
  };

  render() {
    const { products } = this.state;
    const { match, location } = this.props;

    return (
      <div className="ProductWrap">
        <ul className="itemUl">
          {products.map((product, i) => (
            <li className="itemLi" key={product.id}>
              <Product
                index={i}
                product={product}
                addToCart={this.addToCart}
                toggleProductLike={this.toggleProductLike}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withRouter(ProductList);
