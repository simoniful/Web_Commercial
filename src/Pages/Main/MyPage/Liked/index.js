import React, { useState, useEffect, useRef } from 'react';
import { CART_API } from '../../../../config';
import { fetchGet } from '../../../../utils/fetches';
import Masonry from 'react-masonry-component';
import './index.scss';
import { Link } from 'react-router-dom';

export default function Liked() {
  const [likedList, setLikedList] = useState([]);
  const gridRef = useRef();
  const masonryOptions = {
    transitionDuration: 0,
  };

  useEffect(() => {
    getLikedData();
  }, []);

  const getLikedData = () => {
    fetchGet(`${CART_API}/users/like/product`)
      .then((res) => res.json())
      .then((res) => {
        setLikedList(res.product_list);
      });
  };

  return (
    <div className="Liked">
      <div className="grid">
        <Masonry
          className={'content'}
          options={masonryOptions}
          disableImagesLoaded={false}
          updateOnEachImageLoad={false}
        >
          {likedList.map((item, idx) => (
            <div class="card">
              <div className="container">
                <Link to={`/products/${item.id}`}>
                  <img
                    className="cardImg"
                    src={item.image_url}
                    alt={item.name}
                  />
                </Link>
                <h3 className="cardTitle">{item.name}</h3>
              </div>
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
}
