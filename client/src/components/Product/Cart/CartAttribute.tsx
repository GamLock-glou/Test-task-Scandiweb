import React, {Component} from 'react';
import {AttributeSet} from '../../../types';
import s from './Cart.module.css';
import cn from 'classnames/bind';

interface CartAttributeProps {
    attribute: AttributeSet,
    attributeCart: any,
    changeAttribute:any,
    isColor: boolean,
    numberProduct: number,
}

export class CartAttribute extends Component<CartAttributeProps> {
  render() {
    const {attribute, attributeCart, isColor} = this.props;
    return (
      <div className={s.itemsCart}>
        {attribute.items.map((item, key) => {
          const isActive = attributeCart[attribute.name] === item.value;
          if (isColor) {
            return <div
              key={key}
              onClick={()=>this.onClick(item.value)}
              className={cn(s.colorAttribute, {[s.colorAttributeActive]: isActive})}>
              <div
                style={{background: item.value}}
                className={s.blockColor}
              />
            </div>;
          }
          return <div
            key={key}
            onClick={()=>this.onClick(item.value)}
            className={cn(s.itemCart, {[s.itemCart_active]: isActive})}>
            {item.value}
          </div>;
        })}
      </div>
    );
  }
  onClick = (attributeValue) => {
    this.props.changeAttribute(
        this.props.attribute.name,
        attributeValue,
        String(this.props.numberProduct),
    );
  };
}
