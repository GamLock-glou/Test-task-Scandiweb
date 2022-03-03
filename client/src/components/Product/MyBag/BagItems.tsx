import React, {Component} from 'react';
import {getTotal} from '../../../util';
import {ProviderProductsInCart} from '../../Providers/Provider.js';
import ProductsInCart from './ProductsInCart';
import {NavLink} from 'react-router-dom';

interface BagItemsProps {
    currency: string
    addProductCount:any
    setVisible:any
}


export class BagItems extends Component<BagItemsProps> {
  render() {
    return (
      <div>
        <ProviderProductsInCart.Consumer>
          {(productsInCart) => {
            return (
              <div>
                <div className='headerBag'>
                  <h1>My Bag</h1>,
                  {productsInCart.length} items
                </div>
                <ProductsInCart
                  addProductCount={this.props.addProductCount}
                  currency={this.props.currency}
                  productsInCart={productsInCart}/>
                <div className='totalBag'>
                  <div>
                                        Total:
                  </div>
                  <div>
                    {getTotal(productsInCart, this.props.currency)}
                  </div>
                </div>
                <div className='buttonsBag'>
                  <NavLink onClick={this.onClick} to="/cart">
                    <div className='buttonViewBag'>VIEW BAG</div>
                  </NavLink>
                  <div className='buttonCheckOut' onClick={()=>{
                    alert('The order is paid');
                  }}>CHECK OUT</div>
                </div>
              </div>

            );
          }}
        </ProviderProductsInCart.Consumer>
      </div>
    );
  }

  onClick = () => {
    this.props.setVisible(false);
  };
}
