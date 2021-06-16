import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FilterModal extends Component {
  constructor() {
    super();
    this.state = {
      isSlide: false,
    };
  }

  componentDidMount() {
    const { isSlide } = this.state;
    this.setState({ isSlide: !isSlide });
  }

  render() {
    const { isSlide } = this.state;
    const { filters, toggleFilterModal, toggleFilterCheck } = this.props;

    return (
      <div
        className={isSlide ? 'filterModalWrap dim' : 'filterModalWrap'}
        onClick={(e) => toggleFilterModal(e)}
      >
        <div className="filterModal">
          <ul className="filterUl">
            {filters.map((el, idx) => (
              <li
                className="filterLi"
                key={el.name}
                id={idx}
                onClick={(e) => toggleFilterCheck(e)}
              >
                <Link
                  to={`/products/character/type=character?search=${el.name}`}
                  className="fileterModalLink"
                >
                  {el.name}
                  {el.isCheck && (
                    <img src="/images/colorCheck.png" alt="check" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default FilterModal;
