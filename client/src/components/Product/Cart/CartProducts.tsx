import React, {Component} from 'react';
import {CartProduct} from './CartProduct';
import s from './Cart.module.css';


interface CartProductsProps {
    productsCart: any
    currency: string
    addProductCount: any
    changeAttribute:any
}

export class CartProducts extends Component<CartProductsProps> {
  render() {
    const {productsCart, currency, addProductCount, changeAttribute} = this.props;

    return (
      <div className={s.cart}>
        {productsCart.map((productCart, key) => {
          return <div key={key}>
            <hr className={s.lineCart}/>
            <CartProduct
              numberProduct={key}
              addProductCount={addProductCount}
              currency={currency}
              productCart={productCart}
              changeAttribute={changeAttribute}
            />
          </div>;
        })}
      </div>
    );
  }
}
