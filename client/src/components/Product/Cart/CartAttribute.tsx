import React, {Component} from 'react';
import {AttributeSet} from '../../../types';
import s from './Cart.module.css';
import cn from 'classnames/bind';

interface CartAttributeProps {
    attribute: AttributeSet
    attributeCart: any
    changeAttribute:any
    id: string
    isColor: boolean
}

export class CartAttribute extends Component<CartAttributeProps> {
  render() {
    const {attribute, attributeCart, isColor} = this.props;
    return (
      <div className={s.itemsCart}>
        {attribute.items.map((item, key) => {
          const isActive = attributeCart[attribute.name] === item.value;
          return <div
            key={key}
            onClick={()=>this.onClick(item.value)}
            style={{background: item.value}}
            className={cn(s.itemCart, {[s.itemCart_active]: isActive})}>
            {
              !isColor ?
              item.value :
              <div
                className={cn(s.attributeItemColor, {[s.attributeItemColor_active]: isActive})}
              >
                <div className='attributeItemColorName'>
                  {isActive && '✔'}
                </div>
              </div>
            }
          </div>;
        })}
      </div>
    );
  }
  onClick = (attributeValue) => {
    this.props.changeAttribute(this.props.id, this.props.attribute.name, attributeValue);
  };
}
