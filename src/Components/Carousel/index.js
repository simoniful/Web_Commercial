import React, { useState, useEffect } from 'react';
import CarouselFrame from './CarouselFrame';
import './index.scss';

const CARD_WIDTH = 640;
const INTERVAL = 4000;

export default function Carousel() {
  const [listTransform, setListTransform] = useState(0);
  const [listTransition, setListTransition] = useState('1s ease-in-out');

  const moveToNext = () => {
    if (listTransform > -CARD_WIDTH * 4) {
      setListTransform(listTransform - CARD_WIDTH);
      setListTransition('1s ease-in-out');
    } else {
      setListTransform(0);
      setListTransition('0s');
    }
  };

  const moveToPrev = () => {
    if (listTransform < 0) {
      setListTransform(listTransform + CARD_WIDTH);
      setListTransition('1s ease-in-out');
    } else {
      setListTransform(-CARD_WIDTH * 4);
      setListTransition('0s');
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      moveToNext();
    }, INTERVAL);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="Carousel">
      <section className="carouselWrap">
        <CarouselFrame
          listTransform={listTransform}
          listTransition={listTransition}
          moveToPrev={moveToPrev}
          moveToNext={moveToNext}
        />
      </section>
    </div>
  );
}
