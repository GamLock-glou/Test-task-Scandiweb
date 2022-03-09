import React, {Component} from 'react';
import Cart from '../../../pictures/Cart.png';
import {ProviderProductsInCart} from '../../Providers/Provider';
import {getProductsCount} from '../../../util';

export class MyBag extends Component {
  render() {
    return (
      <div>
        <div className="bagInHead" onClick={this.onClick}>
          <img src={Cart}/>
          <ProviderProductsInCart.Consumer>
            {
              // myBagCount
              (products)=> {
                const count = getProductsCount(products);
                if (!count) {
                  return null;
                };
                return <div className='countProduct'>{count}</div>;
              }
            }
          </ProviderProductsInCart.Consumer>
        </div>
      </div>
    );
  }

  onClick = () => {
    this.props.setVisible(!this.props.visible);
  };
}
