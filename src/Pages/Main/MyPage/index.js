import React, { useState } from 'react';
import Cart from './Cart';
import Ordered from './Ordered';
import Liked from './Liked';
import './index.scss';

export default function Mypage() {
  const [currentId, setCurrentId] = useState(2);

  return (
    <>
      <div className="subTab">
        <ul className="tabLists">
          {CATEGORY_ARR.map((category, idx) => {
            return (
              <li
                key={category}
                className={currentId - 1 === idx ? 'tabList active' : 'tabList'}
                onClick={() => setCurrentId(idx + 1)}
              >
                {category}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="contents">{MAPPING_OBJ[currentId]}</div>
    </>
  );
}

const MAPPING_OBJ = {
  1: <Liked />,
  2: <Cart />,
  3: <Ordered />,
};

const CATEGORY_ARR = ['찜한 상품', '장바구니', '주문내역'];
