import React, { Component } from 'react';
import CarouselFrame from './CarouselFrame';
import './index.scss';

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listTransform: 0,
      listTransition: '1s ease-in-out',
    };
  }

  moveToNext = () => {
    if (this.state.listTransform > -640 * 4) {
      this.setState({
        listTransform: this.state.listTransform - 640,
        listTransition: '1s ease-in-out',
      });
    } else {
      this.setState({
        listTransform: 0,
        listTransition: '0s',
      });
    }
  };

  moveToPre = () => {
    if (this.state.listTransform < 0) {
      this.setState({
        listTransform: this.state.listTransform + 640,
        listTransition: '1s ease-in-out',
      });
    } else {
      this.setState({
        listTransform: -640 * 4,
        listTransition: '0s',
      });
    }
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.moveToNext();
    }, 4000);
  }

  render() {
    const { listTransition } = this.state;
    const { moveToPre, moveToNext } = this;
    const count = this.state.listTransform;
    return (
      <>
        <div className="Carousel">
          <section className="carouselWrap">
            <CarouselFrame
              count={count}
              listTransition={listTransition}
              moveToPre={moveToPre}
              moveToNext={moveToNext}
            />
          </section>
        </div>
      </>
    );
  }
}
