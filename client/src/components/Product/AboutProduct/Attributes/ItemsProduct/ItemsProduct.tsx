import React, { Component } from 'react';
import { Attribute } from '../../../../../types';
import { ItemProduct } from './ItemProduct';

interface ItemsProductProps {
    items: Attribute[];
    name: string;
    defaultValue: string;
}

export class ItemsProduct extends Component<ItemsProductProps> {

    render() {
        return (
            <div className="attributeItemsProduct">
                    {this.props.items.map((item, key) => {
                        return <ItemProduct 
                            key={key}  
                            index={key} 
                            value={item.value}
                            defaultValue={this.props.defaultValue}
                        />
                    })}
                </div>
        );
    }
}