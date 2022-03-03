import React, {Component} from 'react';
import {AttributeSet} from '../../../../types';
import {ItemsProduct} from './ItemsProduct/ItemsProduct';

interface AttributeProps {
    attribute: AttributeSet;
    key: number;
    onClickAttribute: any;
    defaultValue: any
}

export class Attribute extends Component<AttributeProps> {
  render() {
    const {attribute: {name, items}, defaultValue} = this.props;
    return (
      <div className="attributeProduct">
        <div className="attributeNameProduct">{name}:</div>
        <ItemsProduct onClickAttribute={this.onClick} items={items} name={name} defaultValue={defaultValue}/>
      </div>
    );
  }

  onClick = (value) => {
    this.props.onClickAttribute(this.props.attribute.id, value);
  };
}
