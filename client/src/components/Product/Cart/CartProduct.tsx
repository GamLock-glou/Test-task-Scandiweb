import {Query} from '@apollo/react-components';
import React, {Component} from 'react';
import {GET_ONE_PRODUCT} from '../../../query/query';
import {getPrice} from '../../../util';
import s from './Cart.module.css';
import {CartAttribute} from './CartAttribute';


interface CartProductProps {
    productCart: any
    currency: string
    addProductCount: any
    changeAttribute:any
}

export class CartProduct extends Component<CartProductProps> {
  state = {
    index: 0,
  };

  render() {
    const {productCart, currency, addProductCount, changeAttribute} = this.props;
    return (
      <Query fetchPolicy='no-cache' query={GET_ONE_PRODUCT} variables={{id: productCart.productId}}>
        {
          ({data, loading}) => {
            if (!data || loading) {
              return <div>Loading...</div>;
            }
            const {
              product: {
                id,
                name,
                brand,
                prices,
                attributes,
                gallery,
              },
            } = data;
            const price = getPrice(prices, currency);
            return <div className={s.window}>
              <div className={s.leftWinow}>
                <div className={s.brandCart}>{brand}</div>
                <div className={s.nameCart}>{name}</div>
                <div className={s.priceCart}>{price}</div>
                <div className={s.cartAttribute}>
                  {attributes.map((attribute, key) => {
                    const isColor = attribute.name === 'Color';
                    return <div key={key}>
                      <div className={s.nameProduct}>{attribute.name}</div>
                      <CartAttribute
                        id={id}
                        isColor={isColor}
                        attribute={attribute}
                        attributeCart={productCart.attributes}
                        changeAttribute={changeAttribute}
                      />
                    </div>;
                  })}
                </div>
              </div>
              <div className={s.rightWindow}>
                <div className={s.interfaceCount}>
                  <div className={s.buttonCount} onClick={() => addProductCount(id)}>+</div>
                  <div className={s.countProduct}>{productCart.productCount}</div>
                  <div className={s.buttonCount} onClick={() => addProductCount(id, -1)} >-</div>
                </div>
                {
                  gallery.length > 1 ?
                  <div className={s.galleryCart}>
                    <div
                      onClick={() => this.onClickLeft(gallery.length-1)}
                      className={s.leftGallery} >
                    &lt;
                    </div>
                    <img src={gallery[this.state.index]} />
                    <div
                      className={s.rightGallery}
                      onClick={() => this.onClickRight(gallery.length-1)}
                    >
                    &gt;
                    </div>
                  </div> : <div className={s.galleryCart}>
                    <img src={gallery[this.state.index]} />
                  </div>
                }
              </div>
            </div>;
          }
        }
      </Query>
    );
  }

  onClickRight = (length) => {
    if (length > this.state.index) {
      this.setState({index: this.state.index + 1});
    } else {
      this.setState({index: 0});
    }
  };

  onClickLeft = (length) => {
    if (0 < this.state.index) {
      this.setState({index: this.state.index - 1});
    } else {
      this.setState({index: length});
    }
  };
}
