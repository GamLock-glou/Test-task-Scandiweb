import React, {Component} from 'react';
import {GET_ONE_PRODUCT} from '../../../query/query';
import {getPrice} from '../../../util';
import {Query} from '@apollo/react-components';
import {AttributeProductInCart} from './AttributeProductInCart';

interface ProductInCartProps {
    product: any
    currency: string
    addProductCount: any
}

export class ProductInCart extends Component<ProductInCartProps> {
  render() {
    const {product, currency, addProductCount} = this.props;
    return (
      <Query fetchPolicy='no-cache' query={GET_ONE_PRODUCT} variables={{id: product.productId}}>
        {({data, loading}) => {
          if (!data || loading) {
            return null;
          }
          const {product: {id, name, brand, prices, attributes, gallery}} = data;
          const price = getPrice(prices, currency);
          return <div className='productsCart'>
            <div className='leftCart'>
              <div>{brand}</div>
              <div>{name}</div>
              <div className='priceCart'>{price}</div>
              <div>{attributes.map((attribute, key) => {
                const isColor = attribute.name === 'Color';
                return <AttributeProductInCart
                  key={key}
                  isColor={isColor}
                  attributeCart={product.attributes}
                  attribute={attribute}
                />;
              })}</div>
            </div>
            <div className='rightCart'>
              <div className='buttonsCountProduct'>
                <div
                  className='buttonCountProduct'
                  onClick={()=>addProductCount(id, product.attributes)}
                >
                  +
                </div>
                <div className='countProducts'>{product.productCount}</div>
                <div
                  className='buttonCountProduct'
                  onClick={()=>addProductCount(id, product.attributes, -1)}
                >
                  -
                </div>
              </div>
              <img src={gallery[0]}/>
            </div>
          </div>;
        }}
      </Query>
    );
  }
}

