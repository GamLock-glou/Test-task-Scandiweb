import cn from 'classnames/bind';
import React, {Component} from 'react';
import {AttributeSet} from '../../../types';

interface AttributeProductInCartProps {
    attribute: AttributeSet,
    attributeCart: any,
    isColor: boolean,
    numberProduct: number,
    changeAttribute: (id: string,
      attributeIndex: string,
      attributeValue: string) => void
}

export class AttributeProductInCart extends Component<AttributeProductInCartProps> {
  render() {
    const {attribute, attributeCart, isColor} = this.props;
    return (
      <div className='attributeCart'>
        <div className='attributeNameCart'>{attribute.name}:</div>
        <div className='itemsCart'>
          {attribute.items.map((item) => {
            const isActive = item.value == attributeCart[attribute.name];
            if (isColor) {
              return <div key={item.id} className={cn('colorItem', {'colorItemActive': isActive})}>
                <div
                  onClick={() => this.onClicked(item.value)}
                  style={{background: item.value}}
                  className={cn('blockColor')}
                >
                </div>
              </div>;
            }
            return <div
              onClick={() => this.onClicked(item.value)}
              className={cn('itemCart', {'itemCartActive': isActive})}
              key={item.id}
            >
              {item.value}
            </div>;
          })}
        </div>
      </div>
    );
  }

  onClicked = (attributeValue) => {
    this.props.changeAttribute(
        this.props.attribute.name,
        attributeValue,
        String(this.props.numberProduct),
    );
  };
}
