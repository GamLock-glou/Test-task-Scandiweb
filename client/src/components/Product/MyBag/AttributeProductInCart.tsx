import cn from 'classnames/bind';
import React, {Component} from 'react';
import {AttributeSet} from '../../../types';

interface AttributeProductInCartProps {
    attribute: AttributeSet
    attributeCart: any
    isColor: boolean
}

export class AttributeProductInCart extends Component<AttributeProductInCartProps> {
  render() {
    const {attribute, attributeCart, isColor} = this.props;
    let isAddItem = false;
    return (
      <div className='attributeCart'>
        <div className='attributeNameCart'>{attribute.name}:</div>
        <div className='itemsCart'>
          {attribute.items.map((item, key) => {
            let className = 'itemCart';
            let isActive = false;
            if (item.value == attributeCart[attribute.name]) {
              isAddItem = true;
              isActive = true;
              className = 'itemCart itemCart_active';
            }
            if (key === 3 && !isAddItem) {
              return <div
                key={key}
                className="itemCart itemCart_active"
                style={{background: attributeCart[attribute.name]}}
              >
                {
                  !isColor ?
                  item.value :
                  <div
                    className='colorItem_active'
                  />
                }
              </div>;
            }
            if (key < 4) {
              return <div
                key={key}
                style={{background: item.value}}
                className={className}
              >
                {
                  !isColor ?
                  item.value :
                  <div
                    className={cn('colorItem', {'colorItem_active': isActive})}
                  />
                }
              </div>;
            }
          })}
        </div>
      </div>
    );
  }
}
