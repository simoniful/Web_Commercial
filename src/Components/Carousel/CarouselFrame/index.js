import React, { useState, useEffect } from 'react';
import CarouselList from '../CarouselList';
import './index.scss';

const CARD_WIDTH = 640;

export default function CarouselFrame({
  listTransform,
  listTransition,
  moveToPrev,
  moveToNext,
}) {
  const [imgLists, setImgLists] = useState([]);

  useEffect(() => {
    fetch('/data/carouselData.json')
      .then((res) => res.json())
      .then((data) => {
        setImgLists(data);
      });
  }, []);

  return (
    <div className="frameWrap">
      <div className="frameContainer">
        <div
          className="carouselList"
          style={{
            transform: `translateX(${listTransform}px)`,
            transition: `${listTransition}`,
          }}
        >
          {imgLists.map((image) => {
            return (
              <CarouselList
                key={image.id}
                title={image.title}
                subtitle={image.subtitle}
                link={image.link}
                img={image.img}
              />
            );
          })}
        </div>
      </div>
      <button type="button" className="btnPrev" onClick={moveToPrev}></button>
      <button type="button" className="btnNext" onClick={moveToNext}></button>
      <div className="countNumBox">
        <span className="countNum">
          <span>
            {listTransform === 0 ? 1 : Math.abs(listTransform / CARD_WIDTH) + 1}
          </span>
          <span> / 5</span>
        </span>
      </div>
    </div>
  );
}
