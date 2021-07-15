import React from 'react';
import Product from '../Product';
import { fetchDelete, fetchPost } from '../../../utils/fetches';
import { USER_API, CART_API } from '../../../config';
import './index.scss';
import { withRouter } from 'react-router-dom';

function ProductList({ productLists, setProductLists }) {
  const toggleProductLike = (updatedId, updatedIndex) => {
    const updatedProducts = productLists.map((product) =>
      updatedId === product.id ? { ...product, like: !product.like } : product,
    );
    setProductLists(updatedProducts);
    const isDeleteProduct = productLists[updatedIndex].like;
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

  const addToCart = (updatedId, updatedIndex) => {
    const updatedProducts = productLists.map((product) =>
      updatedId === product.id && product.cart === false
        ? { ...product, cart: !product.cart }
        : product,
    );
    setProductLists(updatedProducts);

    if (!productLists[updatedIndex].cart) {
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

  return (
    <div className="ProductWrap">
      <ul className="itemUl">
        {productLists?.map((product, idx) => (
          <li className="itemLi" key={idx}>
            <Product
              index={idx}
              product={product}
              addToCart={addToCart}
              toggleProductLike={toggleProductLike}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default withRouter(ProductList);
