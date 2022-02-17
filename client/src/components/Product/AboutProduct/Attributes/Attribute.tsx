import React, { Component } from 'react';
import { AttributeSet } from '../../../../types';
import { ItemsProduct } from './ItemsProduct/ItemsProduct';

interface AttributeProps {
    attribute: AttributeSet;
    key: number;
    defaultValue: any
}

export class Attribute extends Component<AttributeProps> {


    render() {
        const {attribute:{name, items}, defaultValue} = this.props;
        return (
            <div className="attributeProduct">
                <div className="attributeNameProduct">{name}:</div>
                <ItemsProduct items={items} name={name} defaultValue={defaultValue.value}/>
            </div>
        );
    }


}