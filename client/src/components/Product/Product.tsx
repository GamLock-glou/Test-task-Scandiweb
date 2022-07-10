import React from 'react';
import {NavLink} from 'react-router-dom';
import {Price, Product as ProductType} from '../../types';
import {getPrice, getAttributes} from '../../util';
import CartWhite from '../../pictures/Cart_White.png';
import cn from 'classnames/bind';

interface PropductProps {
  currency: string;
  product: ProductType;
  categoryTitle: Record<string, unknown>;
  setProductsCart: any;
}

class Product extends React.Component<PropductProps> {
  state={
    isHover: false,
    attributesProduct: getAttributes(this.props.product.attributes),
  };

  render() {
    const {
      currency,
      product: {name, gallery, inStock, prices, id, category, brand}} = this.props;
    const className = !inStock ? 'priceOfStock' : '';
    return (
      <div
        className='containerProduct'
        onMouseEnter={()=>{
          this.setState({isHover: true});
        }}
        onMouseLeave={()=>{
          this.setState({isHover: false});
        }}
      >
        <NavLink
          to={`/${category}/${id}`}
        >
          <div
            className="product"
          >
            <div className="container">
              <img
                alt="Product"
                className="productImg"
                src={gallery[0]}
              />
              {!inStock ?
            <div className="text_block">
              OUT OF STOCK
            </div> :
            null}
            </div>
            <div className="productItems">
              <div className={className} >{brand} {name}</div>
              <div className={`price ${className}`}>{getPrice(prices, currency)}</div>
            </div>
          </div>
        </NavLink>
        {inStock && <div
          className={cn('productInCart',
              {'productInCart productInCart_active': this.state.isHover})}
          onClick={()=> {
            this.onClick(id, this.state.attributesProduct, prices, inStock);
          }}
        >
          <img
            src={CartWhite}
            className="productInCartImg"
          />
        </div>}
      </div>
    );
  }

  onClick(id: string, attributesProduct: {}, price: Price[], inStock) {
    if (inStock) {
      this.props.setProductsCart(id, attributesProduct, price);
    }
  }
}

export default React.memo(Product);
