import React from "react";
import { CategoryList } from "./CategoryList";

export class NavBar extends React.Component {


  render() {
    const { setPathName, pathName } = this.props;
    return (
          <CategoryList pathName={pathName} setPathName={setPathName} />
    );
  }
}
