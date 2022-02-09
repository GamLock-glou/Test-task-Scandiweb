import { Query } from "@apollo/react-components";
import React from "react";
import { GET_ALL_CATEGORIES } from "../../../query/query";
import { Category } from "./Category";

export class CategoryList extends React.Component {

    render() {
    const { setPathName, pathName } = this.props;

    return (
      <Query query={GET_ALL_CATEGORIES} >
        {({data, loading}) => {

          if(loading)
            return null

          const { categories } = data;
          return (
            <div className="header__nav">
              <ul className="header__list">
                {categories.map((category, id) => (
                  <Category
                    key={id}
                    currentCategory={pathName}
                    setCurrentCategory={setPathName}
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
}
