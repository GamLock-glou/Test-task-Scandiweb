import React, { Component } from 'react';
import { ProductInCart } from './ProductInCart';


interface ProductsInCartProps {
    productsInCart: any;
    currency: string;
    addProductCount:any;
}

class ProductsInCart extends Component<ProductsInCartProps> {
    
    render() {
        const {productsInCart, currency, addProductCount} = this.props;
        return (
            <div className='productCart'>
                {
                    productsInCart.map((product, key) => { 
                        return <ProductInCart
                            key={key} 
                            product={product} 
                            currency={currency} 
                            addProductCount={addProductCount}
                        />
                    })
                }

            </div>
        );
    }
}

export default ProductsInCart;