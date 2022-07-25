import React, {Component} from 'react';
import {ProductInCart} from './ProductInCart';


interface ProductsInCartProps {
    productsInCart: any,
    currency: string,
    addProductCount:any,
    changeAttribute: (id: string,
      attributeIndex: string,
      attributeValue: string) => void,
}

class ProductsInCart extends Component<ProductsInCartProps> {
  render() {
    const {productsInCart,
      currency,
      addProductCount,
      changeAttribute} = this.props;
    return (
      <div className='productCart'>
        {
          productsInCart.map((product, key) => {
            return <ProductInCart
              key={key}
              numberProduct={key}
              product={product}
              currency={currency}
              addProductCount={addProductCount}
              changeAttribute={changeAttribute}
            />;
          })
        }

      </div>
    );
  }
}

export default ProductsInCart;
