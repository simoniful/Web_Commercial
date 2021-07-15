import React, { useState, useEffect } from 'react';
import GridCard from './GridCard';
import Footer from '../../../Components/Footer';
import { API, PRODUCT_API } from '../../../config';
import { fetchDelete, fetchGet, fetchPost } from '../../../utils/fetches';
import './index.scss';

export default function HotProducts() {
  const [productLists, setProductLists] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getData();
    window.addEventListener('scroll', infiniteScroll);
    return () => window.removeEventListener('scroll', infiniteScroll);
  }, [page]);

  const infiniteScroll = () => {
    const { documentElement, body } = document;
    const scrollHeight = Math.max(
      documentElement.scrollHeight,
      body.scrollHeight,
    );
    const scrollTop = Math.max(documentElement.scrollTop, body.scrollTop);
    const clientHeight = documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage(page + 1);
      getData();
    }
  };

  const getData = () => {
    fetchGet(`${PRODUCT_API}/products?order=popular&pageSize=12&page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        const result = res.resultList;
        if (result.length > 0) {
          const newList = Object.assign([], productLists);
          newList.push(result);
          setProductLists(newList);
        } else {
          return;
        }
      });
  };

  const toggleProductLike = (updatedId, accessIdx) => {
    const updatedProductLists = productLists.map((products) =>
      products.map((product) =>
        updatedId === product.id
          ? { ...product, like: !product.like }
          : product,
      ),
    );

    setProductLists(updatedProductLists);

    if (productLists[accessIdx][updatedId - accessIdx * 12 - 1].like) {
      fetchDelete(`${API}/users/like/product/${updatedId}`)
        .then((res) => {
          if (res.status === 204) {
            alert('Like Cancel');
          } else {
            alert('Like Cancel Fail');
          }
        })
        .catch((error) => console.log(error.message));
    } else {
      fetchPost(`${API}/users/like/product`, {
        product_id: updatedId,
      })
        .then((res) => {
          if (res.status === 201) {
            alert('Like Success');
          } else {
            alert('Like Fail');
          }
        })
        .catch((error) => console.log(error.message));
    }
  };

  const addToCart = (updatedId, accessIdx) => {
    const updatedProductLists = productLists.map((products) =>
      products.map((product) =>
        updatedId === product.id && product.cart === false
          ? { ...product, cart: !product.cart }
          : product,
      ),
    );

    setProductLists(updatedProductLists);

    if (!productLists[accessIdx][updatedId - accessIdx * 12 - 1].cart) {
      fetchPost(`${API}/orders/order-items`, {
        product_id: updatedId,
        count: 1,
      })
        .then((res) => {
          if (res.status === 201) {
            alert('Add Cart Success');
          } else {
            alert('Add Cart Fail', res.message);
          }
        })
        .catch((error) => console.log(error.message));
    }
  };

  return (
    <>
      <div className="hotGridWrap">
        {productLists.map((products, idx) => (
          <div className="hotGrid" key={idx}>
            <div className="sectionGrid1">
              {products.slice(0, 3).map((product) => (
                <GridCard
                  key={product.id}
                  accessIdx={idx}
                  product={product}
                  addToCart={addToCart}
                  toggleProductLike={toggleProductLike}
                />
              ))}
            </div>
            <div className="sectionGrid2">
              {products.slice(3, 9).map((product) => (
                <GridCard
                  key={product.id}
                  accessIdx={idx}
                  product={product}
                  addToCart={addToCart}
                  toggleProductLike={toggleProductLike}
                />
              ))}
            </div>
            <div className="sectionGrid3">
              {products.slice(9, 12).map((product) => (
                <GridCard
                  key={product.id}
                  accessIdx={idx}
                  product={product}
                  addToCart={addToCart}
                  toggleProductLike={toggleProductLike}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
