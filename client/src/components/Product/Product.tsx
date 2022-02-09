import React from "react";
import { NavLink } from "react-router-dom";
import { Product as ProductType } from "../../types";
import { getPrice } from "../../util";

interface PropductProps {
  currency: string;
  product: ProductType;
  setPathName: any;
}

class Product extends React.Component<PropductProps> {

  
  render() {
      const {
          currency,
          setPathName,
          product: { name, gallery, inStock, prices, id, category }} = this.props;
      const className = !inStock ? {color: "#8D8F9A"} : {color: "#1d1f22"};
    return (
      <NavLink 
        to={`${category}/${id}`} 
        onClick={()=> {inStock ? setPathName(`${category}/${id}`) : alert("This product is out of stock!")}}
        style={{textDecoration: "none"}}
      >
      <div className="product" >
        <div className="container">
          <img
            alt="Product"
            className="productImg"
            src={gallery[0]}
          />
          {!inStock ? <div className="text_block">OUT OF STOCK</div> : null}
        </div>
        <div className="productItems">
          <div style={className}>{name}</div>
          <div style={className}>{getPrice(prices, currency)}</div>
        </div>
      </div>
      </NavLink>
    );
  }
}

export default React.memo(Product);
