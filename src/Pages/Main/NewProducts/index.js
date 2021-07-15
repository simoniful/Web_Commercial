import React, { useState, useEffect } from 'react';
import { PRODUCT_API } from '../../../config';
import { fetchGet } from '../../../utils/fetches';
import Carousel from '../../../Components/Carousel';
import ProductList from '../ProductList';
import Footer from '../../../Components/Footer';
import './index.scss';

function NewProducts() {
  const [productLists, setProductLists] = useState([]);
  const [page, setPage] = useState(1);
  // const [items, setItems] = useState(10);
  // const [preItems, setPreItems] = useState(0);

  useEffect(() => {
    getData();
    window.addEventListener('scroll', infiniteScroll);
    return () => window.removeEventListener('scroll', infiniteScroll);
  }, [page]);

  const getData = () => {
    fetchGet(`${PRODUCT_API}/products?order=new&pageSize=10&page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        const result = res.resultList;
        setProductLists([...productLists, ...result]);
      });
  };

  const infiniteScroll = () => {
    const { documentElement, body } = document;

    const scrollHeight = Math.max(
      documentElement.scrollHeight,
      body.scrollHeight,
    );
    const scrollTop = Math.max(documentElement.scrollTop, body.scrollTop);
    const clientHeight = documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      // setPreItems(items);
      // setItems(items + 10);
      setPage(page + 1);
      getData();
    }
  };

  return (
    <>
      <article className="NewProducts">
        <Carousel />
        <div className="wrapLists">
          <div className="listsContainer">
            <p className="subtitle">따끈따끈 새로나온</p>
            <strong className="title">신상품</strong>
          </div>
          <ProductList
            productLists={productLists}
            setProductLists={setProductLists}
          />
        </div>
      </article>
      <Footer />
    </>
  );
}

export default NewProducts;
