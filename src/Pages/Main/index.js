import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../Components/Nav';
import NewProducts from './NewProducts';
import HotProducts from './HotProducts';
import Mypage from './MyPage';
import Footer from '../../Components/Footer';
import './index.scss';

export default function MainPage() {
  const [currentId, setCurrentId] = useState(0);

  return (
    <div className="Main">
      <Nav />
      <div className="mainArticle">
        <div className="mainTabWrap">
          <ul className="mainTabUI">
            {CATEGORY_ARR.map((category, idx) => {
              return (
                <li className="tabList" key={category}>
                  <Link
                    to={`${PAGE_ARR[idx]}`}
                    onClick={() => {
                      setCurrentId(idx);
                    }}
                  >
                    <div className="tabItem">
                      <span
                        className={
                          currentId === idx ? 'tabName active' : 'tabName'
                        }
                      >
                        {category}
                      </span>
                    </div>
                  </Link>
                  <hr
                    className={
                      currentId === idx
                        ? 'focusUnderline active'
                        : 'focusUnderline'
                    }
                  ></hr>
                </li>
              );
            })}
          </ul>
        </div>
        {MAPPING_OBJ[currentId + 1]}
      </div>
    </div>
  );
}

const MAPPING_OBJ = {
  1: <NewProducts />,
  2: <HotProducts />,
  3: <Mypage />,
};

const CATEGORY_ARR = ['신규', '인기', '마이'];

const PAGE_ARR = ['/index?tab=new', '/index?tab=hot', '/index?tab=mypage'];
