import React, { Component } from 'react';
import { AttributeSet } from '../../../types';
import s from './Cart.module.css';

interface CartAttributeProps {
    attribute: AttributeSet
    attributeCart: any
    changeAttribute:any
    id: string
}

export class CartAttribute extends Component<CartAttributeProps> {
    render() {
        const { attribute, attributeCart } = this.props;
        return (
            <div className={s.itemsCart}>
                {attribute.items.map((item, key) => {
                    let className = 
                        attributeCart[attribute.name]=== item.value 
                        ? `${s.itemCart} ${s.itemCart_active}` 
                        : s.itemCart
                    return <div key={key} onClick={()=>this.onClick(item.value)} style={{ background: item.value }} className={className}>
                        {item.value[0] !== "#" && item.value}
                    </div>
                })}
            </div>
        );
    }
    onClick = (attributeValue) => {
        this.props.changeAttribute(this.props.id, this.props.attribute.name, attributeValue)
    }
}