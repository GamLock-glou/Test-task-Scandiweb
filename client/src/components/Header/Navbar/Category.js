import React from 'react';
import {NavLink} from 'react-router-dom';

export class Category extends React.Component {
  render() {
    const {name, onClick, currentCategory} = this.props;

    const className =
    currentCategory === name ?
      'header__link header__link__active' :
      'header__link';

    return (
      <li className="header__item">
        <NavLink
          to={`/${name}`}
          onClick={()=>onClick(name)}
          className={className}
        >
          {name}
        </NavLink>
      </li>
    );
  }
}
