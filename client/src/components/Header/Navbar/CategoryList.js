import {Query} from '@apollo/react-components';
import React from 'react';
import {GET_ALL_CATEGORIES} from '../../../query/query';
import {Category} from './Category';

export class CategoryList extends React.Component {
  currentCategory = !window.location.pathname.substr(1) ?
    'all' :
    window.location.pathname.substr(1);
  state={
    currentCategory: this.currentCategory,
  };

  render() {
    return (
      <Query query={GET_ALL_CATEGORIES} >
        {({data, loading}) => {
          if (loading || !data) {
            return null;
          }
          const {categories} = data;
          return (
            <div className="header__nav">
              <ul className="header__list">
                {categories.map((category, id) => (
                  <Category
                    key={id}
                    onClick={this.onClick}
                    currentCategory={this.state.currentCategory}
                    name={category.name}
                  />
                ))}
              </ul>
            </div>
          );
        }}
      </Query>
    );
  }

  onClick = (name) => {
    this.setState({currentCategory: name});
  };
}
