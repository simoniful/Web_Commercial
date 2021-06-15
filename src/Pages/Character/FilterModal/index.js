import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FilterModal extends Component {
  constructor() {
    super();
    this.state = {
      isSlide: false,
    };

    this.linkRef = React.createRef();
  }

  componentDidMount() {
    const { isSlide } = this.state;
    this.setState({ isSlide: !isSlide });
  }

  //TODO: default hover
  onHover = () => {
    const node = this.linkRef.current;
    console.log(node);
    console.log(node.classList);
    node.classList.toggle('hoverClass');
  };

  render() {
    const { isSlide } = this.state;
    const { filters, onToggleFilterModal, onToggleCheck, onToggleFilterCheck } =
      this.props;

    return (
      <div
        className={isSlide ? 'filterModalWrap' : ''}
        onClick={(e) => onToggleFilterModal(e)}
      >
        <div className="filterModal">
          <ul className="filterUl">
            {filters.map((el, idx) => (
              <li
                className="filterLi"
                key={el.name}
                id={idx}
                onClick={(e) => onToggleFilterModal(e)}
              >
                <Link
                  to="/products/character/1"
                  className="fileterModalLink"
                  ref={this.linkRef}
                  onMonse={this.onHover}
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
