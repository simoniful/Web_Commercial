import React, { Component } from 'react';
import Product from '../Product';
import { newProductData } from './newProductData';
import { fetchDelete, fetchGet, fetchPost } from '../../utils/fetches';
import { API } from '../../config';
import './index.scss';
import { withRouter } from 'react-router-dom';

class ProductList extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
      page: 1,
    };
  }

  componentDidMount() {
    fetchGet(`./newProductData `)
      .then((res) => res.json())
      .then((products) => {
        this.setState({
          products: products.resultList,
        });
      });

    this.setState({
      products: newProductData.resultList,
    });

    // const { match, location } = this.props;
    // const res = !location.search
    //   ? fetchGet(`${API}/${match.path}`)
    //   : fetchGet(`${API}/${match.path}/${location.search}`);

    // res
    //   .then((res) => res.json())
    //   .then((products) => {
    //     this.setState({
    //       products: products.resultList,
    //     });
    //   });

    // this.setState({
    //   products: newProductData.resultList,
    // });
  }

  componentDidUpdate() {
    //TODO: 무한 스크롤을 위한 '/products?type=new' 추가 데이터
    //스크롤 좌표에 따라 fetch url 수정
    // const { products, page } = this.state;
    // const { match, location } = this.props;
    // const arr = match.split('/');
    // const lastPath = arr[arr.length - 1];
    // const res = location.search
    //   ? fetchGet(
    //       `${API}/products?order=${lastPath}&pageSize=${20}&page=${page + 1}`,
    //     )
    //   : fetchGet(
    //       `${API}${match.path}${location.search}&pageSize=${20}&page=${
    //         page + 1
    //       }`,
    //     );
    // res
    //   .then((res) => res.json())
    //   .then((newProducts) => {
    //     this.setState({
    //       products: products.concat(newProducts),
    //       page: page + 1,
    //     });
    //   })
    //   .catch((error) => console.log(error.message));
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
        if (res.ok) return alert('Like Success');
        else throw new Error(res.message);
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
    const { match, location } = this.props;
    console.log('m', match);
    console.log('l', location);
    return (
      <div className="ProductWrap">
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
      </div>
    );
  }
}

export default withRouter(ProductList);
