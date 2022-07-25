import React, {Component} from 'react';
import s from './Cart.module.css';
import {ProviderProductsInCart} from '../../Providers/Provider.js';
import {CartProducts} from './CartProducts';
import {FinalProductPrice} from './FinalProductPrice';

interface CartProps {
    currency: string
    addProductCount: any
    changeAttribute: any
}

export class Cart extends Component<CartProps> {
  render() {
    return (
      <div className='wrapper'>
        <div className={s.cartWrapper}>Cart</div>
        <ProviderProductsInCart.Consumer>
          {(products) => {
            return <>
              <CartProducts
                addProductCount={this.props.addProductCount}
                currency={this.props.currency}
                productsCart={products}
                changeAttribute={this.props.changeAttribute}
              />
              <FinalProductPrice
                currency={this.props.currency}
                products={products}
              />
            </>;
          }}
        </ProviderProductsInCart.Consumer>
      </div>
    );
  }
}
