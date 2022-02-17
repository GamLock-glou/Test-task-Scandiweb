import React from "react";
import { NavLink } from "react-router-dom";
import { Product as ProductType } from "../../types";
import { getPrice } from "../../util";
import { ProductsInCart } from "../Providers/Provider";
import CartWhite from '../../pictures/Cart_White.png';

interface PropductProps {
  currency: string;
  product: ProductType;
  categoryTitle: Record<string, unknown>
}

class Product extends React.Component<PropductProps> {


  render() {
    const {
      currency,
      categoryTitle,
      product: { name, gallery, inStock, prices, id, category } } = this.props;
    const style = !inStock ? { color: "#8D8F9A" } : { color: "#1d1f22" };
    return (
      <NavLink
        to={inStock ? `/${category}/${id}` : `/${categoryTitle}`}
        onClick={() => { !inStock && alert("This product is out of stock!") }}
        style={{ textDecoration: "none" }}
      >
        <div className="product" >
          <div className="container">
            <img
              alt="Product"
              className="productImg"
              src={gallery[0]}
            />
            {!inStock ? <div className="text_block">OUT OF STOCK</div> : null}
          <ProductsInCart.Consumer>
            {productsInCart => {
                const isProductInCart = productsInCart.find((p) => {return p.productId === id ? true : false });
                if(isProductInCart)
                  return <div className="productInCart">
                  <img 
                    src={CartWhite}
                    className="productInCartImg"
                  /></div>
                  
              }}
          </ProductsInCart.Consumer>
          </div>
          
          
          <div className="productItems">
            <div style={style}>{name}</div>
            <div style={style} className="price">{getPrice(prices, currency)}</div>
          </div>
        </div>
      </NavLink>
    );
  }
}

export default React.memo(Product);
