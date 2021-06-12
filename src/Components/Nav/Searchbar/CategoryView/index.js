import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CategoryView extends Component {
  render() {
    return (
      <>
        <div className="charactersWrap">
          <ul className="charactersUI">
            {this.props.characters.map((character) => {
              return (
                <li className="charactersUIList" key={character.name}>
                  <Link to="/" className="charactersUILink"></Link>
                  <p className="charactersName">{character.name}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <hr className="dividingLine" />
        <p className="categoryTitle">카테고리</p>
        <ul className="categoryLists">
          {this.props.categorys.map((category) => {
            return (
              <li className="categoryList" key={category.name}>
                <Link to="/" className="categoryLink">
                  {category.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}
