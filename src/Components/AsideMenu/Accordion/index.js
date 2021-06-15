import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

class Accordion extends Component {
  constructor() {
    super();
    this.state = { isShowList: false };
  }

  toggleList = (e) => {
    const { isShowList } = this.state;
    this.setState({ isShowList: !isShowList });
  };

  render() {
    const { isShowList } = this.state;
    const { type, title, characters, categories } = this.props;

    return (
      <>
        <button className="accordionBtn" onClick={this.toggleList}>
          {title}
          <span className={`arrow ${isShowList && 'rotate'}`}></span>
        </button>
        {isShowList &&
          (type === 'character' ? (
            <ul className="characters">
              {characters?.map((character) => (
                <li key={character.id} className="characterItem">
                  <Link to="/" className="characterLink">
                    <div className="character">
                      <img
                        className="characterImg"
                        src="/images/PetCharacter.png"
                        alt={character.name}
                      />
                      <span className="characterSpan">{character.name}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="category">
              {categories?.map((category) => (
                <li key={category.id} className="categoryItem">
                  <Link to="/" className="categoryLink">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
      </>
    );
  }
}

export default Accordion;
