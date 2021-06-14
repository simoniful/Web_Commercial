import React, { Component } from 'react';
import CarouselList from '../CarouselList';
import './index.scss';

export default class CarouselFrame extends Component {
  constructor() {
    super();
    this.state = {
      imgLists: [],
    };
  }
  componentDidMount() {
    fetch('/data/carouselData.json')
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          imgLists: data,
        });
      });
  }
  render() {
    const { imgLists } = this.state;
    const { count, listTransition, moveToPre, moveToNext } = this.props;
    return (
      <div className="frameWrap">
        <div className="frameContainer">
          <div
            className="carouselList"
            style={{
              transform: `translateX(${count}px)`,
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
        <button type="button" className="btnPrev" onClick={moveToPre}></button>
        <button type="button" className="btnNext" onClick={moveToNext}></button>
        <div className="countNumBox">
          <span className="countNum">
            <span>{count === 0 ? 1 : Math.abs(count / 640) + 1}</span>
            <span> / 5</span>
          </span>
        </div>
      </div>
    );
  }
}
