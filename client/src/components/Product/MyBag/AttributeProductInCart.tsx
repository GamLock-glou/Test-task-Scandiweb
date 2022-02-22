import React, { Component } from 'react';
import { AttributeSet } from '../../../types';

interface AttributeProductInCartProps {
    attribute: AttributeSet
    attributeCart: any
}

export class AttributeProductInCart extends Component<AttributeProductInCartProps> {
    render() {
        const { attribute, attributeCart } = this.props;
        let isAddItem = false;
        return (
            <div className='attributeCart'>
                {attribute.items.map((item, key) => {
                    let className = "itemCart"
                    if(item.value == attributeCart[attribute.name]) {
                        isAddItem = true
                        className = "itemCart itemCart_active"
                    }
                    if(key === 3 && !isAddItem) {
                        return <div 
                        key={key}
                        className="itemCart itemCart_active"
                        style={{ background: attributeCart[attribute.name] }}
                        >
                            {item.value[0] !== "#" && attributeCart[attribute.name]}
                        </div>
                    }
                    if(key < 4)
                    return <div key={key} style={{ background: item.value }} className={className}>
                        {item.value[0] !== "#" && item.value}
                    </div>
                })}
            </div>
        );
    }
}